import React, { useRef, useEffect, forwardRef } from "react"

function ElementPopper({ element, popper, position = "auto", containerStyle }, outerRef) {
  const elementRef = useRef()
  const popperRef = useRef()
  const ref = useRef({ position, x: 0, y: 0 })

  useEffect(() => {
    ref.current = { ...ref.current, position, x: 0, y: 0 }
  }, [position])

  useEffect(() => {
    if (!popper) return popperRef.current.parentNode.style.visibility = "hidden"

    checkPosition(undefined, elementRef, popperRef, ref)

    function updatePosition(e) {
      checkPosition(e, elementRef, popperRef, ref)
    }

    document.addEventListener("scroll", updatePosition, true)
    window.addEventListener("resize", updatePosition)

    return () => {
      document.removeEventListener("scroll", updatePosition, true)
      window.removeEventListener("resize", updatePosition)
    }
  }, [popper, position])

  return (
    <div
      ref={element => {
        elementRef.current = element

        if (outerRef) outerRef.current = element

        if (outerRef?.current) {
          outerRef.current.update = () => checkPosition(undefined, elementRef, popperRef, ref)
        }
      }}
      style={{ display: "inline-block", ...containerStyle }}
    >
      {element}
      <div
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          willChange: "transform",
          visibility: "hidden"
        }}
      >
        <div
          ref={popperRef}
        >
          {popper}
        </div>
      </div>
    </div>
  )
}

export default forwardRef(ElementPopper)

function checkPosition(e, elementRef, popperRef, ref) {
  if (!elementRef.current || !popperRef.current) return
  if (e && e.type !== "resize" && !e.target.contains(elementRef.current)) return

  let scroll = getScroll(),
    { top: elementTop, left: elementLeft, height: elementHeight, width: elementWidth, right: elementRight, bottom: elementBottom } = getPosition(elementRef.current, scroll),
    { top: popperTop, left: popperLeft, height: popperHeight, width: popperWidth } = getPosition(popperRef.current, scroll),
    { clientHeight, clientWidth } = document.documentElement,
    { top: eventTop = 0, height: eventHeight = clientHeight, left: eventLeft = 0, width: eventWidth = clientWidth } = (e?.type === "scroll" && e.target.constructor !== HTMLDocument ? getPosition(e.target, scroll) : {}),
    popperContainer = popperRef.current.parentNode,
    [, translateX = 0, translateY = 0] = popperContainer.style.transform.match(/translate\((.*?)px,\s(.*?)px\)/) || [],
    [mainPosition = "auto", relativePosition = "auto"] = ref.current.position.split("-"),
    getTransform = (x, y) => `translate(${x}px, ${y}px)`,
    reducedWidth = elementWidth - popperWidth,
    reducedHeight = elementHeight - popperHeight,
    cornerWidth = (relativePosition === "left" ? 0 : relativePosition === "right" ? reducedWidth : (reducedWidth / 2)),
    cornerHeight = (relativePosition === "top" ? 0 : relativePosition === "bottom" ? reducedHeight : (reducedHeight / 2)),
    x,
    y

  translateX = Number(translateX)
  translateY = Number(translateY)

  if (["top", "bottom", "auto"].includes(mainPosition)) {
    x = (elementLeft - popperLeft) + translateX + cornerWidth
    y = (elementTop - popperTop) + translateY + (mainPosition === "top" ? -popperHeight : elementHeight)

    if (
      elementTop - popperHeight < eventTop &&
      elementTop - eventTop + (elementHeight / 2) < eventHeight / 2 &&
      mainPosition === "top"
    ) {
      y += popperHeight + elementHeight

      mainPosition = "bottom"
    } else if (
      elementBottom + popperHeight > eventHeight + eventTop &&
      elementTop + (elementHeight / 2) - eventTop > eventHeight / 2 &&
      mainPosition === "bottom"
    ) {
      y -= popperHeight + elementHeight

      mainPosition = "top"
    }

    if (
      elementLeft + cornerHeight - eventLeft < 0
    ) {
      x -= elementLeft + cornerHeight - eventLeft

      if (elementRight - eventLeft < 0) {
        x += elementRight - eventLeft
      }
    }

    if (elementRight - cornerHeight + eventLeft > clientWidth) {
      x -= elementRight - cornerHeight - clientWidth + eventLeft

      if (elementLeft + eventLeft > clientWidth) {
        x += elementLeft - clientWidth + eventLeft
      }
    }
  }

  if (["left", "right"].includes(mainPosition)) {
    y = (elementTop - popperTop) + translateY + cornerHeight
    x = ((elementLeft - popperLeft) + translateX) + (mainPosition === "left" ? -popperWidth : elementWidth)

    if (
      elementLeft - popperWidth - eventLeft < 0 &&
      elementLeft + (elementWidth / 2) - eventLeft < (clientWidth / 2) - eventLeft &&
      mainPosition === "left"
    ) {
      x += elementWidth + popperWidth

      mainPosition = "right"
    } else if (
      elementRight + popperWidth > eventWidth + eventLeft &&
      elementLeft + (elementWidth / 2) - eventLeft > eventWidth / 2 &&
      mainPosition === "right"
    ) {
      x -= elementWidth + popperWidth

      mainPosition = "left"
    }

    if (elementTop + cornerWidth - eventTop < 0) {
      y -= elementTop + cornerWidth - eventTop

      if (elementBottom - eventTop < 0) {
        y += elementBottom - eventTop
      }
    }

    if (elementBottom - cornerWidth - eventTop > eventHeight) {
      y -= elementBottom - cornerWidth - (eventTop + eventHeight)

      if (elementTop - eventTop > eventHeight) {
        y += elementTop - eventTop - eventHeight
      }
    }
  }

  popperContainer.style.transform = getTransform(x, y)
  popperContainer.style.visibility = "visible"
  ref.current.position = mainPosition + "-" + relativePosition
}

function getScroll() {
  let supportPageOffset = window.pageXOffset !== undefined
  let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat")

  let scrollLeft = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft
  let scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop

  return {
    scrollLeft,
    scrollTop
  }
}

function getPosition(element, scroll) {
  let { scrollLeft, scrollTop } = scroll
  let { clientTop, clientLeft } = element.ownerDocument.documentElement
  let { pageYOffset, pageXOffset } = window
  let { top, left, width, height } = element.getBoundingClientRect(),
    elementTop = top + pageYOffset - clientTop - scrollTop,
    elementLeft = left + pageXOffset - clientLeft - scrollLeft

  return {
    top: elementTop,
    bottom: elementTop + height,
    left: elementLeft,
    right: elementLeft + width,
    width,
    height
  }
}