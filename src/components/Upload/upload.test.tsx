import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { Upload, UploadProps } from './upload'

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
}

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

describe('test upload component', () => {
  it('upload process should works fine', async () => {
    render(<Upload {...testProps}>Click to upload</Upload>)
    const fileInput = screen.getByTestId('file-input')
    const uploadArea = screen.queryByText('Click to upload') as HTMLElement
    // set mock response to { data: 'test' }
    mockedAxios.post.mockResolvedValue({ data: 'test' })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    // status uploading......
    expect(screen.getByText('spinner')).toBeInTheDocument()
    expect(screen.getByText('test.png')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('check-circle')).toBeInTheDocument()
    })
    // test onSuccess
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'test',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'test',
        name: 'test.png',
      }),
    )
    // test onChange
    expect(testProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'test',
        name: 'test.png',
      }),
    )
    // remove the uploaded file
    expect(screen.getByText('times')).toBeInTheDocument()
    fireEvent.click(screen.getByText('times'))
    expect(screen.queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png',
      }),
    )
  })

  it('drag and drop files should works fine', async () => {
    render(<Upload {...testProps}>Click to upload</Upload>)
    const uploadArea = screen.queryByText('Click to upload') as HTMLElement
    mockedAxios.post.mockResolvedValue({ data: 'test' })
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [testFile],
      },
    })
    await waitFor(() => {
      expect(screen.getByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'test',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'test',
        name: 'test.png',
      }),
    )
  })
})
