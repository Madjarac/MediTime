export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone?: string;
  imageUrl?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  doctorId: string;
  date: Date;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "admin";
}
