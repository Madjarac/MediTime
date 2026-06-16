"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addCustomDoctor, deleteAnyDoctor, updateAnyDoctor } from "@/lib/db";

const specialtyGradients = {
  Kardiolog:       "from-blue-500 to-blue-700",
  Neurolog:        "from-cyan-500 to-cyan-700",
  Dermatolog:      "from-teal-500 to-teal-700",
  Ortoped:         "from-indigo-500 to-indigo-700",
  Internista:      "from-rose-500 to-rose-700",
  Psihijatar:      "from-purple-500 to-purple-700",
  Oftalmolog:      "from-amber-500 to-amber-700",
  Ginekolog:       "from-pink-500 to-pink-700",
  Urolog:          "from-slate-500 to-slate-700",
  Endokrinolog:    "from-orange-500 to-orange-700",
  Pulmolog:        "from-sky-500 to-sky-700",
  Reumatolog:      "from-violet-500 to-violet-700",
  Gastroenterolog: "from-lime-600 to-lime-800",
  Pedijatar:       "from-pink-400 to-pink-600",
  Hirurg:          "from-red-600 to-red-800",
  Ostalo:          "from-emerald-500 to-emerald-700",
};

function getInitials(name) {
  const parts = name.replace(/^Dr\.\s*/i, "").trim().split(/\s+/);
  return parts
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

export async function addDoctorAction(prevState, formData) {
  const name = formData.get("name")?.trim();
  const specialty = formData.get("specialty")?.trim();
  const experience = formData.get("experience")?.trim();
  const bio = formData.get("bio")?.trim();
  const tagsRaw = formData.get("tags")?.trim() || "";
  const available = formData.get("available") === "true";

  if (!name || !specialty || !experience || !bio) {
    return { error: "Popunite sva obavezna polja." };
  }

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 4)
    : [];

  const gradient = specialtyGradients[specialty] || specialtyGradients["Ostalo"];
  const initials = getInitials(name);

  addCustomDoctor({
    name,
    specialty,
    experience,
    bio,
    tags,
    available,
    initials,
    gradient,
    rating: "N/A",
    reviews: 0,
    nextSlot: "Po dogovoru",
  });

  revalidatePath("/admin/doctors");
  revalidatePath("/appointments");
  redirect("/admin/doctors");
}

export async function updateDoctorAction(prevState, formData) {
  const id = parseInt(formData.get("id"));
  const isCustom = formData.get("isCustom") === "true";
  const name = formData.get("name")?.trim();
  const specialty = formData.get("specialty")?.trim();
  const experience = formData.get("experience")?.trim();
  const bio = formData.get("bio")?.trim();
  const tagsRaw = formData.get("tags")?.trim() || "";
  const available = formData.get("available") === "true";
  const ratingRaw = formData.get("rating")?.trim();
  const reviewsRaw = formData.get("reviews")?.trim();

  if (!name || !specialty || !experience || !bio) {
    return { error: "Popunite sva obavezna polja." };
  }

  const ratingNum = parseFloat(ratingRaw);
  if (ratingRaw && (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5)) {
    return { error: "Ocena mora biti između 1.0 i 5.0." };
  }

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 4)
    : [];

  const gradient = specialtyGradients[specialty] || specialtyGradients["Ostalo"];
  const initials = getInitials(name);
  const rating = ratingRaw ? ratingNum.toFixed(1) : "N/A";
  const reviews = reviewsRaw ? parseInt(reviewsRaw) || 0 : 0;

  updateAnyDoctor(id, isCustom, { name, specialty, experience, bio, tags, available, gradient, initials, rating, reviews });

  revalidatePath("/admin/doctors");
  revalidatePath("/appointments");
  revalidatePath("/doctors");
  revalidatePath("/");

  return { success: true };
}

export async function removeDoctorAction(id, isCustom) {
  deleteAnyDoctor(id, isCustom);
  revalidatePath("/admin/doctors");
  revalidatePath("/admin");
  revalidatePath("/appointments");
  revalidatePath("/doctors");
  revalidatePath("/");
}
