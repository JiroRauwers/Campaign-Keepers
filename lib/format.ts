import { format } from 'date-fns';

export function formatDate(
  date: Date | string | null,
    formatString: string = "MMM d, yyyy"
  
): string {
  try {
    if (!date) return "";
    if (typeof date === "string") {
      date = new Date(date);
    }
    return format(date, formatString);
  } catch (error) {
    console.error(error);
    return date as string;
  }
}

export function formatDateWithTime(date: Date | string | null): string {
  return formatDate(date, "MMM d, yyyy h:mm a");
}
