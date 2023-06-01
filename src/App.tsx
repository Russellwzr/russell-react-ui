import React from 'react'
import Button from './components/Button'
import Menu from './components/Menu'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

function App() {
  return (
    <div>
      <br />
      {/* Button Test */}
      <div>
        <Button className="custom">Hello</Button>
        <Button disabled>Hello</Button>
        <Button btnType="primary" size="lg">
          Hello
        </Button>
        <Button btnType="danger" size="sm">
          Hello
        </Button>
        <Button btnType="link" size="lg">
          Hello
        </Button>
        <Button btnType="default" size="lg" disabled>
          Hello
        </Button>
      </div>
      <br />
      {/* Menu Test */}
      <div>
        {/*         <Menu defaultIndex="0" mode="horizontal" onSelect={(index: string) => alert(index)} defaultOpenSubMenus={[]}>
          <MenuItem>link 1</MenuItem>
          <SubMenu title="link 2">
            <MenuItem>link 2-1</MenuItem>
            <MenuItem>link 2-2</MenuItem>
            <MenuItem>link 2-3</MenuItem>
          </SubMenu>
          <MenuItem disabled>link 3</MenuItem>
          <MenuItem>link 4</MenuItem>
        </Menu> */}
        <Menu defaultIndex="3" mode="vertical" onSelect={(index: string) => alert(index)} defaultOpenSubMenus={['1']}>
          <MenuItem>link 1</MenuItem>
          <SubMenu title="link 2">
            <MenuItem>link 2-1</MenuItem>
            <MenuItem>link 2-2</MenuItem>
            <MenuItem>link 2-3</MenuItem>
          </SubMenu>
          <MenuItem disabled>link 3</MenuItem>
          <MenuItem>link 4</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default App
