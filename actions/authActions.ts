"use server";

import { User } from "@/types";

export async function loginUser(email: string, password: string): Promise<User | null> {
  // TODO: Verifikacija kredencijala
  return null;
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<User> {
  // TODO: Kreiranje novog korisnika
  throw new Error("Not implemented");
}

export async function logoutUser(): Promise<void> {
  // TODO: Odjava korisnika
}
