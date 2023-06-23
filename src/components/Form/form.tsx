import React, { ReactNode, createContext, forwardRef, useImperativeHandle } from 'react'
import { ValidateError } from 'async-validator'
import useStore, { FormState } from './useStore'

/** Custom Rendering */
export type RenderProps = (form: FormState) => ReactNode
export interface FormProps {
  /** Prefix of the form field */
  name?: string
  /** Default values for initialization and reset */
  initialValues?: Record<string, any>
  /** Callback function after the form is submitted and the data validation is successful */
  onFinish?: (values: Record<string, any>) => void
  /** Callback function after the form is submitted and the data validation fails */
  onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void
  children?: ReactNode | RenderProps
}

/** Instance methods of Form component */
export type IFormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'form'>

export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> &
  Pick<FormProps, 'initialValues'>
export const FormContext = createContext<IFormContext>({} as IFormContext)

/**
 * Form component with data collection, verification and submission functions
 * and supports custom form elements, see FormItem for details.
 */
export const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
  const { name, initialValues, onFinish, onFinishFailed, children } = props
  const { form, fields, dispatch, ...restProps } = useStore(initialValues)
  const { validateField, validateAllFields } = restProps
  const passedContext: IFormContext = {
    dispatch,
    fields,
    validateField,
    initialValues,
  }
  // forwardRef + useImperativeHandle to expose instance methods
  useImperativeHandle(ref, () => {
    return {
      ...restProps,
    }
  })

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { isValid, errors, values } = await validateAllFields()
    if (isValid && onFinish) {
      onFinish(values)
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(values, errors)
    }
  }

  let childrenNode: ReactNode
  if (typeof children === 'function') {
    childrenNode = children(form)
  } else {
    childrenNode = children
  }

  return (
    <form name={name} className="form" onSubmit={submitForm}>
      <FormContext.Provider value={passedContext}>{childrenNode}</FormContext.Provider>
    </form>
  )
})

Form.defaultProps = {
  name: 'default-form',
}

export default Form
