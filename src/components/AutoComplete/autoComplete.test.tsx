import React from 'react'
import { config } from 'react-transition-group'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'

config.disabled = true
jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})

const testArray = [
  { value: 'item_a', number: 1 },
  { value: 'item_b', number: 2 },
  { value: 'item_c', number: 3 },
  { value: 'item_d', number: 4 },
  { value: 'item_ab', number: 5 },
]

const renderOption = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<{ value: string; number: number }>
  return <>name: {itemWithNumber.value}</>
}

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query))
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
}

const testPropsWithCustomRender: AutoCompleteProps = {
  ...testProps,
  placeholder: 'auto-complete-2',
  renderOption,
}

describe('test AutoComplete component', () => {
  it('test basic behavior', async () => {
    render(<AutoComplete {...testProps} />)
    const inputNode = screen.getByPlaceholderText('auto-complete') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(screen.getByText('item_a')).toBeInTheDocument()
    })
    expect(screen.getAllByTestId('suggestion-item').length).toEqual(2)
    fireEvent.click(screen.getByText('item_ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'item_ab', number: 5 })
    expect(screen.queryByText('item_a')).not.toBeInTheDocument()
    expect(screen.queryByText('item_ab')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('item_ab')
  })

  it('test keyboard support', async () => {
    render(<AutoComplete {...testProps} />)
    const inputNode = screen.getByPlaceholderText('auto-complete') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(screen.getByText('item_ab')).toBeInTheDocument()
    })
    const firstResult = screen.queryByText('item_a')
    const secondResult = screen.queryByText('item_ab')
    fireEvent.keyDown(inputNode, { key: 'ArrowDown' })
    expect(firstResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, { key: 'ArrowDown' })
    expect(secondResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, { key: 'ArrowUp' })
    expect(firstResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, { key: 'Enter' })
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'item_a', number: 1 })
    expect(screen.queryByText('item_a')).not.toBeInTheDocument()
    expect(screen.queryByText('item_ab')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('item_a')
  })

  it('click outside should hide the dropdown', async () => {
    render(<AutoComplete {...testProps} />)
    const inputNode = screen.getByPlaceholderText('auto-complete') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(screen.getByText('item_a')).toBeInTheDocument()
    })
    expect(screen.getByText('item_ab')).toBeInTheDocument()
    fireEvent.click(document)
    expect(screen.queryByText('item_a')).not.toBeInTheDocument()
    expect(screen.queryByText('item_ab')).not.toBeInTheDocument()
  })

  it('renderOption should generate the right template', async () => {
    render(<AutoComplete {...testPropsWithCustomRender} />)
    const inputNode = screen.getByPlaceholderText('auto-complete-2') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(screen.getByText('name: item_a')).toBeInTheDocument()
    })
    expect(screen.getByText('name: item_ab')).toBeInTheDocument()
  })

  it('async fetchSuggestions should works fine', async () => {
    const testPropsWithPromise: AutoCompleteProps = {
      ...testProps,
      fetchSuggestions: jest.fn((query) => {
        return Promise.resolve(testArray.filter((item) => item.value.includes(query)))
      }),
      placeholder: 'auto-complete-3',
    }
    render(<AutoComplete {...testPropsWithPromise} />)
    const inputNode = screen.getByPlaceholderText('auto-complete-3') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(testPropsWithPromise.fetchSuggestions).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(screen.getByText('item_a')).toBeInTheDocument()
    })
    expect(screen.getByText('item_ab')).toBeInTheDocument()
  })
})
