import React, { Component } from 'react'
import PostFormIcon from '../../../../../components/Posts/PostFormIcon'
import { MyContext } from '../../../../../components/User/UserProvider'

class AdminPostCreateIcon extends Component{
    render(){
        const {userSession,username}=this.context.state.currentUser

        console.log(userSession,username)
        return (
            <PostFormIcon 
            username={username} 
            userSession={userSession} 
            type="create"/>
        )
    }
}

AdminPostCreateIcon.contextType = MyContext
export default AdminPostCreateIcon;