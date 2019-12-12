import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Heading, Content,Button } from 'react-bulma-components'
import Loader from '../Loader/index'
import {POST_FILENAME,POST_ICONFILE} from '../../utils/constants'
import _ from 'lodash'
import {MyContext} from '../User/UserProvider'




class PostDetailView extends Component {
    state = {
      post: {},
      loading:true,
      icon:false,
      keyStore:''
    }
  
    static propTypes = {
      userSession: PropTypes.object.isRequired,
      username: PropTypes.string.isRequired,
      match: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
    }
  
    componentDidMount = async () => {
      const { userSession, match, history, username,loadType } = this.props
      const options = { decrypt: false, username }
      
      //const result = await userSession.getFile(`post-${match.params.post_id}.json`, options)
      if (loadType==="icon"){
        var result =await userSession.getFile(POST_ICONFILE,options)
        this.setState({icon:true})
        
        
        
        
      } else
      {var result = await userSession.getFile(POST_FILENAME,options)}
      
     
     
      
      const filteredPost=_.filter(JSON.parse(result), (res) => res.id === match.params.post_id)
      
      
      
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

    onKeystore = async ()=>{
      const {userSession,match}=this.props
      const options = { decrypt: false}
      
      const keyStores=await userSession.getFile(`ICON-${match.params.post_id}.txt`,options)
      console.log("Keystore:",keyStores)
      var a = document.createElement('a');
      var blob = new Blob([keyStores], {'type':'text/plain'});
      a.href = window.URL.createObjectURL(blob);
      a.download = "keystore.txt";
      a.click();
    }

    
  
     render() {
      const { post,icon } = this.state
      const{loading}=this.state
      if(loading){
          return <Loader/>
      }
      if (icon){
              
      return(  <Card>
          <Card.Content>
            <Content>
              <Heading renderAs="h3">ID - {post.id}</Heading>
              <Heading renderAs="h1">Wallet-name: {post.title}</Heading>
              <Heading renderAs="h2">Private Key: {post.privateKey}</Heading>
              <Heading renderAs="h1">Password:{post.password}</Heading>
              <p>{post.description}</p>
            </Content>
            <Content>
            <Button onClick={this.onKeystore}>
              Download keystore
            </Button>
            
            </Content>
          </Card.Content>
        </Card>
      )
      }
      
      return (
        
        <Card>
          <Card.Content>
            <Content>
              <Heading renderAs="h3">ID - {post.id}</Heading>
              <Heading renderAs="h1">{post.title}</Heading>
              
              <p>{post.description}</p>
            </Content>
          </Card.Content>
        </Card>
      )
    }
  }
  
  PostDetailView.contextType=MyContext
  export default withRouter(PostDetailView)