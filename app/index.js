import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'

class App extends React.Component {
  render() {
    return (
      <div>
      <Popular/>
      </div>
    )
  }
} // JSX gets translated into JS React.createElement

ReactDOM.render(
  <App />,
  document.getElementById('app')
)