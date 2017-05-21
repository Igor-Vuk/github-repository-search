/* @flow */
/* eslint "jsx-quotes": ["error", "prefer-double"] */   // eslint rule to prefer doublequotes inside html tags

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import apiCall from 'apiCall'
import './displayComponent.local.scss'

type DataType = {
  user: string,
  profileUrl: string,
  loginName: string,
  email: string,
  avatarUrl: string,
  repo: {
    name: string,
    description: string,
    url: string,
    id: number
  }
}

class DisplayComponent extends Component {
  state = {}

  static propTypes = {
    accountName: PropTypes.string
  }

  componentDidUpdate = (prevProps: any) => {
    if (this.props.accountName !== prevProps.accountName) {
      apiCall.getData(this.props.accountName).then((data: DataType) => {
        /*console.log(typeof(data.repo))
        console.log(data.repo)*/
        this.setState({
          user: data.user,
          profileUrl: data.profileUrl,
          loginName: data.loginName,
          email: data.email,
          avatarUrl: data.avatarUrl,
          repo: data.repo
        })
      })
    }
  }

  render = (): React.Element<any> => {
    const {user, profileUrl, loginName, email, avatarUrl, repo} = this.state

    const renderProfile = (): ?React.Element<any> => {
      if (this.state.user) {
        return (
          <div styleName="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="card">
                  <img src={avatarUrl} alt="profile picture" className="card-img-top" />
                  <div className="card-block">
                    <h4 className="card-title">{user}</h4>
                    <p className="card-text">{loginName}</p>
                    <p className="card-text">{email}</p>
                    <a href={profileUrl} target="_blank" className="btn btn-primary">Go to user profile</a>
                  </div>
                </div>
              </div>
            </div>
            {/* $FlowFixMe */}
            {repo.map(repo => {
              return (
                <div className="card" key={repo.id}>
                  <div className="card-block">
                    <h4 className="card-title">{repo.name}</h4>
                    <p className="card-text">{repo.description}</p>
                    <a href={repo.url} target="_blank" className="card-link">Open repository</a>
                  </div>
                </div>
              )
            })}

          </div>
        )
      }
    }
    return (
      <div>
        {renderProfile()}
      </div>
    )
  }
}

export default DisplayComponent
