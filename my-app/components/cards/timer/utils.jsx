const padToTwo = (number) => (number <= 9 ? `0${number}` : number);
export const displayTime = (seconds) => {
  let minutes = 0;

  if (seconds < 0) {
    centiseconds = 0;
    return "00:00:00";
  }

  if (seconds < 60) {
    return `00:${padToTwo(seconds)}`;
  }

  let remainSeconds = seconds % 60;
  minutes = (seconds - remainSeconds) / 60;

  return `${padToTwo(minutes)}:${padToTwo(remainSeconds)}`;
};
