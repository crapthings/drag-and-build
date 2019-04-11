import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { render } from 'react-dom'

import Boot from './d3'

Meteor.startup(init)

class App extends Component {
  componentDidMount() {
    const container = document.getElementById('container')
    const boot = new Boot(container)
  }

  render() {
    return (
      <div id='container'></div>
    )
  }
}

function init() {
  const app = document.createElement('div')
  app.id = 'app'
  document.body.appendChild(app)
  render(<App />, app)
}
