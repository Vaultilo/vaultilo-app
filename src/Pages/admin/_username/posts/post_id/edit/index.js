import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostForm from '../../../../../../components/Posts/PostForm'
import Loader from '../../../../../../components/Loader'
import { MyContext } from '../../../../../../components/User/UserProvider'
import {POST_FILENAME} from '../../../../../../utils/constants'
import _ from 'lodash'
class AdminPostEdit extends Component {
  state = {
    post: {},
    loading: true
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount = async () => {
    const { userSession } = this.context.state.currentUser
    const { match } = this.props
    console.log(match)

    const options = { decrypt: false }

    //const result = await userSession.getFile(`post-${match.params.post_id}.json`, options)
    const result=await userSession.getFile(POST_FILENAME, options)

    if (result) {
      const resultJSON=JSON.parse(result)
      const filteredPosts = _.filter(resultJSON, (res) => res.id == match.params.post_id)
    
      if(filteredPosts.length >=1){
        return this.setState({ post: filteredPosts[0], loading: false })
      }
      
    }

    return null
  }

  render() {
    const { loading, post } = this.state
    const { userSession, username } = this.context.state.currentUser

    if (loading) {
      return <Loader />
    }

    return (
      <PostForm
        userSession={userSession}
        username={username}
        post={post}
        type="edit"
      />
    )
  }
}

export default AdminPostEdit
AdminPostEdit.contextType = MyContext

