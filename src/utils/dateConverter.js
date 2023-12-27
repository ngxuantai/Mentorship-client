import { DaysInVietnamese } from "../constants";

export function formatTime(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}${month}${day}T000000Z`;
}

// hh:mm - hh:mm thứ x
//start & end is in the same day
export function convertTimestampRange(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  const hours1 = date1.getHours().toString().padStart(2, "0");
  const minutes1 = date1.getMinutes().toString().padStart(2, "0");

  const hours2 = date2.getHours().toString().padStart(2, "0");
  const minutes2 = date2.getMinutes().toString().padStart(2, "0");

  const dayOfWeek = date1.getDay();

  return `${hours1}:${minutes1} - ${hours2}:${minutes2} ${DaysInVietnamese[dayOfWeek]}`;
}
