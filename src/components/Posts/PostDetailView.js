import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Heading, Content } from 'react-bulma-components'
import Loader from '../Loader/index'
import {POST_FILENAME} from '../../utils/constants'
import _ from 'lodash'




class PostDetailView extends Component {
    state = {
      post: {},
      loading:true
    }
  
    static propTypes = {
      userSession: PropTypes.object.isRequired,
      username: PropTypes.string.isRequired,
      match: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
    }
  
    componentDidMount = async () => {
      const { userSession, match, history, username } = this.props
      const options = { decrypt: false, username }
  
      //const result = await userSession.getFile(`post-${match.params.post_id}.json`, options)
      const result = await userSession.getFile(POST_FILENAME,options)
      
      const resultJSON=JSON.parse(result)
      
      const filteredPost=_.filter(JSON.parse(result), (res) => res.id === match.params.post_id)
      
      const singlePost=JSON.stringify(filteredPost)
      
      console.log("filtered post")
      console.log(filteredPost)
  
      // if (res.title !="null") {
      //   return this.setState({ post:filteredPost,loading:false })
      // }

      if (filteredPost.length >=1){
        return this.setState({ post:filteredPost[0],loading:false })

      }
  
      
      return history.push(`/admin/${username}/posts`)

    }

    
  
    render() {
      const { post } = this.state
      console.log(post)
      const{loading}=this.state
      if(loading){
          return <Loader/>
      }
  
      return (
        
        <Card>
          <Card.Content>
            <Content>
              <Heading renderAs="h1">{post.title}</Heading>
              <Heading renderAs="h3">ID - {post.id}</Heading>
              <p>{post.description}</p>
            </Content>
          </Card.Content>
        </Card>
      )
    }
  }
  
  export default withRouter(PostDetailView)