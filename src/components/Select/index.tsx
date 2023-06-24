import { FC } from 'react'
import { Select as PrevSelect, SelectProps } from './select'
import Option, { SelectOptionProps } from './option'

export type ISelectComponent = FC<SelectProps> & {
  Option: FC<SelectOptionProps>
}

const Select = PrevSelect as ISelectComponent
Select.Option = Option

export default Select
