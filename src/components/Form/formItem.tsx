import React, { FC, ReactNode, useContext, useEffect } from 'react'
import classNames from 'classnames'
import { FormContext } from './form'
import { CustomRule } from './useStore'

/**
 * After type assertion, optional can become required,
 * which can eliminate some logic of checking whether it is undefined,
 * making it easier to retrieve values.
 */
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>
export interface FormItemProps {
  /** Field name */
  name: string
  /** Label content */
  label?: string
  /** Attribute of the value of the child node, e.g. 'type=checkbox' is 'checked' */
  valuePropName?: string
  /** Set how to trigger value changes, e.g. onChange */
  trigger?: string
  /** Set how to get field value from event, e.g. e.target.value */
  getValueFromEvent?: (event: any) => any
  /** Validation rules (see async-validator for more details) */
  rules?: CustomRule[]
  /** Set the timing of field validation */
  validateTrigger?: string
  children?: ReactNode
}

export const FormItem: FC<FormItemProps> = (props) => {
  const { name, label, valuePropName, trigger, getValueFromEvent, rules, validateTrigger, children } =
    props as SomeRequired<FormItemProps, 'getValueFromEvent' | 'trigger' | 'valuePropName' | 'validateTrigger'>
  const { dispatch, fields, initialValues, validateField } = useContext(FormContext)

  /** Initialize the form content */
  useEffect(() => {
    const value = (initialValues && initialValues[name]) || ''
    dispatch({ type: 'addField', name, value: { label, name, value, rules: rules || [], errors: [], isValid: true } })
  }, [])

  const fieldState = fields[name]
  const value = fieldState && fieldState.value
  const errors = fieldState && fieldState.errors
  const isRequired = rules?.some((rule) => typeof rule !== 'function' && rule.required)
  const hasError = errors && errors.length > 0
  const rowClass = classNames('row', {
    'row-no-label': !label,
  })
  const labelClass = classNames({
    'form-item-required': isRequired,
  })
  const itemClass = classNames('form-item-control', {
    'form-item-has-error': hasError,
  })

  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e)
    dispatch({ type: 'updateValue', name, value })
  }

  const onValueValidate = async () => {
    await validateField(name)
  }

  /** Add the custom attributes to FormItem */
  const controlProps: Record<string, any> = {}
  controlProps[valuePropName] = value
  controlProps[trigger] = onValueUpdate
  if (rules) {
    controlProps[validateTrigger] = onValueValidate
  }
  const childList = React.Children.toArray(children)
  if (childList.length === 0) {
    throw new Error('No child element found in Form.Item, please provide one form component')
  }
  if (childList.length > 1) {
    console.warn('Only support one child element in Form.Item, others will be omitted')
  }
  if (!React.isValidElement(childList[0])) {
    throw new Error('Child component is not a valid React Element')
  }
  const child = childList[0] as React.ReactElement
  const customChildNode = React.cloneElement(child, { ...child.props, ...controlProps })

  return (
    <div className={rowClass}>
      {label && (
        <div className="form-item-label">
          <label title={label} className={labelClass}>
            {label}
          </label>
        </div>
      )}
      <div className="form-item">
        <div className={itemClass}>{customChildNode}</div>
        {hasError && (
          <div className="form-item-explain">
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  )
}

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  validateTrigger: 'onBlur',
  getValueFromEvent: (e) => e.target.value,
}

export default FormItem
