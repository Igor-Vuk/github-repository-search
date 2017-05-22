import React from 'react'
import { mount } from 'enzyme'
import test from 'tape'
import sinon from 'sinon'
import sinonTest from 'sinon-test'
import SearchComponent from 'SearchComponent'
sinon.test = sinonTest.configureTest(sinon)

test('SearchComponent => should exist', (t: Object) => {
  t.ok(SearchComponent)
  t.end()
})

test('SearchComponent => should call onSearch if valid accountName entered', sinon.test(function (t: Object) {
  t.plan(1)
  const spy = this.spy()
  this.stub(window, 'alert')
  const wrapper: Object = mount(<SearchComponent onSearch={spy} />)
  wrapper.ref('accountName').node.value = 'Igor-Vuk'
  wrapper.find('form').simulate('submit')
  t.equal(spy.args[0][0], 'Igor-Vuk')
  wrapper.unmount()
}))

test('SearchComponent => should not call onSearch if invalid accountName entered', sinon.test(function (t: Object) {
  t.plan(1)
  const spy = this.spy()
  this.stub(window, 'alert')
  const wrapper: Object = mount(<SearchComponent onSearch={spy} />)
  wrapper.ref('accountName').node.value = '-Igor-Vuk'
  wrapper.find('form').simulate('submit')
  t.equal(spy.called, false)
  wrapper.unmount()
}))
