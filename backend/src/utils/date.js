export const parseDate = (dateText) => {
  if (!dateText) return null;

  // Remove weekday
  const cleaned = dateText.replace(/^[A-Za-z]+,\s*/, "");
  const parsed = new Date(cleaned);

  return isNaN(parsed.getTime()) ? null : parsed;
};
