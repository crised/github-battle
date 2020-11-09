import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Instructions from './components/Battle'

class App extends React.Component {
  render() {
    return (
      <div className='container'>
      <Instructions/>
      <Popular/>
      </div>
    )
  }
} // JSX gets translated into JS React.createElement

ReactDOM.render(
  <App />,
  document.getElementById('app')
)