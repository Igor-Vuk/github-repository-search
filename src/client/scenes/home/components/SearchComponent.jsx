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
    /* Regex to match the same style of writing account name on github */
    if (accountName.match(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i)) {
      this.refs.accountName.value = ''
      this.props.onSearch(accountName)
    } else {
      window.alert('Invalid Account name')
    }
  }

  render = (): React.Element<any> => {
    return (
      <div styleName="container" className="container">
        <form onSubmit={this.onFormSubmit}>
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button">Search</button>
            </span>
            <input type="search" ref="accountName" placeholder="Enter account name" className="form-control" />
          </div>
        </form>
      </div>
    )
  }
}

export default SearchComponent
