export function buildTakenSlots(
  appointments: { doctorId: string | number; date: string; time: string; status: string }[]
): Record<string, string[]> {
  const takenSlots: Record<string, string[]> = {};
  appointments
    .filter((a) => a.status !== "rejected" && a.status !== "cancelled")
    .forEach((a) => {
      const key = `${a.doctorId}_${a.date}`;
      if (!takenSlots[key]) takenSlots[key] = [];
      takenSlots[key].push(a.time);
    });
  return takenSlots;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("sr-RS", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatTime(time: string): string {
  return time.slice(0, 5);
}

export function getStatusLabel(status: "pending" | "confirmed" | "cancelled"): string {
  const labels = {
    pending: "Na čekanju",
    confirmed: "Potvrđen",
    cancelled: "Otkazan",
  };
  return labels[status];
}
