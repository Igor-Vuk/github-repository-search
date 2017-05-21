/* @flow */

import axios from 'axios'
import conf from '../../server/conf/index.js'

const GITHUB_ACCESS_TOKEN: string = conf.GITHUB_ACCESS_TOKEN
const ACCESS_TOKEN: string = process.env.GITHUB_ACCESS_TOKEN || GITHUB_ACCESS_TOKEN

const REQUEST: string = 'https://api.github.com/users/'

var config = {
  headers: {'Authorization': `token ${ACCESS_TOKEN}`}
}

function filterData ({data}: {data: Object}): Array<Object> {
  const repoData = []
  data.map((i: any) => {
    repoData.push({
      name: i.name,
      url: i.html_url,
      description: i.description,
      id: i.id
    })
  })
  return repoData
}

const apiCall = {
  getData: async function (accountName: string): Promise<Object> {
    const encodedAccountName = encodeURIComponent(accountName)
    const requestUrl = `${REQUEST}${encodedAccountName}`

    const user = await axios.get(requestUrl, config)
    const repo = await axios.get(user.data.repos_url, config)
    const arr = await filterData(repo)

    const profile = {
      user: user.data.name,
      profileUrl: user.data.html_url,
      loginName: user.data.login,
      email: user.data.email,
      avatarUrl: user.data.avatar_url,
      repo: arr
    }
    console.log("REPO", repo)
    /*console.log(profile)
    console.log(typeof(profile.arr))*/
    return profile
  }
}

export default apiCall
