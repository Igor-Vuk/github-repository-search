/* @flow */
/* eslint "jsx-quotes": ["error", "prefer-double"] */   // eslint rule to prefer doublequotes inside html tags

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import apiCall from 'apiCall'
import './displayComponent.local.scss'

class DisplayComponent extends Component {
  static propTypes = {
    accountName: PropTypes.string.isRequired
  }

  componentWillMount = () => {
    apiCall.getData(this.props.accountName).then((data) => {
      console.log(data)
    })
  }

  render (): React.Element<any> {
    return (
      <div styleName="container" className="container">
        <h1>DisplayComponent</h1>
      </div>
    )
  }
}

export default DisplayComponent
