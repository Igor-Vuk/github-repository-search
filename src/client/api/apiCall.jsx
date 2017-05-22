/* @flow */

import axios from 'axios'
import conf from '../../server/conf/index.js'

const ACCESS_TOKEN: string = conf.GITHUB_ACCESS_TOKEN

const REQUEST: string = 'https://api.github.com/users/'

/* We can not fetch user email without authorisation. We use github Personall access token to do that. Instructions to get Access token are in README.md */
var config = {
  headers: {'Authorization': `token ${ACCESS_TOKEN}`}
}

function filterData (data: Array<Object>): Array<Object> {
  const repoData = []
  data.map((i: any) => {
    i.data.map((k: any) => {
      repoData.push({
        name: k.name,
        url: k.html_url,
        description: k.description,
        id: k.id
      })
    })
  })
  return repoData
}

const apiCall = {
  getData: async function (accountName: string): Promise<Object> {
    const encodedAccountName = encodeURIComponent(accountName)
    const requestUrl = `${REQUEST}${encodedAccountName}`

    let user = ''
    try {
      user = await axios.get(requestUrl, config)
    } catch (error) {
      window.alert('There are no repositories under that Account name. Please try again.')
    }
   /* Maximum number of items that Github API can return per request is 100 so we need to make more requests if total amount of repositories is more than 100 */
    const repo = []
    const pageCount = Math.ceil(user.data.public_repos / 100)
    for (let i = 1; i <= pageCount; i++) {
      const fetchPagePromise = await axios.get(`${user.data.repos_url}?per_page=100&page=${i}`)
      repo.push(fetchPagePromise)
    }

    const arr = await filterData(repo)

    const profile = {
      user: user.data.name,
      profileUrl: user.data.html_url,
      loginName: user.data.login,
      email: user.data.email,
      avatarUrl: user.data.avatar_url,
      repo: arr
    }
    return profile
  }
}

export default apiCall
