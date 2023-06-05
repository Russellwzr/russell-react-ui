import type { Meta, StoryObj } from '@storybook/react'

import Button from './button'

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const ButtonGallery: Story = {
  render: () => (
    <>
      <Button {...Primary.args}></Button>
      <Button {...Default.args}></Button>
      <Button {...Danger.args}></Button>
      <Button {...Link.args}></Button>
      <Button {...Large.args}></Button>
      <Button {...Small.args}></Button>
    </>
  ),
}

export const Primary: Story = {
  args: {
    btnType: 'primary',
    size: 'lg',
    children: 'Primary',
  },
}

export const Default: Story = {
  args: {
    btnType: 'default',
    size: 'lg',
    children: 'Default',
  },
}

export const Danger: Story = {
  args: {
    btnType: 'danger',
    size: 'lg',
    children: 'Danger',
  },
}

export const Link: Story = {
  args: {
    btnType: 'link',
    size: 'lg',
    children: 'Link',
  },
}

export const Large: Story = {
  args: {
    btnType: 'primary',
    size: 'lg',
    children: 'Large',
  },
}

export const Small: Story = {
  args: {
    btnType: 'primary',
    size: 'sm',
    children: 'Small',
  },
}
