import React from 'react'
import { Button } from './components/Button'

function App() {
  return (
    <div>
      <header>
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
      </header>
    </div>
  )
}

export default App
