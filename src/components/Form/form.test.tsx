import { render, fireEvent, screen, waitFor } from '@testing-library/react'

import Form, { FormProps } from './form'
import Item from './formItem'
import Input from '../Input'
import Button from '../Button'

const testProps: FormProps = {
  name: 'test-form',
  initialValues: { name: 'test', password: '12345', confirmPwd: '23456' },
  onFinish: jest.fn(),
  onFinishFailed: jest.fn(),
}

const generateForm = (props: FormProps) => {
  return (
    <Form {...testProps}>
      <Item
        label="Name"
        name="name"
        rules={[
          { type: 'string', required: true, message: 'name error' },
          { type: 'string', min: 3, message: 'less than 3' },
        ]}
      >
        <Input />
      </Item>
      <Item
        label="Password"
        name="password"
        rules={[
          { type: 'string', required: true, message: 'password error' },
          { type: 'string', min: 4, message: 'less then 4' },
        ]}
      >
        <Input type="password" />
      </Item>
      <Item
        label="Confirm"
        name="confirmPwd"
        rules={[
          { type: 'string', required: true, message: 'confirm password error' },
          { type: 'string', min: 4, message: 'less then 4' },
          ({ getFieldValue }) => ({
            asyncValidator(rule, value) {
              return new Promise((resolve, reject) => {
                if (value !== getFieldValue('password')) {
                  reject('Do not match!')
                }
                resolve()
              })
            },
          }),
        ]}
      >
        <Input type="password" />
      </Item>
      <Button type="submit" btnType="primary">
        Log in
      </Button>
    </Form>
  )
}

describe('testing Form component', () => {
  it('should render the correct Form component', () => {
    render(generateForm(testProps))
    const nameInput = screen.getByDisplayValue('test')
    const pwdInput = screen.getByDisplayValue('12345')
    const conPwdInput = screen.getByDisplayValue('23456')
    const submitButton = screen.getByText('Log in')
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(pwdInput).toBeInTheDocument()
    expect(conPwdInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('submit form with invliad values should show the error message', async () => {
    render(generateForm(testProps))
    const nameInput = screen.getByDisplayValue('test')
    const pwdInput = screen.getByDisplayValue('12345')
    const submitButton = screen.getByText('Log in')
    fireEvent.change(nameInput, { target: { value: '' } })
    fireEvent.change(pwdInput, { target: { value: '' } })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText('name error')).toBeInTheDocument()
    })
    expect(screen.getByText('password error')).toBeInTheDocument()
    expect(testProps.onFinishFailed).toHaveBeenCalled()
  })

  it('change single input to invalid values should trigger the validate', async () => {
    render(generateForm(testProps))
    const nameInput = screen.getByDisplayValue('test')
    fireEvent.change(nameInput, { target: { value: '' } })
    fireEvent.blur(nameInput)
    await waitFor(() => {
      expect(screen.getByText('name error')).toBeInTheDocument()
    })
    fireEvent.change(nameInput, { target: { value: '12' } })
    fireEvent.blur(nameInput)
    await waitFor(() => {
      expect(screen.getByText('less than 3')).toBeInTheDocument()
    })
  })

  it('custom rules should work', async () => {
    render(generateForm(testProps))
    const conPwdInput = screen.getByDisplayValue('23456')
    const submitButton = screen.getByText('Log in')
    fireEvent.change(conPwdInput, { target: { value: '23456' } })
    fireEvent.blur(conPwdInput)
    await waitFor(() => {
      expect(screen.getByText('Do not match!')).toBeInTheDocument()
    })
    fireEvent.change(conPwdInput, { target: { value: '12345' } })
    fireEvent.blur(conPwdInput)
    await waitFor(() => {
      expect(screen.queryByText('Do not match!')).not.toBeInTheDocument()
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(testProps.onFinish).toHaveBeenCalled()
    })
  })
})
