import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type SelectCallback = (selectedIndex: string) => void

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
  defaultIndex?: string
  mode?: MenuMode
  onSelect?: SelectCallback
  defaultOpenSubMenus?: string[]
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

interface IMenuContext {
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

export const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, mode, onSelect, defaultOpenSubMenus, className, style, children } = props
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const handleSelect = (index: string) => {
    setActiveIndex(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContent: IMenuContext = {
    index: activeIndex ? activeIndex : '0',
    onSelect: handleSelect,
    mode,
    defaultOpenSubMenus,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString(),
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContent}>{renderChildren()}</MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export default Menu
