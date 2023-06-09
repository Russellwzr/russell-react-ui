import React, { ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

export type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

export type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName
  /* avoid transition conflicts */
  wrapper?: boolean
  children?: ReactNode
}

export const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, wrapper, ...restProps } = props
  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  /* unmount the component after it finishes exiting. */
  unmountOnExit: true,
  /* transition on the first mount, and the component will transition in as soon as the `<Transition>` mounts. */
  appear: true,
}

export default Transition
