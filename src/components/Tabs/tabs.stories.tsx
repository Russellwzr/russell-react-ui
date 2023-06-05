import type { Meta, StoryObj } from '@storybook/react'
import Icon from '../Icon'

import Tabs from '.'

const TabItem = Tabs.Item

const meta = {
  title: 'Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const CardTab: Story = {
  args: {
    defaultIndex: 0,
    type: 'card',
  },
  render: (args) => (
    <>
      <Tabs {...args}>
        <TabItem label="Tab 1">
          <div>
            <h1>This is Tab1!</h1>
            <p>Let's test it~</p>
          </div>
        </TabItem>
        <TabItem label="Tab 2" disabled>
          <div>
            <h1>This is Tab2!</h1>
            <p>Let's test it~</p>
          </div>
        </TabItem>
        <TabItem
          label={
            <div>
              Tab 3
              <Icon icon="coffee" size="lg" theme="primary" />
            </div>
          }
        >
          <div>
            <h1>This is Tab3!</h1>
            <p>Let's test it~</p>
          </div>
        </TabItem>
      </Tabs>
    </>
  ),
}

export const LineTab: Story = {
  args: {
    defaultIndex: 0,
    type: 'line',
  },
  render: (args) => (
    <>
      <Tabs {...args}>
        <TabItem label="Tab 1">
          <div>
            <h1>This is Tab1!</h1>
            <p>Let's test it~</p>
          </div>
        </TabItem>
        <TabItem label="Tab 2" disabled>
          <div>
            <h1>This is Tab2!</h1>
            <p>Let's test it~</p>
          </div>
        </TabItem>
        <TabItem
          label={
            <div>
              Tab 3
              <Icon icon="coffee" size="lg" theme="primary" />
            </div>
          }
        >
          <div>
            <h1>This is Tab3!</h1>
            <p>Let's test it~</p>
          </div>
        </TabItem>
      </Tabs>
    </>
  ),
}
