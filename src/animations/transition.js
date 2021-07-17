export default function transition({
  from = 12,
  duration = 400,
  transition,
} = {}) {
  if (from < 0) from = 0;

  return function ({
    popper,
    arrow,
    data: {
      position,
      getTransform,
      popper: { top: popperTop, left: popperLeft },
      arrow: { top: arrowTop, left: arrowLeft },
    },
  }) {
    let [mainPosition] = position.split("-"),
      horizontal = ["left", "right"].includes(mainPosition),
      data = { top: 0, left: 0 };

    if (horizontal) {
      data.left += mainPosition === "right" ? from : -from;
    } else {
      data.top += mainPosition === "bottom" ? from : -from;
    }

    setTransform(popper, popperLeft + data.left, popperTop + data.top);

    if (arrow) setTransform(arrow, arrowLeft + data.left, arrowTop + data.top);

    setTimeout(() => {
      setTransition(popper);
      setTransform(popper, popperLeft, popperTop);

      if (arrow) {
        setTransition(arrow);
        setTransform(arrow, arrowLeft, arrowTop);
      }
    }, 18);

    function setTransition(element) {
      element.style.transition = transition || duration + "ms";
    }

    function setTransform(element, left, top) {
      element.style.transform = getTransform(left, top);
    }
  };
}
