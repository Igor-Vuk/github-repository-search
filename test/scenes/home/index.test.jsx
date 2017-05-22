/* @flow */

import React from 'react'
import { shallow } from 'enzyme'
import test from 'tape'
import sinon from 'sinon'
import sinonTest from 'sinon-test'
import Home from 'Home'
sinon.test = sinonTest.configureTest(sinon)

test('Home => should exist', (t: Object) => {
  t.ok(Home)
  t.end()
})

test('Home => should set state when accountName is passed to handleSearch', (t: Object) => {
  t.plan(1)
  const wrapper: Object = shallow(<Home />)
  const instance = wrapper.instance()
  instance.handleSearch('Igor-Vuk')
  t.equal(wrapper.state().accountName, 'Igor-Vuk')
})
