/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react'
import { config } from 'react-transition-group'
import { render, fireEvent, screen } from '@testing-library/react'

import Alert, { AlertProps } from './alert'
config.disabled = true

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span>{props.icon}</span>
  }
})

const testProps: AlertProps = {
  title: 'test-title',
  onClose: jest.fn(),
}

const typeProps: AlertProps = {
  ...testProps,
  type: 'success',
  description: 'hello',
  closable: false,
}

describe('test Alert Component', () => {
  it('should render the correct default Alert', () => {
    const { container } = render(<Alert {...testProps} />)
    /* Use `getBy*` queries rather than `queryBy*` for checking element is present */
    expect(screen.getByText('test-title')).toBeInTheDocument()
    expect(container.querySelector('.alert')).toHaveClass('alert-type-default')
    fireEvent.click(screen.getByText('times'))
    expect(testProps.onClose).toHaveBeenCalled()
    /* Use `queryBy*` queries rather than `getBy*` for checking element is NOT present */
    expect(screen.queryByText('test-title')).not.toBeInTheDocument()
  })
  it('should render the correct Alert based on different type and description', () => {
    const { container } = render(<Alert {...typeProps} />)
    expect(screen.getByText('test-title')).toHaveClass('bold-title')
    expect(container.querySelector('.alert')).toHaveClass('alert-type-success')
    expect(screen.getByText('hello')).toBeInTheDocument()
    expect(screen.queryByText('times')).not.toBeInTheDocument()
  })
})
