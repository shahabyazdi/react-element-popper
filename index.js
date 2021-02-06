import React, { useRef, useEffect, forwardRef, useMemo, useCallback, isValidElement } from "react"

function ElementPopper({
  element,
  popper,
  position = "bottom-center",
  containerStyle,
  arrow,
  arrowStyle = {},
  fixMainPosition,
  fixRelativePosition,
  offsetY,
  offsetX,
  animation,
  zIndex = 0,
  popperShadow,
  onChange
},
  outerRef
) {
  const elementRef = useRef(),
    popperRef = useRef(),
    arrowRef = useRef(),
    defaultArrowStyle = { visibility: "hidden", left: "0", top: "0", position: "absolute" },
    defaultArrow = useMemo(() => arrow === true, [arrow]),
    isPopper = useMemo(() => popper ? true : false, [popper]),
    getOptions = useCallback(() => {
      return {
        position,
        fixMainPosition,
        fixRelativePosition,
        offsetY,
        offsetX,
        defaultArrow,
        animation,
        zIndex,
        onChange
      }
    }, [position, fixMainPosition, fixRelativePosition, offsetY, offsetX, defaultArrow, animation, onChange])

  useEffect(() => {
    if (!isPopper) {
      removeTransition()

      popperRef.current.parentNode.style.visibility = "hidden"

      if (arrowRef.current) arrowRef.current.style.visibility = "hidden"

      return
    }

    updatePosition()

    function updatePosition(e) {
      if (e && e.type !== "resize" && !e.target.contains(elementRef.current)) return
      if (e) removeTransition()

      setPosition(
        elementRef,
        popperRef,
        arrowRef,
        getOptions(),
        e
      )
    }

    function removeTransition() {
      if (arrowRef.current) arrowRef.current.style.transition = "none"
      if (popperRef.current) popperRef.current.parentNode.style.transition = "none"
    }

    document.addEventListener("scroll", updatePosition, true)
    window.addEventListener("resize", updatePosition)

    return () => {
      document.removeEventListener("scroll", updatePosition, true)
      window.removeEventListener("resize", updatePosition)
    }
  }, [
    isPopper,
    getOptions
  ])

  return (
    <div
      ref={element => {
        elementRef.current = element

        if (outerRef) outerRef.current = element

        if (outerRef?.current) {
          outerRef.current.refreshPosition = () => setPosition(
            elementRef,
            popperRef,
            arrowRef,
            getOptions()
          )
        }
      }}
      style={{ display: "inline-block", height: "max-content", ...containerStyle }}
    >
      {element}
      {arrow === true ?
        <div ref={arrowRef} className={`ep-arrow ${popperShadow ? "ep-shadow" : ""}`} style={{ ...defaultArrowStyle, ...arrowStyle }}></div> :
        isValidElement(arrow) ?
          <div ref={arrowRef} style={{ ...defaultArrowStyle, ...arrowStyle }}>
            {arrow}
          </div> :
          null
      }
      <div
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          willChange: "transform",
          visibility: "hidden",
          boxShadow: popperShadow ? "0 0 6px #becadb" : "",
          zIndex
        }}
      >
        <div ref={popperRef}>{popper}</div>
      </div>
    </div>
  )
}

export default forwardRef(ElementPopper)

function setPosition(
  elementRef,
  popperRef,
  arrowRef,
  {
    position,
    fixMainPosition,
    fixRelativePosition,
    offsetY = 0,
    offsetX = 0,
    defaultArrow,
    animation,
    zIndex,
    onChange
  },
  e
) {
  if (!elementRef.current || !popperRef.current) return

  let { scrollLeft, scrollTop } = getScroll(),
    { top: elementTop, left: elementLeft, height: elementHeight, width: elementWidth, right: elementRight, bottom: elementBottom } = getPosition(elementRef.current, scrollLeft, scrollTop),
    { top: popperTop, left: popperLeft, height: popperHeight, width: popperWidth } = getPosition(popperRef.current, scrollLeft, scrollTop),
    { clientHeight, clientWidth } = document.documentElement,
    popperContainer = popperRef.current.parentNode,
    [translateX, translateY] = getTranslate(popperContainer),
    [mainPosition, relativePosition, vertical, horizontal] = exportPosition(position),
    currentMainPosition = mainPosition,
    getTransform = (x, y) => `translate(${x}px, ${y}px)`,
    lengthDifference = elementWidth - popperWidth,
    heightDifference = elementHeight - popperHeight,
    leftCorner = (relativePosition === "left" ? 0 : relativePosition === "right" ? lengthDifference : (lengthDifference / 2)),
    rightCorner = lengthDifference - leftCorner,
    topCorner = (relativePosition === "top" ? 0 : relativePosition === "bottom" ? heightDifference : (heightDifference / 2)),
    bottomCorner = heightDifference - topCorner,
    x = (elementLeft - popperLeft) + translateX,
    y = (elementTop - popperTop) + translateY,
    distanceX = 0,
    distanceY = 0,
    scrollableParent = getScrollableParent(elementRef.current),
    parentPosition,
    arrow = arrowRef.current,
    [translateArrowX, translateArrowY] = getTranslate(arrow),
    { left: arrowLeft, top: arrowTop, height: arrowHeight = 0, width: arrowWidth = 0 } = getPosition(arrow, scrollLeft, scrollTop) || {},
    arrowX = (elementLeft - arrowLeft) + translateArrowX,
    arrowY = (elementTop - arrowTop) + translateArrowY,
    arrowDistanceX,
    arrowDistanceY,
    animationX = 0,
    animationY = 0

  if (mainPosition === "auto") mainPosition = "bottom"
  if (relativePosition === "auto") relativePosition = "center"

  if (vertical) {
    x += leftCorner
    y += mainPosition === "top" ? -popperHeight : elementHeight

    if (arrow && defaultArrow) {
      arrowHeight = 11
      arrowWidth = 20
    }
  }

  if (horizontal) {
    x += mainPosition === "left" ? -popperWidth : elementWidth
    y += topCorner

    if (arrow && defaultArrow) {
      arrowHeight = 20
      arrowWidth = 11
    }
  }

  while (scrollableParent) {
    parentPosition = getPosition(scrollableParent, scrollLeft, scrollTop)
    checkPopper(parentPosition)
    scrollableParent = getScrollableParent(scrollableParent.parentNode)
  }

  //checking the whole document
  checkPopper({
    top: scrollTop,
    bottom: scrollTop + clientHeight,
    left: scrollLeft,
    right: scrollLeft + clientWidth,
    height: clientHeight,
    width: clientWidth
  })

  function checkPopper({ top, bottom, left, right, height, width }) {
    if (vertical) {
      let elementCenterY = Math.round(elementTop - top + (elementHeight / 2)),
        parentCenterY = Math.round(height / 2)

      if (!fixMainPosition) {
        if (
          elementTop - (popperHeight + offsetY + arrowHeight) < top &&
          elementCenterY <= parentCenterY &&
          currentMainPosition === "top"
        ) {
          y += popperHeight + elementHeight

          currentMainPosition = "bottom"
        } else if (
          elementBottom + popperHeight + offsetY + arrowHeight > height + top &&
          elementCenterY >= parentCenterY &&
          currentMainPosition === "bottom"
        ) {
          y -= popperHeight + elementHeight

          currentMainPosition = "top"
        }
      }

      if (!fixRelativePosition) {
        if (elementLeft + leftCorner < left) {
          distanceX = getDistance(
            elementRight - arrowWidth > left ? (elementLeft + leftCorner - left) : (-elementWidth + leftCorner + arrowWidth),
            distanceX
          )
        }

        if (elementRight - rightCorner > right) {
          distanceX = getDistance(
            elementLeft + arrowWidth < right ? elementRight - rightCorner - right : (elementWidth - rightCorner - arrowWidth),
            distanceX
          )
        }
      }
    }

    if (horizontal) {
      let elementCenterX = Math.round(elementLeft - left + (elementWidth / 2)),
        parentCenterX = Math.round(width / 2)

      if (!fixMainPosition) {
        if (
          elementLeft - (popperWidth + offsetX + arrowWidth) < left &&
          elementCenterX < parentCenterX &&
          currentMainPosition === "left"
        ) {
          x += elementWidth + popperWidth

          currentMainPosition = "right"
        } else if (
          elementRight + popperWidth + offsetX + arrowWidth > right &&
          elementCenterX > parentCenterX &&
          currentMainPosition === "right"
        ) {
          x -= elementWidth + popperWidth

          currentMainPosition = "left"
        }
      }

      if (!fixRelativePosition) {
        if (elementTop + topCorner < top) {
          distanceY = getDistance(
            elementBottom - arrowHeight > top ? elementTop + topCorner - top : (-elementHeight + topCorner + arrowHeight),
            distanceY
          )
        }

        if (elementBottom - bottomCorner > bottom) {
          distanceY = getDistance(
            elementTop + arrowHeight < bottom ? elementBottom - bottomCorner - bottom : (elementHeight - bottomCorner - arrowHeight),
            distanceY
          )
        }
      }
    }
  }

  if (vertical) y += currentMainPosition === "bottom" ? offsetY : -offsetY
  if (horizontal) x += currentMainPosition === "right" ? offsetX : -offsetX
  if (animation && vertical && !e) animationY = currentMainPosition === "bottom" ? 10 : -10
  if (animation && horizontal && !e) animationX = currentMainPosition === "right" ? 10 : -10

  x = x - distanceX + animationX
  y = y - distanceY + animationY

  let mirror = { top: "bottom", bottom: "top", left: "right", right: "left" }
  let arrowDirection = mirror[currentMainPosition]

  if (arrow) {
    if (distanceX - leftCorner < 0) {
      arrowDistanceX = (x - elementLeft) / 2

      arrowX += arrowDistanceX < 0 ? 0 : arrowDistanceX
    }

    if (distanceX + rightCorner > 0) {
      arrowDistanceX = ((x + popperWidth) - elementRight) / 2

      arrowX += arrowDistanceX > 0 ? 0 : arrowDistanceX
    }

    if (distanceY - topCorner < 0) {
      arrowDistanceY = (y - elementTop) / 2

      arrowY += arrowDistanceY < 0 ? 0 : arrowDistanceY
    }

    if (distanceY + bottomCorner > 0) {
      arrowDistanceY = ((y + popperHeight) - elementBottom) / 2

      arrowY += arrowDistanceY > 0 ? 0 : arrowDistanceY
    }

    if (vertical) {
      arrowX += (elementWidth / 2) - (arrowWidth / 2)

      if (currentMainPosition === "bottom") {
        arrowY = y
        y += arrowHeight
      }

      if (currentMainPosition === "top") {
        y -= arrowHeight
        arrowY = y + popperHeight
      }
    }

    if (horizontal) {
      arrowY += (elementHeight / 2) - (arrowHeight / 2)

      if (currentMainPosition === "left") {
        x -= arrowWidth
        arrowX = x + popperWidth
      }

      if (currentMainPosition === "right") {
        arrowX = x
        x += arrowWidth
      }
    }

    arrow.style.height = arrowHeight + "px"
    arrow.style.width = arrowWidth + "px"
    arrow.style.transform = getTransform(arrowX, arrowY)
    arrow.setAttribute("direction", arrowDirection)
    arrow.style.visibility = "visible"
    arrow.style.zIndex = zIndex + 1
  }

  popperContainer.style.transform = getTransform(x, y)
  popperContainer.style.visibility = "visible"

  if (!e && animation) {
    setTimeout(() => {
      popperContainer.style.transition = ".4s"
      popperContainer.style.transform = getTransform(x - animationX, y - animationY)

      if (arrow) {
        arrow.style.transition = ".4s"
        arrow.style.transform = getTransform(arrowX - animationX, arrowY - animationY)
      }
    }, 18)
  }

  if (onChange instanceof Function) {
    onChange({
      popper: {
        top: y,
        bottom: y + popperHeight,
        left: x,
        right: x + popperWidth,
        height: popperHeight,
        width: popperWidth
      },
      element: {
        top: elementTop,
        bottom: elementBottom,
        left: elementLeft,
        right: elementRight,
        height: elementHeight,
        width: elementWidth
      },
      arrow: {
        top: arrowY,
        bottom: arrowY + arrowHeight,
        left: arrowX,
        right: arrowX + arrowWidth,
        height: arrowHeight,
        width: arrowWidth,
        direction: arrowDirection
      },
      position: currentMainPosition + "-" + (distanceX !== 0 ? "auto" : relativePosition),
      scroll: { scrollLeft, scrollTop }
    })
  }
}

function getScroll() {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#notes
   */

  let supportPageOffset = window.pageXOffset !== undefined,
    isCSS1Compat = ((document.compatMode || "") === "CSS1Compat")

  return {
    scrollLeft: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
    scrollTop: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
  }
}

function getPosition(element, scrollLeft, scrollTop) {
  if (!element) return

  let { top, left, width, height } = element.getBoundingClientRect(),
    elementTop = top + scrollTop,
    elementLeft = left + scrollLeft

  return {
    top: elementTop,
    bottom: elementTop + height,
    left: elementLeft,
    right: elementLeft + width,
    width,
    height
  }
}

function getTranslate(element) {
  if (!element) return [0, 0]

  let [, x = 0, y = 0] = (element.style.transform.match(/translate\((.*?)px,\s(.*?)px\)/) || []).map(string => Number(string))

  return [x, y]
}

function getScrollableParent(element) {
  if (!element || element.tagName === "HTML") return

  if (
    element.clientHeight < element.offsetHeight ||
    element.clientWidth < element.offsetWidth
  ) return element

  return getScrollableParent(element.parentNode)
}

function exportPosition(position) {
  let [mainPosition = "bottom", relativePosition = "center"] = position.split("-"),
    vertical = mainPosition === "top" || mainPosition === "bottom",
    horizontal = mainPosition === "left" || mainPosition === "right"

  if (horizontal) {
    if (relativePosition === "start") relativePosition = "top"
    if (relativePosition === "end") relativePosition = "bottom"
  }

  if (vertical) {
    if (relativePosition === "start") relativePosition = "left"
    if (relativePosition === "end") relativePosition = "right"
  }

  return [mainPosition, relativePosition, vertical, horizontal]
}

function getDistance(currentDistance, previousDistance) {
  if (Math.round(Math.abs(currentDistance)) > Math.round(Math.abs(previousDistance))) {
    return currentDistance
  }

  return previousDistance
}