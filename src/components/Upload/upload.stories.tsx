import type { Meta, StoryObj } from '@storybook/react'
import Upload from './upload'
import Button from '../Button'
import Icon from '../Icon'

const meta = {
  title: 'Upload',
  component: Upload,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Upload>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultUpload: Story = {
  args: {
    action: 'http://jsonplaceholder.typicode.com/photos',
    multiple: true,
  },
  render: (args) => (
    <>
      <Upload {...args}>
        <Button size="lg" btnType="primary">
          <Icon icon="upload" /> Upload
        </Button>
      </Upload>
    </>
  ),
}

export const DragUpload: Story = {
  args: {
    action: 'http://jsonplaceholder.typicode.com/photos',
    multiple: true,
    drag: true,
    fileFieldName: 'fileFieldName',
  },
  render: (args) => (
    <>
      <Upload {...args}>
        <br />
        <Icon icon="upload" size="3x" theme="secondary" />
        <br />
        <br />
        <p>Click or Drag to Upload</p>
      </Upload>
    </>
  ),
}

const checkFileSize = (file: File) => {
  if (file.type !== 'image/jpeg') {
    alert('Only Support image/jpeg!')
    return false
  }
  if (Math.round(file.size / 1024) > 10) {
    alert('Please ensure the file size is less than 10KB!')
    return false
  }
  const newFile = new File([file], `uploadImage${Date.now()}.jpg`, {
    type: file.type,
    lastModified: file.lastModified,
  })
  return Promise.resolve(newFile)
}

export const CheckBeforeUpload: Story = {
  args: {
    action: 'http://jsonplaceholder.typicode.com/photos',
    drag: true,
    fileFieldName: 'fileFieldName',
    beforeUpload: checkFileSize,
    accept: 'image/jpeg',
    multiple: true,
  },
  render: (args) => (
    <>
      <Upload {...args}>
        <br />
        <Icon icon="upload" size="3x" theme="secondary" />
        <br />
        <br />
        <p>{`Upload an Image (.jpg and <=10KB)`}</p>
      </Upload>
    </>
  ),
}
