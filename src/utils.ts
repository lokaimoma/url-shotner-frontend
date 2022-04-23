function getDaysDelta(date1: any, date2: any) {
  const delta = date2 - date1;
  const days = delta / (1000 * 60 * 60 * 24);
  return days;
}

export { getDaysDelta };
