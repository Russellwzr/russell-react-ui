import React from 'react'
import { Menu as PreMenu, MenuProps } from './menu'
import SubMenu, { SubMenuProps } from './subMenu'
import MenuItem, { MenuItemProps } from './menuItem'

export type IMenuComponent = React.FC<MenuProps> & {
  Item: React.FC<MenuItemProps>
  SubMenu: React.FC<SubMenuProps>
}

const Menu = PreMenu as IMenuComponent
Menu.Item = MenuItem
Menu.SubMenu = SubMenu

export default Menu
