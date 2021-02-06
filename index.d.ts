declare module "react-element-popper" {
  import React from "react"

  interface ElementPopperProps{
    ref?:React.RefObject<any>,
    /**
     * Refrence element
     */
    element: React.ReactElement,
    /**
     * Popper element
     */
    popper?: React.ReactElement,
    /**
     * Enter `true` if you want to use a built-in arrow.
     * 
     * Or enter you're component to render it as an arrow.
     * 
     * @example
     * 
     * <ElementPopper
     *  element={<RefrenceComponent/>}
     *  popper={<PopperComponent/>}
     *  arrow
     * />
     * 
     * <ElementPopper
     *  element={<RefrenceComponent/>}
     *  popper={<PopperComponent/>}
     *  arrow={<ArrowComponent/>}
     * />
     */
    arrow?: boolean | React.ReactElement,
    containerStyle?: React.CSSProperties,
    arrowStyle?: React.CSSProperties,
    fixMainPosition?: boolean,
    fixRelativePosition?: boolean,
    offsetY?: number,
    offsetX?: number,
    animation?: boolean,
    /**
     * Availble positions: 
     *
     *   - top or top-center
     *   - bottom or bottom-center
     *   - left or left-center
     *   - right or right-center
     *   - top-start or top-left
     *   - bottom-start or bottom-left
     *   - left-start or left-top
     *   - right-start or righ-top
     *   - top-end or top-right
     *   - bottom-end or bottom-right
     *   - left-end or left-bottom
     *   - right-end or right-bottom
     * 
     * @example
     * <Calendar calendar="persian" />
     * <DatePicker calendar="indian" />
     */
    position? : string,
    /**
     * default z-index = 0
     */
    zIndex:number,
    popperShadow:boolean,
    onChange?(data:{
      popper: {
        top: number,
        bottom: number,
        left: number,
        right: number,
        height: number,
        width: number
      },
      element: {
        top: number,
        bottom: number,
        left: number,
        right: number,
        height: number,
        width: number
      },
      arrow: {
        top: number,
        bottom: number,
        left: number,
        right: number,
        height: number,
        width: number,
        direction: string
      },
      position: string,
      scroll: { 
        scrollLeft:number,
        scrollTop:number
      }
    }): void
  } 

  export default function ElementPopper(props: ElementPopperProps): React.ReactElement
}