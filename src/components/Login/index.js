import React,{Component} from 'react'
import {Card,Content,Button,Image} from 'react-bulma-components'
import Loader from 'components/Loader'

export default class Login extends Component{

	state={ 
		loading:false
	}

	handleSignIn = (e) => {
    const {userSession}=this.props
    e.preventDefault()
    userSession.redirectToSignIn()
    this.setState({loading:true})
  } 

	render(){
		const {loading}=this.state
		return(
		<Card> 
			 <Card.Content>
			  <Content>
			  {
			  	loading ? <Loader/>:
			  	<Button color="dark" onClick={this.handleSignIn} shadowSize={2}>
			       Sign in with Blockstack
			     </Button>
				 

			  }
			  </Content>
			  
			  </Card.Content>
			
		</Card>
			)
	}
}