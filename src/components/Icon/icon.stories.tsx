import type { Meta, StoryObj } from '@storybook/react'

import Icon, { IconProps } from './icon'

const meta = {
  title: 'Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof Icon>

export const IconGallery: Story = {
  render: () => (
    <>
      <Icon {...(Beat.args as IconProps)} />
      <Icon {...(Bounce.args as IconProps)} />
      <Icon {...(Spin.args as IconProps)} />
      <Icon {...(Shake.args as IconProps)} />
    </>
  ),
}

export const Beat: Story = {
  args: {
    icon: 'wand-magic-sparkles',
    beat: true,
    theme: 'primary',
    size: '2x',
  },
}

export const Bounce: Story = {
  args: {
    icon: 'thumbs-up',
    bounce: true,
    theme: 'danger',
    size: '2x',
  },
}

export const Spin: Story = {
  args: {
    icon: 'hourglass-half',
    spin: true,
    theme: 'info',
    size: '2x',
  },
}

export const Shake: Story = {
  args: {
    icon: 'bell',
    shake: true,
    theme: 'warning',
    size: '2x',
  },
}
