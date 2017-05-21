/* @flow */

import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

import 'bootstrap/scss/bootstrap.scss'
import routes from './routes'

render(
  <Router history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('app')
)
