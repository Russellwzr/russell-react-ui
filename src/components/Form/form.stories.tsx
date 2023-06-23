/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { IFormRef } from './form'
import Form from '.'
import Button from '../Button'
import Input from '../Input'
import Icon from '../Icon'
import { CustomRule } from './useStore'

const Item = Form.Item

const meta = {
  title: 'Form',
  component: Form,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '600px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

const confirmRules: CustomRule[] = [
  { type: 'string', required: true, min: 3, max: 8 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      return new Promise((resolve, reject) => {
        if (value !== getFieldValue('password')) {
          reject('The two passwords that you entered do not match!')
        }
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
  }),
]

export const BasicForm: Story = {
  args: {
    name: 'basic-form',
    initialValues: {
      agreement: true,
    },
    onFinish: (values) => {
      alert(`Submission completed successfully! ${JSON.stringify(values)}`)
    },
    onFinishFailed(values, errors) {
      alert(`Submission Failed! ${JSON.stringify(values)} ${JSON.stringify(errors)}`)
    },
  },
  render: (args) => (
    <Form {...args}>
      <Item label="Email" name="email" rules={[{ type: 'email', required: true }]}>
        <Input />
      </Item>
      <Item label="Password" name="password" rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
        <Input type="password" />
      </Item>
      <div className="agreement-section" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Item
          name="agreement"
          rules={[{ type: 'enum', enum: [true], message: 'Please agree to the agreement' }]}
          getValueFromEvent={(e) => e.target.checked}
          valuePropName="checked"
        >
          <input type="checkbox" />
        </Item>
        <span className="agree-text">
          By registering, you agree to the <a href="#">User Agreement</a>
        </span>
      </div>
      <div className="form-submit-area">
        <Button type="submit" btnType="primary" style={{ width: '80px', lineHeight: 1 }}>
          Submit
        </Button>
      </div>
    </Form>
  ),
}

export const CustomForm = (args: any) => {
  const ref = useRef<IFormRef>()
  return (
    <Form
      initialValues={{ username: 'russell@test.com', agreement: true, password: '', confirmPwd: '' }}
      {...args}
      ref={ref}
    >
      {({ isValid, isSubmitting }) => (
        <>
          <Item label="Email" name="username" rules={[{ type: 'email', required: true }]}>
            <Input />
          </Item>
          <Item label="Password" name="password" rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
            <Input type="password" />
          </Item>
          <Item label="Confirm Password" name="confirmPwd" rules={confirmRules}>
            <Input type="password" />
          </Item>
          <div className="agreement-section" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Item
              name="agreement"
              valuePropName="checked"
              getValueFromEvent={(e) => e.target.checked}
              rules={[{ type: 'enum', enum: [true], message: 'Please agree to the agreement' }]}
            >
              <input type="checkbox" />
            </Item>
            <span className="agree-text">
              By registering, you agree to the <a href="#">User Agreement</a>
            </span>
          </div>
          <div className="form-submit-area" style={{ gap: '20px' }}>
            <Button
              type="button"
              onClick={() => {
                ref.current?.resetFields()
              }}
              style={{ lineHeight: 1, width: '60px' }}
            >
              Reset
            </Button>
            <Button type="submit" btnType="primary" style={{ lineHeight: 1, width: '70px' }}>
              Submit
            </Button>
            <div>{isSubmitting ? <Icon icon="spinner" spin /> : isValid ? 'Pass😄' : 'Fail😭'}</div>
          </div>
        </>
      )}
    </Form>
  )
}
