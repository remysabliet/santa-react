/**
 * Computes the current date in the format 'YYYY/DD/MM'
 * @returns {string} current date
 */
export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JavaScript

  return `${year}/${day}/${month}`;
};

/**
 * Return a Date object from a string in the format 'YYYY/DD/MM'
 * @param dateStr date in the format 'YYYY/DD/MM'
 * @returns {Date} date object
 */
export const getDateFromStr = (dateStr: string) => {
  const currentDatePart = dateStr.split("/");
  return new Date(
    Number(currentDatePart[0]),
    Number(currentDatePart[2]) - 1,
    Number(currentDatePart[1])
  );
}