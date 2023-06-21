import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import { Input, InputProps } from './input'

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'default-input',
}

describe('test Input component', () => {
  it('should render the correct default Input', () => {
    render(<Input {...defaultProps} />)
    const testNode = screen.getByPlaceholderText('default-input') as HTMLInputElement
    expect(testNode).toBeInTheDocument()
    expect(testNode).toHaveClass('input-inner')
    fireEvent.change(testNode, { target: { value: 'change-input' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(testNode.value).toEqual('change-input')
  })
  it('should render the disabled Input on disabled property', () => {
    render(<Input disabled placeholder="disabled" />)
    const testNode = screen.getByPlaceholderText('disabled') as HTMLInputElement
    expect(testNode.disabled).toBeTruthy()
  })
  it('should render different input sizes on size property', () => {
    render(<Input placeholder="sizes" size="lg" />)
    const testContainer = screen.getByTestId('input-wrapper')
    expect(testContainer).toHaveClass('input-size-lg')
  })
  it('should render prepand and append element on prepand/append property', () => {
    render(<Input placeholder="pend" prepend="https://" append=".com" />)
    const testContainer = screen.getByTestId('input-wrapper')
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend')
    expect(screen.getByText('https://')).toBeInTheDocument()
    expect(screen.getByText('.com')).toBeInTheDocument()
  })
})
