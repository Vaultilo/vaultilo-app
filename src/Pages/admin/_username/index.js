import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Button,Card,Content,Heading} from 'react-bulma-components'
import {withRouter} from 'react-router-dom'




class AdminUsername extends Component{
    static propTypes={
        username:PropTypes.string.isRequired
    }

    navigateToCreatePost = () => {
        const {history,username}=this.props
        history.push(`/admin/${username}/posts/create`)
    }

    navigateToCreatePostIcon = () => {
        const {history,username}=this.props
        history.push(`/admin/${username}/posts/create/icon`)
    }


    render(){
        const {username} =this.props
        return (
            <div className="admin-username">
                <Card>
                    <Card.Content>
                        <Content>
                            <Heading  renderAs="h2">Hello {username} </Heading>
                            <Button color="primary" onClick={this.navigateToCreatePost}>Metamask Wallet</Button>
                        </Content>
                        <Content>
                            
                            <Button color="primary" onClick={this.navigateToCreatePostIcon}>ICON wallet</Button>
                        </Content>
                    </Card.Content>
                </Card>
            </div>
            
             )
    }
}

export default withRouter(AdminUsername);