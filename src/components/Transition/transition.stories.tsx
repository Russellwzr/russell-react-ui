import React, { useState } from 'react'
import Button from '../Button'
import Transition, { TransitionProps } from './transition'

export default {
  title: 'Transition',
  component: Transition,
  tags: ['autodocs'],
  argTypes: {
    animation: {
      control: {
        type: 'select',
        options: ['zoom-in-top', 'zoom-in-left', 'zoom-in-bottom', 'zoom-in-right'],
      },
    },
  },
}

export const TransitionExample = (args: TransitionProps) => {
  const [show, setShow] = useState(false)

  const toggleAnimation = () => {
    setShow((prevShow) => !prevShow)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <Button size="sm" onClick={toggleAnimation} btnType="primary" style={{ marginBottom: '4px' }}>
          Show Transition
        </Button>
        <Transition in={show} timeout={300} animation={args.animation}>
          <ul
            className="menu menu-vertical"
            style={{
              border: '1px solid #dee2e6',
              boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04)',
            }}
          >
            <li className="menu-item">Test Transition</li>
            <li className="menu-item">Test Transition</li>
            <li className="menu-item">Test Transition</li>
            <li className="menu-item">Test Transition</li>
            <li className="menu-item">Test Transition</li>
          </ul>
        </Transition>
      </div>
    </div>
  )
}

TransitionExample.args = {
  animation: 'zoom-in-left',
}
