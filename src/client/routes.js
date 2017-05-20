/* @flow */

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Container from 'Container'
import Home from 'Home'

export default (
  <Route path='/' component={Container} >
    <IndexRoute component={Home} />
  </Route>
)
