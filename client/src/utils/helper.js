import moment from "moment";

export const getDurationSummary = (start, end) => {
  if (!end) return "";

  const startDate = moment(start);
  const endDate = moment(end);

  const totalMonths = endDate.diff(startDate, "months");

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0) {
    return months > 0
      ? `(${years}.${months} year${years > 1 ? "s" : ""})`
      : `(${years} year${years > 1 ? "s" : ""})`;
  }

  if (months > 0) {
    return `(${months} month${months > 1 ? "s" : ""})`;
  }

  return "(Less than a month)";
};
