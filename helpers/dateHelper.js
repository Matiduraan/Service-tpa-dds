export function diffInMinutes(date1, date2) {
  const diff = date2.getTime() - date1.getTime();
  return Math.round(diff / 60000);
}
