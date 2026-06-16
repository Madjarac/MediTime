"use server";

import { Appointment } from "@/types";

export async function createAppointment(data: Omit<Appointment, "id" | "status">): Promise<Appointment> {
  // TODO: Sačuvati u bazu podataka
  throw new Error("Not implemented");
}

export async function getAppointments(): Promise<Appointment[]> {
  // TODO: Dohvatiti iz baze podataka
  return [];
}

export async function updateAppointmentStatus(
  id: string,
  status: Appointment["status"]
): Promise<void> {
  // TODO: Ažurirati status u bazi podataka
}

export async function deleteAppointment(id: string): Promise<void> {
  // TODO: Obrisati iz baze podataka
}
