import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Table, Button } from 'react-bulma-components'
import { withRouter } from 'react-router-dom'

class PostsTable extends Component{
    static propTypes = {
        deletePost:PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired,
        history:PropTypes.object.isRequired
        
      }
      editAdminPost (post) {
        const {history,username}=this.props 

        return history.push(`/admin/${username}/posts/${post.id}/edit`)

      }

      deletePost (post){
        this.props.deletePost(post.id)

      }

      viewAdminPosts = (post) =>{
          const {history,username}=this.props 

          return history.push(`/admin/${username}/posts/${post.id}`)

      }
      // getFilesList = () => {
      //   this.props.getFilesList()

      // }

      displayAdminOptions(post) {
    return (
      <React.Fragment>
        <Button
          className="mr-one"
          color="warning"
          onClick={() => this.editAdminPost(post)}
        >
          Edit
        </Button>
        <Button
          className="mr-one"
          color="info"
          onClick={() => this.viewAdminPosts(post)}
        >
          View
        </Button>

        <Button
          color="danger"
          onClick={() => {this.deletePost(post)}}
        >
          Delete
        </Button>
      </React.Fragment>
    )
  }

      render() {
        const { posts } = this.props
    
        return (
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Platform</th>
                <th>Menu</th>
                
              </tr>
            </thead>
            <tbody>
              {
                _.map(posts, (post) => {
                  return (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{this.displayAdminOptions(post)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          
        )
      }
}

export default withRouter(PostsTable)