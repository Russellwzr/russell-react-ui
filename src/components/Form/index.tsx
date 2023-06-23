import { FC } from 'react'
import { Form as PrevForm } from './form'
import Item, { FormItemProps } from './formItem'

export type IFormComponent = typeof PrevForm & {
  Item: FC<FormItemProps>
}

const Form: IFormComponent = PrevForm as IFormComponent
Form.Item = Item

export default Form
