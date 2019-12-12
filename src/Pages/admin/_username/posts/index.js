import React, { Component } from 'react'
import _ from 'lodash'
import {
  Card,
  Content,
  Button
} from 'react-bulma-components'
import { POST_FILENAME } from 'utils/constants'

import { MyContext} from '../../../../components/User/UserProvider'
import PostsTable from '../../../../components/Posts/PostsTable'
import Loader from '../../../../components/Loader/index' 
import { POST_ICONFILE } from '../../../../utils/constants'


class AdminPosts extends Component{
    state={
        posts:[],
        posts2:[],
        loading:true,
        warning:false
    }
    componentDidMount() {
        this.loadPosts()
      }
    
      loadPosts = async () => {
        const { userSession } = this.context.state.currentUser
        const options = { decrypt: false }
    
        try {
          const result = await userSession.getFile(POST_FILENAME, options)
          const result2 = await userSession.getFile(POST_ICONFILE,options)
    
          if (!result && !result2) {
            throw new Error('Posts File does not exist')
          }
    
          return this.setState({ posts: JSON.parse(result) ,loading:false, posts2:JSON.parse(result2)})
        } catch (e) {
          this.setState({loading:false,warning:true})
          console.log(e.message)
        }
      }

      // getFilesList= async () =>{
      //   const{userSession}=this.context.state.currentUser
      //   const filesList=[]

      //   const filesNumber=await userSession.listFiles((a)=>{console.log(a)})
      //   console.log(filesNumber)

      // }
    

      deletePost = async (postId) => {
        const { userSession } = this.context.state.currentUser
        const { posts } = this.state
        const options = { encrypt: false }
    
        const filteredPosts = _.filter(posts, (post) => post.id !== postId)
        console.log(filteredPosts)
        const deleteOverwrite={
          id:postId,
          title:"null",
          description:"null"
        }
    
        try {
          await userSession.putFile(POST_FILENAME, JSON.stringify(filteredPosts), options)
          //await userSession.putFile(`post-${postId}.json`,JSON.stringify(deleteOverwrite),options)
          
          
          this.setState({ posts: filteredPosts })
         console.log(postId)
        } catch (e) {
          console.log(e.message)
        }
        // try{
        //   await userSession.deleteFile(`post-${postId}.json`)
        //   await userSession.deleteFile('random.json')
        // }catch(e){
          //console.log(e)
        

      }

    render(){
    const { posts,posts2 } = this.state
    const { username } = this.context.state.currentUser
    const {loading,warning}=this.state

    if (loading){
      return <Loader/>
    } 

    if (warning){
      return (<div>No keys found,add Some Key </div>)
    }


    return (
      <Card>
        <Card.Content>
          <Content>
            <PostsTable
              posts={posts}
              username={username}
              deletePost={this.deletePost}
              posts2={posts2}
              
              
            />
          </Content>
          
        </Card.Content>
      </Card>
    )
    }

}
export default AdminPosts
AdminPosts.contextType=MyContext