export function getDatesBetween(start, end) {
  let dates = [];
  let currentDate = new Date(start);
  let endDate = new Date(end);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

function isInArray(array, value) {
  return !!array.find((item) => {
    return item.getTime() == value.getTime();
  });
}

export function findAvailableDate(tomorrow, disabledDates) {
  let currentDate = tomorrow;

  while (isInArray(disabledDates, currentDate)) {
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return currentDate;
}
