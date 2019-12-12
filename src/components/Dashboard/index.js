import React,{Component} from 'react';
import {Button,Card,Content} from 'react-bulma-components'
import PostForm from '../Posts/PostForm'
import {MyContext} from '../../components/User/UserProvider'
import { UserSession } from 'blockstack/lib/auth/userSession';


class Dashboard extends Component{
    

    render (){
        const {userSession,username}=this.context.state.currentUser
        return (
            <Card>
                <Card.Content>
                    <Content>
                        <Button >
                            ICON Wallet
                        </Button>
                    </Content>
                    <Content>
                        <Button>
                            Metamask Wallet
                        </Button>
                    </Content>
                </Card.Content>
            </Card>
            
            
            
        )
    }

}

Dashboard.contextType=MyContext
export default Dashboard;