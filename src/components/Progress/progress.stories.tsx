import { useEffect, useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Progress, { ProgressProps } from './progress'

const meta = {
  title: 'Progress',
  component: Progress,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '500px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

const ProgressWithHooks = (args: ProgressProps) => {
  const { percent, ...restProps } = args
  const [progress, setProgress] = useState(0)
  const timerId = useRef(undefined) as any
  const increment = useRef(6)
  const delay = useRef(1000)
  useEffect(() => {
    const tick = () => {
      if (progress < 100) {
        increment.current *= 1.2
        delay.current /= 1.2
        setProgress((prevProgress) => {
          const currentVal = Math.round(prevProgress + increment.current)
          return currentVal > 100 ? 100 : currentVal
        })
        clearTimeout(timerId.current)
        timerId.current = setTimeout(tick, delay.current)
      }
    }
    timerId.current = setTimeout(tick, delay.current)
    return () => {
      clearTimeout(timerId.current)
    }
  })

  return (
    <>
      <Progress percent={progress} {...restProps} />
    </>
  )
}

export const PrimaryProgress: Story = {
  args: {
    percent: 0,
    strokeHeight: 30,
    showText: true,
    theme: 'primary',
  },
  render: (args) => <ProgressWithHooks {...args} />,
}

export const SuccessProgress: Story = {
  args: {
    percent: 0,
    strokeHeight: 30,
    showText: true,
    theme: 'success',
  },
  render: (args) => <ProgressWithHooks {...args} />,
}
