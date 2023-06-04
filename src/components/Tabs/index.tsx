import React from 'react'
import { Tabs as PreTabs, TabsProps } from './tabs'
import TabItem, { TabItemProps } from './tabItem'

export type ITabsComponent = React.FC<TabsProps> & {
  Item: React.FC<TabItemProps>
}

const Tabs = PreTabs as ITabsComponent
Tabs.Item = TabItem

export default Tabs
