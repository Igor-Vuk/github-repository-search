/* @flow */
/* eslint "jsx-quotes": ["error", "prefer-double"] */   // eslint rule to prefer doublequotes inside html tags

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './searchComponent.local.scss'

class SearchComponent extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired
  }

  onFormSubmit = (e: Object) => {
    e.preventDefault()
    const accountName: string = this.refs.accountName.value
    if (accountName.match(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i)) {
      this.refs.accountName.value = ''
      this.props.onSearch(accountName)
    }
  }

  render (): React.Element<any> {
    return (
      <div styleName="container" className="container">
        <form onSubmit={this.onFormSubmit}>
          <input type="search" ref="accountName" placeholder="Enter Github account name" />
          <button>Search</button>
        </form>
      </div>
    )
  }
}

export default SearchComponent
