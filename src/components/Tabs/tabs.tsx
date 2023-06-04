import React, { FC, useState, FunctionComponentElement, ReactNode } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './tabItem'

export interface TabsProps {
  defaultIndex?: number
  className?: string
  type?: 'line' | 'card'
  onSelect?: (selectedIndex: number) => void
  children?: ReactNode
}

export const Tabs: FC<TabsProps> = (props) => {
  const { defaultIndex, className, type, onSelect, children } = props
  const navClass = classNames('tabs-nav', {
    'nav-line': type === 'line',
    'nav-card': type === 'card',
  })
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const handleClick = (e: React.MouseEvent, index: number, disabled: boolean | undefined) => {
    if (!disabled) {
      setActiveIndex(index)
      if (onSelect) {
        onSelect(index)
      }
    }
  }

  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>
      const { label, disabled } = childElement.props
      const classes = classNames('tabs-nav-item', {
        'is-active': activeIndex === index,
        disabled: disabled,
      })
      return (
        <li
          className={classes}
          key={`nav-item-${index}`}
          onClick={(e) => {
            handleClick(e, index, disabled)
          }}
        >
          {label}
        </li>
      )
    })
  }

  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child
      }
    })
  }

  return (
    <div className={className}>
      <ul className={navClass}>{renderNavLinks()}</ul>
      <div className="tabs-content">{renderContent()}</div>
    </div>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0,
  type: 'line',
}

export default Tabs
