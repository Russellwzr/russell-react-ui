import React, { FC, useState, createContext, useRef, FunctionComponentElement, useEffect, ReactNode } from 'react'
import classNames from 'classnames'
import useClickOutside from '../../hooks/useClickOutside'
import Input from '../Input'
import Icon from '../Icon'
import Transition from '../Transition/transition'
import { SelectOptionProps } from './option'

export interface SelectProps {
  /** Options selected by default */
  defaultValue?: string | string[]
  placeholder?: string
  disabled?: boolean
  /** Support multiple select or not */
  multiple?: boolean
  /** Maximum number of tags to be displayed */
  maxTagCount?: number
  /** The name attribute of the select input	 */
  name?: string
  /** Triggered when the selected value changes */
  onChange?: (selectedValue: string, selectedValues: string[]) => void
  /** Triggered when the dropdown appears/hides */
  onVisibleChange?: (visible: boolean) => void
  children?: ReactNode
}

export interface ISelectContext {
  selectedValues: string[]
  multiple?: boolean
  onSelect?: (value: string, isSelected?: boolean) => void
}

export const SelectContext = createContext<ISelectContext>({ selectedValues: [] })

export const Select: FC<SelectProps> = (props) => {
  const { defaultValue, placeholder, multiple, maxTagCount, name, disabled, onChange, onVisibleChange, children } =
    props

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const tagListRef = useRef<HTMLDivElement>(null)
  const containerWidth = useRef(0)

  const [wrapperHeight, setWrapperHeight] = useState('auto')
  const [menuOpen, setMenuOpen] = useState(false)
  const [value, setValue] = useState(typeof defaultValue === 'string' ? defaultValue : '')
  const [selectedValues, setSelectedValues] = useState<string[]>(Array.isArray(defaultValue) ? defaultValue : [])

  const handleOptionClick = (value: string, isSelected?: boolean) => {
    if (!multiple) {
      setMenuOpen(false)
      setValue(value)
      if (onVisibleChange) {
        onVisibleChange(false)
      }
    } else {
      setValue('')
    }
    let updatedValues = [value]
    // click again to remove selected when is multiple mode
    if (multiple) {
      updatedValues = isSelected ? selectedValues.filter((v) => v !== value) : [...selectedValues, value]
      setSelectedValues(updatedValues)
    }
    if (onChange) {
      onChange(value, updatedValues)
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      if (multiple && selectedValues.length > 0) {
        inputRef.current.placeholder = ''
      } else {
        if (placeholder) inputRef.current.placeholder = placeholder
      }
    }
  }, [multiple, placeholder, selectedValues])

  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current = containerRef.current.getBoundingClientRect().width
    }
  }, [])

  useEffect(() => {
    const tagListHeight = tagListRef.current ? tagListRef.current.offsetHeight : 0
    if (tagListHeight > 0) {
      setWrapperHeight(tagListHeight + 6 + 'px')
    }
  }, [selectedValues])

  useClickOutside(containerRef, () => {
    setMenuOpen(false)
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false)
    }
  })

  const passedContext: ISelectContext = {
    onSelect: handleOptionClick,
    selectedValues: selectedValues,
    multiple: multiple,
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!disabled) {
      setMenuOpen(!menuOpen)
      if (onVisibleChange) {
        onVisibleChange(!menuOpen)
      }
    }
  }

  const generateOptions = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<SelectOptionProps>
      if (childElement.type.displayName === 'Option') {
        return React.cloneElement(childElement, {
          index: `select-${i}`,
        })
      } else {
        console.error('Warning: Select has a child which is not a Option component')
      }
    })
  }

  const containerClass = classNames('select', {
    'menu-is-open': menuOpen,
    'is-disabled': disabled,
    'is-multiple': multiple,
  })

  const renderSelects = multiple && maxTagCount ? Math.min(maxTagCount, selectedValues.length) : selectedValues.length
  const extraSelects = selectedValues.length - renderSelects

  return (
    <div className={containerClass} ref={containerRef}>
      <div onClick={handleClick} style={{ height: wrapperHeight }}>
        <Input
          style={{ height: '100%' }}
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          icon="angle-down"
          disabled={disabled}
          name={name}
          readOnly
        />
      </div>
      <SelectContext.Provider value={passedContext}>
        <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
          <ul className="select-dropdown">{generateOptions()}</ul>
        </Transition>
      </SelectContext.Provider>
      {multiple && (
        <div className="selected-tags" ref={tagListRef} style={{ maxWidth: containerWidth.current - 32 }}>
          {selectedValues.slice(0, renderSelects).map((value, index) => {
            return (
              <div className="tag" key={`tag-${index}`} data-testid="tag-items">
                <span className="tag-text">{value}</span>
                <span className="tag-icon">
                  <Icon
                    icon="times"
                    onClick={() => {
                      handleOptionClick(value, true)
                    }}
                  />
                </span>
              </div>
            )
          })}
          {extraSelects > 0 && (
            <div className="tag" key={`tag-${renderSelects}`} data-testid="tag-items">
              <span className="tag-text">{`+ ${extraSelects} ...`}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

Select.defaultProps = {
  name: 'default-select',
  placeholder: 'Please Select',
}

export default Select
