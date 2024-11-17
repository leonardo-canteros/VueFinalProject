export function formatDate(date: string | Date): string {
  if (!date) return "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/Argentina/Buenos_Aires",
  };
  return new Date(date).toLocaleString("es-AR", options);
}