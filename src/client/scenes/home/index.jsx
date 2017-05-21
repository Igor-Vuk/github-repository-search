/* @flow */

import React, {Component} from 'react'
import SearchComponent from 'SearchComponent'
import DisplayComponent from 'DisplayComponent'

type StateType = {
  accountName?: string
}

class Home extends Component {
  state: StateType = {
    accountName: 'undefined'
  }

  handleSearch = (accountName: string) => {
    this.setState({
      accountName: accountName
    })
  }

  render = (): React.Element<any> => {
    const {accountName} = this.state
    return (
      <div>
        <SearchComponent onSearch={this.handleSearch} />
        <DisplayComponent accountName={accountName} />
      </div>
    )
  }
}

export default Home
