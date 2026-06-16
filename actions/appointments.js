"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAppointments, addAppointment, updateAppointmentStatus, deleteAppointment, getActiveDoctors } from "@/lib/db";
import { sendMail, buildConfirmedEmail, buildRejectedEmail } from "@/lib/mail";

export async function bookAppointment(prevState, formData) {
  const doctorId = parseInt(formData.get("doctorId"));
  const date = formData.get("date");
  const time = formData.get("time");
  const firstName = formData.get("firstName")?.trim();
  const lastName = formData.get("lastName")?.trim();
  const email = formData.get("email")?.trim();
  const phone = formData.get("phone")?.trim();
  const note = formData.get("note")?.trim() || "";

  if (!doctorId || !date || !time || !firstName || !lastName || !email || !phone) {
    return { error: "Popunite sva obavezna polja." };
  }

  const doctor = getActiveDoctors().find((d) => d.id === doctorId);
  if (!doctor) {
    return { error: "Izabrani lekar nije pronađen." };
  }
  if (!doctor.available) {
    return { error: `${doctor.name} trenutno nije dostupan za zakazivanje. Molimo izaberite drugog lekara.` };
  }

  // Provjera da li je termin već zauzet
  const existing = getAppointments().find(
    (a) =>
      a.doctorId === doctor.id &&
      a.date === date &&
      a.time === time &&
      a.status !== "rejected" &&
      a.status !== "cancelled"
  );
  if (existing) {
    return {
      error: `${doctor.name} već ima zakazan pregled ${date} u ${time}h. Molimo izaberite drugi termin.`,
    };
  }

  addAppointment({
    doctorId: doctor.id,
    doctorName: doctor.name,
    specialty: doctor.specialty,
    patientName: firstName,
    patientSurname: lastName,
    email,
    phone,
    date,
    time,
    note,
  });

  redirect("/appointments/success");
}

export async function adminAddAppointment(prevState, formData) {
  const doctorId = parseInt(formData.get("doctorId"));
  const date = formData.get("date");
  const time = formData.get("time");
  const firstName = formData.get("firstName")?.trim();
  const lastName = formData.get("lastName")?.trim();
  const email = formData.get("email")?.trim() || "";
  const phone = formData.get("phone")?.trim() || "";
  const note = formData.get("note")?.trim() || "";

  if (!doctorId || !date || !time || !firstName || !lastName) {
    return { error: "Popunite obavezna polja: lekar, datum, vreme, ime i prezime." };
  }

  const doctor = getActiveDoctors().find((d) => d.id === doctorId);
  if (!doctor) {
    return { error: "Izabrani lekar nije pronađen." };
  }
  if (!doctor.available) {
    return { error: `${doctor.name} trenutno nije dostupan za zakazivanje.` };
  }

  const existing = getAppointments().find(
    (a) =>
      a.doctorId === doctor.id &&
      a.date === date &&
      a.time === time &&
      a.status !== "rejected" &&
      a.status !== "cancelled"
  );
  if (existing) {
    return {
      error: `${doctor.name} već ima zakazan pregled ${date} u ${time}h.`,
    };
  }

  addAppointment({
    doctorId: doctor.id,
    doctorName: doctor.name,
    specialty: doctor.specialty,
    patientName: firstName,
    patientSurname: lastName,
    email,
    phone,
    note,
    date,
    time,
    status: "confirmed",
    addedByAdmin: true,
  });

  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
  redirect("/admin/appointments");
}

export async function confirmAppointment(id) {
  updateAppointmentStatus(id, "confirmed");
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");

  const apt = getAppointments().find((a) => a.id === id);
  if (apt?.email) {
    await sendMail({
      to: apt.email,
      subject: "✅ Pregled potvrđen — MediTime",
      html: buildConfirmedEmail({
        patientName: `${apt.patientName} ${apt.patientSurname}`,
        doctorName: apt.doctorName,
        specialty: apt.specialty,
        date: apt.date,
        time: apt.time,
      }),
    });
  }
}

export async function removeAppointment(id) {
  deleteAppointment(id);
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
}

export async function rejectAppointment(id) {
  updateAppointmentStatus(id, "rejected");
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");

  const apt = getAppointments().find((a) => a.id === id);
  if (apt?.email) {
    await sendMail({
      to: apt.email,
      subject: "❌ Zahtev za pregled odbijen — MediTime",
      html: buildRejectedEmail({
        patientName: `${apt.patientName} ${apt.patientSurname}`,
        doctorName: apt.doctorName,
        specialty: apt.specialty,
        date: apt.date,
        time: apt.time,
      }),
    });
  }
}
