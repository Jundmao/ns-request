import React from 'react'
import ReactDOM from 'react-dom'

import { get } from './lib'

class App extends React.Component {
  state = {
    res: ''
  }
  componentDidMount() {
    this.getTest()
  }

  getTest() {
    get('/static/mock.json', { key: 'ga' }).then(res => {
      console.log('getTest', ': ', res)
      this.setState({
        res
      })
    })
  }

  render() {
    const { res } = this.state
    return (
      <div>接口返回Data： {res && JSON.stringify(res)}</div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
