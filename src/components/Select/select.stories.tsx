import type { Meta, StoryObj } from '@storybook/react'
import Select from '.'

const Option = Select.Option

const meta = {
  title: 'Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '400px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const BasicSelect: Story = {
  args: {
    defaultValue: 'second option',
  },
  render: (args) => (
    <Select {...args}>
      <Option value="first option" />
      <Option value="second option" />
      <Option value="third option" disabled />
      <Option value="fourth option" />
    </Select>
  ),
}

export const MultipleSelect: Story = {
  args: {
    multiple: true,
    placeholder: 'Multiple Select',
    defaultValue: ['first option11111111111111111111111111111111111111111111', 'second option', 'fourth option'],
  },
  render: (args) => (
    <Select {...args}>
      <Option value="first option11111111111111111111111111111111111111111111" />
      <Option value="second option" />
      <Option value="third option" disabled />
      <Option value="fourth option" />
      <Option value="fifth option" />
      <Option value="sixth option" />
    </Select>
  ),
}

export const MaxTagSelect: Story = {
  args: {
    multiple: true,
    placeholder: 'Multiple Select',
    maxTagCount: 2,
    defaultValue: ['first option', 'second option', 'third option', 'fourth option'],
  },
  render: (args) => (
    <Select {...args}>
      <Option value="first option" />
      <Option value="second option" />
      <Option value="third option" />
      <Option value="fourth option" />
      <Option value="fifth option" />
      <Option value="sixth option" />
      <Option value="seventh option" />
      <Option value="eighth option" />
    </Select>
  ),
}
