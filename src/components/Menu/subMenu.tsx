import React, { useState, useContext, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
  children?: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props
  const context = useContext(MenuContext)

  const openedSubMenus = context.defaultOpenSubMenus as Array<String>
  const isOpend = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false
  const [menuOpen, setMenuOpen] = useState(isOpend)

  let isActive = context.index === index
  if (context.index && index && context.index.length > index.length && context.index[0] === index[0]) {
    isActive = true
  }
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': isActive,
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen((prevMenuOpen) => !prevMenuOpen)
  }

  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300)
  }
  const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {}
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          },
        }
      : {}

  const renderChildren = () => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}-${i}` })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem componet')
      }
    })
    return <ul className={subMenuClasses}>{childrenComponent}</ul>
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
