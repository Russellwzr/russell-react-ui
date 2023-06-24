import React, { FC, useContext, ReactNode } from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import { SelectContext } from './select'

export interface SelectOptionProps {
  /** Filter based on this attribute value, which cannot be the same */
  value: string
  /** Option label，if not set, the default is the same as `value` */
  label?: string
  index?: string
  disabled?: boolean
  children?: ReactNode
}

export const Option: FC<SelectOptionProps> = ({ index, value, label, disabled, children }) => {
  const { onSelect, selectedValues, multiple } = useContext(SelectContext)
  const isSelected = selectedValues.includes(value)
  const classes = classNames('select-item', {
    'is-disabled': disabled,
    'is-selected': isSelected,
  })

  const handleClick = (e: React.MouseEvent, value: string, isSelected: boolean) => {
    e.preventDefault()
    if (onSelect && !disabled) {
      onSelect(value, isSelected)
    }
  }

  return (
    <li
      key={index}
      className={classes}
      onClick={(e) => {
        handleClick(e, value, isSelected)
      }}
    >
      {children || (label ? label : value)}
      {multiple && isSelected && <Icon icon="check" />}
    </li>
  )
}

Option.displayName = 'Option'

export default Option
