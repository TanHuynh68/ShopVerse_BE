const generateDates = (start, end) => {
  const result = [];
  let current = new Date(start);

  const last = new Date(end);

  while (current <= last) {
    result.push(current.toISOString().split("T")[0]); // yyyy-mm-dd
    current.setDate(current.getDate() + 1);
  }

  return result;
};

module.exports = { generateDates };
