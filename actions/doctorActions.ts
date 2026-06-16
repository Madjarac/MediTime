"use server";

import { Doctor } from "@/types";

export async function getDoctors(): Promise<Doctor[]> {
  // TODO: Dohvatiti iz baze podataka
  return [];
}

export async function getDoctorById(id: string): Promise<Doctor | null> {
  // TODO: Dohvatiti doktora po ID
  return null;
}
