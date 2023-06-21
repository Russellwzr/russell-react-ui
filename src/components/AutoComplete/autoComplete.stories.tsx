import type { Meta, StoryObj } from '@storybook/react'
import AutoComplete, { DataSourceType } from './autoComplete'

const meta = {
  title: 'AutoComplete',
  component: AutoComplete,
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
} satisfies Meta<typeof AutoComplete>

export default meta
type Story = StoryObj<typeof meta>

const defaultSearchArray = [
  'Kobe Bryant',
  'Pau Gasol',
  'Lamar Odom',
  'Andrew Bynum',
  'Ron Artest',
  'Derek Fisher',
  'Luke Walton',
  'Sasha Vujacic',
  'Shannon Brown',
  'Jordan Farmar',
  'Josh Powell',
  'Adam Morrison',
  'D.J. Mbenga',
]

const defaultHandleFetch = (query: string) => {
  return defaultSearchArray.filter((name) => name.includes(query)).map((name) => ({ value: name }))
}

export const DefaultAutoComplete: Story = {
  args: {
    fetchSuggestions: defaultHandleFetch,
    placeholder: 'default auto complete',
  },
  render: (args) => <AutoComplete {...args} />,
}

interface CustomItemProps {
  value: string
  number: number
}

const customSearchArray = [
  { value: 'Kobe Bryant', number: 24 },
  { value: 'Pau Gasol', number: 16 },
  { value: 'Lamar Odom', number: 7 },
  { value: 'Andrew Bynum', number: 17 },
  { value: 'Ron Artest', number: 37 },
  { value: 'Derek Fisher', number: 2 },
  { value: 'Luke Walton', number: 4 },
  { value: 'Sasha Vujacic', number: 18 },
  { value: 'Shannon Brown', number: 12 },
  { value: 'Jordan Farmar', number: 1 },
  { value: 'Josh Powell', number: 21 },
  { value: 'Adam Morrison', number: 6 },
  { value: 'D.J. Mbenga', number: 28 },
]

const customHandleFetch = (query: string) => {
  return customSearchArray.filter((item) => item.value.includes(query))
}

const customRenderOption = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<CustomItemProps>
  return (
    <div>
      <b>Name: {itemWithNumber.value}</b>
      <div>No. {itemWithNumber.number}</div>
    </div>
  )
}

export const CustomAutoComplete: Story = {
  args: {
    fetchSuggestions: customHandleFetch,
    renderOption: customRenderOption,
    placeholder: 'custom auto complete',
  },
  render: (args) => <AutoComplete {...args} />,
}

interface AsyncItemProps {
  login: string
  url: string
  avatar_url: string
}

const asyncHandleFetch = async (query: string) => {
  const res = await fetch(`https://api.github.com/search/users?q=${query}`)
  const { items } = await res.json()
  return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
}

const asyncRenderOption = (item: DataSourceType) => {
  const itemWithGithub = item as DataSourceType<AsyncItemProps>
  return (
    <div>
      <b>Name: {itemWithGithub.value}</b>
      <div>url: {itemWithGithub.url}</div>
    </div>
  )
}

export const AsyncAutoComplete: Story = {
  args: {
    fetchSuggestions: asyncHandleFetch,
    renderOption: asyncRenderOption,
    placeholder: 'async auto complete',
  },
  render: (args) => <AutoComplete {...args} />,
}
