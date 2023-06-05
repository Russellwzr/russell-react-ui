import type { Meta, StoryObj } from '@storybook/react'

import Menu from '.'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

const meta = {
  title: 'Menu',
  component: Menu,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const HorizontalMenu: Story = {
  args: {
    defaultIndex: '0',
    defaultOpenSubMenus: [],
  },
  render: (args) => (
    <>
      <Menu mode="horizontal" {...args}>
        <MenuItem>link 1</MenuItem>
        <SubMenu title="link 2">
          <MenuItem>link 2-1</MenuItem>
          <MenuItem>link 2-2</MenuItem>
          <MenuItem>link 2-3</MenuItem>
        </SubMenu>
        <MenuItem disabled>link 3</MenuItem>
        <MenuItem>link 4</MenuItem>
      </Menu>
    </>
  ),
}

export const VerticalMenu: Story = {
  args: {
    defaultIndex: '3',
    defaultOpenSubMenus: ['1'],
  },
  render: (args) => (
    <>
      <Menu {...args} mode="vertical">
        <MenuItem>link 1</MenuItem>
        <SubMenu title="link 2">
          <MenuItem>link 2-1</MenuItem>
          <MenuItem>link 2-2</MenuItem>
          <MenuItem>link 2-3</MenuItem>
        </SubMenu>
        <MenuItem disabled>link 3</MenuItem>
        <MenuItem>link 4</MenuItem>
      </Menu>
    </>
  ),
}
