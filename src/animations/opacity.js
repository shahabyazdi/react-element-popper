export default function opacity({ from = 0, to = 1, duration = 400 } = {}) {
  if (from < 0) from = 0;
  if (to > 1) to = 1;

  return function ({ popper, arrow }) {
    popper.style.opacity = from;

    if (arrow) arrow.style.opacity = from;

    setTimeout(() => {
      popper.style.transition = duration + "ms";
      popper.style.opacity = to;

      if (arrow) {
        arrow.style.transition = duration + "ms";
        arrow.style.opacity = to;
      }
    }, 18);
  };
}
