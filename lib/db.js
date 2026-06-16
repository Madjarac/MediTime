import fs from "fs";
import path from "path";
import { doctors as staticDoctors } from "./doctors.js";

const DATA_DIR = path.join(process.cwd(), "data");
const APPOINTMENTS_FILE = path.join(DATA_DIR, "appointments.json");
const DOCTORS_FILE = path.join(DATA_DIR, "doctors.json");
const DELETED_DOCTORS_FILE = path.join(DATA_DIR, "deleted_doctors.json");
const DOCTOR_OVERRIDES_FILE = path.join(DATA_DIR, "doctor_overrides.json");

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(APPOINTMENTS_FILE)) fs.writeFileSync(APPOINTMENTS_FILE, "[]");
}

export function getAppointments() {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(APPOINTMENTS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function getAppointmentsByDoctor(doctorId) {
  return getAppointments().filter((a) => a.doctorId === doctorId);
}

function nextAppointmentId(appointments) {
  const maxNum = appointments.reduce((max, a) => {
    const match = String(a.id).match(/^MT-(\d+)$/);
    if (!match) return max;
    return Math.max(max, parseInt(match[1], 10));
  }, 0);
  return `MT-${String(maxNum + 1).padStart(3, "0")}`;
}

export function addAppointment(data) {
  const all = getAppointments();
  const id = nextAppointmentId(all);
  const appointment = {
    id,
    status: "pending",
    ...data,
    createdAt: new Date().toISOString(),
  };
  all.push(appointment);
  ensureFile();
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(all, null, 2));
  return appointment;
}

export function updateAppointmentStatus(id, status) {
  const all = getAppointments();
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  all[idx].status = status;
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(all, null, 2));
  return true;
}

export function deleteAppointment(id) {
  const all = getAppointments();
  const filtered = all.filter((a) => a.id !== id);
  if (filtered.length === all.length) return false;
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(filtered, null, 2));
  return true;
}

// ─── Doctors ────────────────────────────────────────────────────────────────

export function getCustomDoctors() {
  ensureFile();
  if (!fs.existsSync(DOCTORS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DOCTORS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function getDeletedDoctorIds() {
  if (!fs.existsSync(DELETED_DOCTORS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DELETED_DOCTORS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function markStaticDoctorAsDeleted(id) {
  ensureFile();
  const deleted = getDeletedDoctorIds();
  if (!deleted.includes(id)) {
    deleted.push(id);
    fs.writeFileSync(DELETED_DOCTORS_FILE, JSON.stringify(deleted, null, 2));
  }
}

export function deleteAnyDoctor(id, isCustom) {
  if (isCustom) return deleteCustomDoctor(id);
  markStaticDoctorAsDeleted(id);
  return true;
}

export function getDoctorOverrides() {
  if (!fs.existsSync(DOCTOR_OVERRIDES_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(DOCTOR_OVERRIDES_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function saveStaticDoctorOverride(id, data) {
  ensureFile();
  const overrides = getDoctorOverrides();
  overrides[id] = { ...(overrides[id] || {}), ...data };
  fs.writeFileSync(DOCTOR_OVERRIDES_FILE, JSON.stringify(overrides, null, 2));
}

function updateCustomDoctorById(id, data) {
  const all = getCustomDoctors();
  const idx = all.findIndex((d) => d.id === id);
  if (idx === -1) return false;
  all[idx] = { ...all[idx], ...data };
  fs.writeFileSync(DOCTORS_FILE, JSON.stringify(all, null, 2));
  return true;
}

export function updateAnyDoctor(id, isCustom, data) {
  if (isCustom) return updateCustomDoctorById(id, data);
  saveStaticDoctorOverride(id, data);
  return true;
}

export function getActiveDoctors() {
  const deletedIds = getDeletedDoctorIds();
  const overrides = getDoctorOverrides();
  const activeStatic = staticDoctors
    .filter((d) => !deletedIds.includes(d.id))
    .map((d) => (overrides[d.id] ? { ...d, ...overrides[d.id] } : d));
  return [...activeStatic, ...getCustomDoctors()];
}

export function addCustomDoctor(data) {
  const all = getCustomDoctors();
  const id = 1000 + all.length + 1;
  const doctor = { id, ...data, isCustom: true };
  all.push(doctor);
  ensureFile();
  fs.writeFileSync(DOCTORS_FILE, JSON.stringify(all, null, 2));
  return doctor;
}

export function deleteCustomDoctor(id) {
  const all = getCustomDoctors();
  const filtered = all.filter((d) => d.id !== id);
  if (filtered.length === all.length) return false;
  fs.writeFileSync(DOCTORS_FILE, JSON.stringify(filtered, null, 2));
  return true;
}
