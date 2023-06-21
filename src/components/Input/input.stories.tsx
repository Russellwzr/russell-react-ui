import type { Meta, StoryObj } from '@storybook/react'

import Input from './input'

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '600px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultInput: Story = {
  args: {
    placeholder: 'default input',
  },
}

export const LargeInput: Story = {
  args: {
    placeholder: 'large input',
    size: 'lg',
  },
}

export const SmallInput: Story = {
  args: {
    placeholder: 'small input',
    size: 'sm',
  },
}

export const DisabledInput: Story = {
  args: {
    placeholder: 'disable input',
    disabled: true,
  },
}

export const PrependInput: Story = {
  args: {
    placeholder: 'prepend input',
    prepend: 'https://',
  },
}

export const AppendInput: Story = {
  args: {
    placeholder: 'append input',
    append: '.com',
  },
}

export const IconInput: Story = {
  args: {
    placeholder: 'icon input',
    icon: 'search',
  },
}
