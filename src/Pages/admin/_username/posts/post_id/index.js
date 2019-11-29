import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MyContext } from '../../../../../components/User/UserProvider'
import PostDetailView from '../../../../../components/Posts/PostDetailView'

class AdminPostView extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match } = this.props
    const { userSession, username } = this.context.state.currentUser
    console.log(match)
    return (
      <div className="admin-post-view">
        <PostDetailView match={match} userSession={userSession} username={username} />
      </div>
    )
  }
}

export default AdminPostView
AdminPostView.contextType = MyContext