import { config } from 'react-transition-group'
import { render, screen, fireEvent } from '@testing-library/react'
import Select, { SelectProps } from './select'
import Option from './option'

config.disabled = true

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})

const testProps: SelectProps = {
  defaultValue: '',
  placeholder: 'test',
  onChange: jest.fn(),
  onVisibleChange: jest.fn(),
}

const multipleProps: SelectProps = {
  ...testProps,
  multiple: true,
}

describe('test Select component', () => {
  it('should render the correct Select component', () => {
    render(
      <Select {...testProps}>
        <Option value="id1" label="first" />
        <Option value="id2" label="second" />
        <Option value="id3" disabled label="disabled" />
      </Select>,
    )
    const inputEle = screen.getByPlaceholderText('test') as HTMLInputElement
    expect(inputEle).toBeInTheDocument()
    // click the input should render options
    fireEvent.click(inputEle)
    const firstItem = screen.getByText('first')
    const disabledItem = screen.getByText('disabled')
    expect(firstItem).toBeInTheDocument()
    expect(testProps.onVisibleChange).toHaveBeenCalledWith(true)
    // click disabled item should not working
    fireEvent.click(disabledItem)
    expect(disabledItem).toBeInTheDocument()
    // click the dropdown should select firstItem and close dropdown
    fireEvent.click(firstItem)
    expect(firstItem).not.toBeInTheDocument()
    expect(testProps.onVisibleChange).toHaveBeenCalledWith(false)
    expect(testProps.onChange).toHaveBeenCalledWith('id1', ['id1'])
    expect(inputEle.value).toEqual('id1')
  })

  it('Select in multiple mode should works fine', () => {
    render(
      <Select {...multipleProps}>
        <Option value="id1" label="first" />
        <Option value="id2" label="second" />
        <Option value="id3" label="third" />
      </Select>,
    )
    const inputEle = screen.getByPlaceholderText('test') as HTMLInputElement
    fireEvent.click(inputEle)
    const firstItem = screen.getByText('first')
    const secondItem = screen.getByText('second')
    // click 1st item
    fireEvent.click(firstItem)
    expect(firstItem).toBeInTheDocument()
    expect(firstItem).toHaveClass('is-selected')
    expect(screen.getByText('check')).toBeInTheDocument()
    expect(multipleProps.onChange).toHaveBeenCalledWith('id1', ['id1'])
    expect(screen.getAllByTestId('tag-items').length).toEqual(1)
    expect(inputEle.placeholder).toEqual('')
    // click 2nd item
    fireEvent.click(secondItem)
    expect(multipleProps.onChange).toHaveBeenLastCalledWith('id2', ['id1', 'id2'])
    expect(screen.getAllByTestId('tag-items').length).toEqual(2)
    //reclick 2nd item to remove it
    fireEvent.click(secondItem)
    expect(secondItem).not.toHaveClass('is-selected')
    expect(screen.getAllByTestId('tag-items').length).toEqual(1)
    expect(multipleProps.onChange).toHaveBeenLastCalledWith('id2', ['id1'])
    // click tag close
    fireEvent.click(screen.getByText('times'))
    expect(multipleProps.onChange).toHaveBeenLastCalledWith('id1', [])
    //remove all tags
    expect(screen.queryByTestId('tag-items')).toBeNull()
    //refill placeholder text
    expect(inputEle.placeholder).toEqual('test')
  })

  it('Max Tag setting in multiple mode should works fine', () => {
    render(
      <Select {...multipleProps} maxTagCount={2}>
        <Option value="id1" label="first" />
        <Option value="id2" label="second" />
        <Option value="id3" label="third" />
        <Option value="id4" label="fourth" />
      </Select>,
    )
    const inputEle = screen.getByPlaceholderText('test') as HTMLInputElement
    fireEvent.click(inputEle)
    const firstItem = screen.getByText('first')
    const secondItem = screen.getByText('second')
    const thirdItem = screen.getByText('third')
    const fourthItem = screen.getByText('fourth')
    fireEvent.click(firstItem)
    fireEvent.click(secondItem)
    fireEvent.click(thirdItem)
    fireEvent.click(fourthItem)
    expect(screen.getAllByTestId('tag-items').length).toEqual(3)
    expect(screen.getByText('+ 2 ...')).toBeInTheDocument()
    fireEvent.click(fourthItem)
    expect(screen.getAllByTestId('tag-items').length).toEqual(3)
    expect(screen.getByText('+ 1 ...')).toBeInTheDocument()
    fireEvent.click(thirdItem)
    expect(screen.getAllByTestId('tag-items').length).toEqual(2)
  })
})
