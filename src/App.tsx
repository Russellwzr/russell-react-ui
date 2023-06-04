import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from './components/Button'
import Menu from './components/Menu'
import Icon from './components/Icon'
import Transition from './components/Transition'
import Alert from './components/Alert'
import Tabs from './components/Tabs'

library.add(fas)

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

const TabItem = Tabs.Item

function App() {
  const [show, setShow] = useState(false)
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
        <Menu defaultIndex="0" mode="horizontal" onSelect={(index: string) => alert(index)} defaultOpenSubMenus={[]}>
          <MenuItem>link 1</MenuItem>
          <SubMenu title="link 2">
            <MenuItem>link 2-1</MenuItem>
            <MenuItem>link 2-2</MenuItem>
            <MenuItem>link 2-3</MenuItem>
          </SubMenu>
          <MenuItem disabled>link 3</MenuItem>
          <MenuItem>link 4</MenuItem>
        </Menu>
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
      {/* Test Icon */}
      <div>
        <Icon icon="coffee" size="lg" theme="primary" />
        <Icon icon="arrow-down" size="lg" theme="secondary" />
        <Icon icon="arrow-up" size="lg" theme="success" />
      </div>
      {/* Test Transition */}
      <div>
        <Button size="lg" onClick={() => setShow((prevShow) => !prevShow)}>
          Show
        </Button>
        <Transition in={show} timeout={300} animation="zoom-in-left">
          <div>
            <p>Test Transition</p>
            <p>Test Transition</p>
            <p>Test Transition</p>
            <p>Test Transition</p>
            <p>Test Transition</p>
          </div>
        </Transition>
      </div>
      {/* Test Alert */}
      <div>
        <Alert title="Default" description="This is a default alert!" closable type="default" />
        <Alert title="Warning" description="This is a warning alert!" closable type="warning" />
        <Alert title="Success" description="This is a success alert!" closable type="success" />
        <Alert title="Danger" description="This is a danger alert!" closable type="danger" />
      </div>
      {/* Test Tabs */}
      <div>
        <Tabs defaultIndex={0} type="card" onSelect={(i: number) => console.log(`select ${i}`)}>
          <TabItem label="Tab 1">
            <div>
              <h1>This is Tab1!</h1>
              <p>Let's test it~</p>
            </div>
          </TabItem>
          <TabItem label="Tab 2" disabled>
            <div>
              <h1>This is Tab2!</h1>
              <p>Let's test it~</p>
            </div>
          </TabItem>
          <TabItem
            label={
              <div>
                Tab 3
                <Icon icon="coffee" size="lg" theme="primary" />
              </div>
            }
          >
            <div>
              <h1>This is Tab3!</h1>
              <p>Let's test it~</p>
            </div>
          </TabItem>
        </Tabs>
      </div>
    </div>
  )
}

export default App
