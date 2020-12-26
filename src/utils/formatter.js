// Приводит строку xxxxxxxxxxx
// К виду +x xxx xxx-xx-xx
function toPhone(number) {
  const first = '+7';
  const second = `${number.slice(1, 4)}`;
  const third = `${number.slice(4, 7)}`;
  const forth = `${number.slice(7, 9)}`;
  const fifth = `${number.slice(9)}`;

  return `${first} ${second} ${third}-${forth}-${fifth}`;
}

export default {
  toPhone
};
