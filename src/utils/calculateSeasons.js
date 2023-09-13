const calculateSeasons = (contests) => {
  if (contests.length === 0) {
    return null;
  }
  const years = [];
  const ranges = [];

  const data = contests.sort((a, b) => new Date(a.date) - new Date(b.date));

  if (new Date(data[0].date).getMonth() + 1 <= 8) {
    years.push(new Date(data[0].date).getFullYear() - 1);
  } else {
    years.push(new Date(data[0].date).getFullYear());
  }
  if (new Date(data[data.length - 1].date).getMonth() + 1 >= 9) {
    years.push(new Date(data[data.length - 1].date).getFullYear() + 1);
  } else {
    years.push(new Date(data[data.length - 1].date).getFullYear());
  }
  for (years[0]; years[0] < years[1]; years[0]++) {
    ranges.push({
      label: `${years[0]}/${(years[0] + 1).toString().slice(2)}`,
      value: [
        new Date(years[0], 8, 1).getTime(),
        new Date(years[0] + 1, 7, 31).getTime(),
      ],
    });
  }
  ranges.reverse();

  return ranges;
};
export default calculateSeasons;
