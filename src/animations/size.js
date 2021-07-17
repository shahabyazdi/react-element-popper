export default function size({ from = 0, duration = 400 } = {}) {
  if (from > 100) from = 100;
  if (from < 0) from = 0;

  return function ({ popper, data }) {
    let child = popper.children?.[0]?.children?.[0],
      [mainPosition] = data.position.split("-"),
      horizontal = ["left", "right"].includes(mainPosition),
      side = horizontal ? "width" : "height";

    if (!child) return;

    child.style[side] = (data.popper[side] * from) / 100 + "px";

    setTimeout(() => {
      child.style.transition = duration + "ms";
      child.style[side] = data.popper[side] + "px";
    }, 18);
  };
}
