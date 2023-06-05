import type { Meta, StoryObj } from '@storybook/react'

import Alert from './alert'

const meta = {
  title: 'Alert',
  component: Alert,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const AlertGallery: Story = {
  args: {
    title: 'Alert gallery',
  },
  render: () => (
    <>
      <Alert {...Success.args} />
      <Alert {...Default.args} />
      <Alert {...Danger.args} />
      <Alert {...Warning.args} />
    </>
  ),
}

export const Success: Story = {
  args: {
    title: 'Success',
    description: 'This is a success alert!',
    type: 'success',
  },
}

export const Default: Story = {
  args: {
    title: 'Default',
    description: 'This is a default alert!',
    type: 'default',
  },
}

export const Danger: Story = {
  args: {
    title: 'Danger',
    description: 'This is a danger alert!',
    type: 'danger',
  },
}

export const Warning: Story = {
  args: {
    title: 'Warning',
    description: 'This is a warning alert!',
    type: 'warning',
  },
}
