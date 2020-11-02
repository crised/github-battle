import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


class App extends React.Component {
  render() {
    return (
      <div>
        Hello world
      </div>
    )
  }
} // JSX gets translated into JS React.createElement

ReactDOM.render(
  <App />,
  document.getElementById('app')
)