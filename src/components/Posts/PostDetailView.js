import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Heading, Content,Button,Input} from 'react-bulma-components'
import Loader from '../Loader/index'
import {POST_FILENAME,POST_ICONFILE} from '../../utils/constants'
import _ from 'lodash'
import {MyContext} from '../User/UserProvider'
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css'





class PostDetailView extends Component {
    state = {
      post: {},
      loading:true,
      icon:false,
      keyStore:'',
      pwShow:false,
      privShow:false
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
  
      
      return history.textpush(`/admin/${username}/posts`)

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

    textCopy  (text){
     navigator.clipboard.writeText(text)
     this.toastResult("Copied to clipboard")
      console.log(text)
    }
    
    toastResult(text){
      const CustomNotification = ({ title }) => {
        
        return <Button style={{ color:"Green" }}>{title}</Button>
      }
      
      toaster.notify(() => <CustomNotification title={text} />,
                            {position:'bottom',duration:1500}
              )
    }

   togglePw=()=>{
      const {pwShow}=this.state
      this.setState({pwShow:!pwShow})
      console.log(pwShow)
    }

   togglePk=()=>{
      const {privShow}=this.state
      this.setState({privShow:!privShow})
    }


    
    
     render() {
      const { post,icon,pwShow ,privShow} = this.state
      const{loading}=this.state
      if(loading){
          return <Loader/>
      }
      if (icon){
              
      return(  
      <React.Fragment>
        <Card>
        <Card.Content>
          <Content>
            <Heading renderAs="h1">{post.title}</Heading>
          </Content>
          <Content>
        <text>Password</text>
        <input type={ pwShow ? "text":"password"} value={post.description} style={{marginLeft:"10px" }}/>
        <button id="h-s" onClick={this.togglePw} style={{marginLeft:"10px" }}>{pwShow ? "Hide":"Show"}</button>
    
       <button id="copy" onClick={() => this.textCopy(post.description)} style={{marginLeft:"10px" }} >
         Copy
       </button>
        </Content>
        <Content>
        <text>Private Key</text>
        <input type={ privShow ? "text":"password"} value={post.privateKey} style={{marginLeft:"10px" }}/>
        <button  id="pr-hs" onClick={this.togglePk} style={{marginLeft:"10px" }}>{privShow ? "Hide":"Show"}</button>
        <button id="pr-copy" onClick={this.textCopy.bind(this,post.privateKey)}
        style={{marginLeft:"10px" }}
        >
          Copy
          </button>
        </Content>
          <Content>
              <Button onClick={this.onKeystore} color="primary">
              Download Keystore
            </Button>

            </Content>

            </Card.Content>
          </Card>
            
      </React.Fragment>
          
      
      
         
      )
      }
      
      return (
        
        <Card>
          <Card.Content>
            <Content>
              <Heading renderAs="h1">{post.title}</Heading>
            </Content>
            <Content>
        <text>Password</text>
        <input type={ pwShow ? "text":"password"} 
                value={post.description} 
                style={{marginLeft:"10px" }}
                />
        <button id="meta-hs" onClick={this.togglePw} paddingLeft="50px">{pwShow ? "Hide":"Show"}</button>
        <button id="meta-copy" onClick={() => this.textCopy(post.description)}>Copy</button>
        </Content>
          </Card.Content>
        </Card>
      )
    }
  }
  
  PostDetailView.contextType=MyContext
  export default withRouter(PostDetailView)