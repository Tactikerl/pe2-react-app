export function getDatesBetween(start, end) {
  let dates = [];
  let currentDate = new Date(start);
  let endDate = new Date(end);

  while (currentDate <= endDate) {
    let newDate = new Date(currentDate);
    newDate.setHours(0, 0, 0, 0);
    dates.push(newDate);
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
