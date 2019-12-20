import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Table, Button,Card,Content } from 'react-bulma-components'
import { withRouter } from 'react-router-dom'

class PostsTable extends Component{
    static propTypes = {
        deletePost:PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired,
        history:PropTypes.object.isRequired
        
      }

      state ={
        meta:false,
        icon:false,
        buttonClk:true
      }

      editAdminPost (post) {
        const {history,username}=this.props 
        return history.push(`/admin/${username}/posts/${post.id}/edit`)

      }

      deletePost (post){
        this.props.deletePost(post.id)

      }

      viewAdminPosts = (post,loadType) =>{
          const {history,username}=this.props 
          if (loadType==="metamask"){
            return history.push(`/admin/${username}/posts/${post.id}`)
          }
          return history.push(`/admin/${username}/posts/${post.id}/icon`)

      }

      displayAdminOptions(post,loadType) {
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
          onClick={() => this.viewAdminPosts(post,loadType)}
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
    metaClick = () =>{
      const {meta,icon}=this.state
      console.log("meta",meta)
      this.setState({meta:true,icon:false,buttonClk:true})

    }
    iconClick = () => {
      const {meta,icon}=this.state
      console.log(meta,icon)
      this.setState({meta:false,icon:true,buttonClk:false})
    }

      render() {
        const { posts } = this.props
        const {posts2} =this.props
        const {meta,icon,buttonClk}=this.state

        return (
          <React.Fragment>
            <Button onClick={this.metaClick.bind(this)} color={buttonClk ? "black":"light"}>Metamask Wallets</Button>
            <Button onClick={this.iconClick.bind(this)} color={!buttonClk ? "black":"light"}>ICON Wallets</Button>
            <Card>
              <Card.Content>
                <Content>
                  {(!meta && !icon)? <text>Click to view list</text>:null}
                </Content>
                <Content>
                  {
                    meta ?
                      <React.Fragment>
                      <text style={{color:"red",size:"20px"}}>Metamask Wallets List</text>
                      <Table>
                        <thead>
                          <tr>
                            
                            <th>Platform</th>
                            <th>Menu</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          {
                            _.map(posts, (post) => {
                              return (
                                <tr key={post.id}>
                                  
                                  <td>{post.title}</td>
                                  <td>{this.displayAdminOptions(post,"metamask")}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table> </React.Fragment>: null
                  }

                </Content>
                <Content>
                  {
                    icon ?
                    <React.Fragment>
                      <text style={{color:"red",size:"20px"}}>ICON Wallets List</text>
                      <Table>
          <thead>
            <tr>
              
              <th>ICON Wallet Name</th>
              <th>Menu</th>
              
            </tr>
          </thead>
          <tbody>
            {
              _.map(posts2, (post) => {
                return (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{this.displayAdminOptions(post,"icon")}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table></React.Fragment>:null
                    
                    

                  }
                </Content>
              </Card.Content>
            </Card>
          </React.Fragment>
        )
    
        // return (
        //   <React.Fragment>
        //   <Table>
        //     <thead>
        //       <tr>
        //         <th>Id</th>
        //         <th>Platform</th>
        //         <th>Menu</th>
                
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {
        //         _.map(posts, (post) => {
        //           return (
        //             <tr key={post.id}>
        //               <td>{post.id}</td>
        //               <td>{post.title}</td>
        //               <td>{this.displayAdminOptions(post,"metamask")}</td>
        //             </tr>
        //           )
        //         })
        //       }
        //     </tbody>
        //   </Table>
        //   <Table>
        //   <thead>
        //     <tr>
        //       <th>Id</th>
        //       <th>ICON Wallet</th>
        //       <th>Menu</th>
              
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {
        //       _.map(posts2, (post) => {
        //         return (
        //           <tr key={post.id}>
        //             <td>{post.id}</td>
        //             <td>{post.title}</td>
        //             <td>{this.displayAdminOptions(post,"icon")}</td>
        //           </tr>
        //         )
        //       })
        //     }
        //   </tbody>
        // </Table>
        // </React.Fragment>
          
        // )
      }
}

export default withRouter(PostsTable)