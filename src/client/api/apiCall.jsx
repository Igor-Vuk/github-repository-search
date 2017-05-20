/* @flow */

import axios from 'axios'
import conf from '../../server/conf/index.js'

const GITHUB_ACCESS_TOKEN: string = conf.GITHUB_ACCESS_TOKEN
const ACCESS_TOKEN: string = process.env.GITHUB_ACCESS_TOKEN || GITHUB_ACCESS_TOKEN

const REQUEST: string = 'https://api.github.com/users/'

var config = {
  headers: {'Authorization': `token ${ACCESS_TOKEN}`}
}

/*
const apiCall = {
  getData: (accountName: string): Object => {
    const encodedAccountName = encodeURIComponent(accountName)
    const requestUrl = `${REQUEST}${encodedAccountName}`

    // return axios.get(requestUrl, config).then((res) => {
    //   return res
    // })
    return async function go() {
      const data = await axios.get(requestUrl, config)
      return data
    }
    go()
  }
}
*/

const apiCall = {
  getData: async function (accountName: string): Object {
    const encodedAccountName = encodeURIComponent(accountName)
    const requestUrl = `${REQUEST}${encodedAccountName}`

    const user = await axios.get(requestUrl, config)
    const repo = await axios.get(user.data.repos_url)

    const data = {
      user: user,
      repo: repo
    }
    return data
  }
}

export default apiCall
