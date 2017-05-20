/* @flow */

import React, {Component} from 'react'
import SearchComponent from 'SearchComponent'
import DisplayComponent from 'DisplayComponent'

type StateType = {
  accountName?: string
}

class Home extends Component {
  state: StateType = {
    accountName: undefined
  }

  handleSearch = (accountName: string) => {
    this.setState({
      accountName: accountName
    })
  }

  render (): React.Element<any> {
    const {accountName} = this.state

    const renderDisplay = (): ?React.Element<any> => {
      if (accountName) {
        return <DisplayComponent accountName={accountName} />
      }
    }

    return (
      <div>
        <SearchComponent onSearch={this.handleSearch} />
        {renderDisplay()}
      </div>
    )
  }
}

export default Home
