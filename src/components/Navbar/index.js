import React,{Component} from 'react';
import {Navbar} from 'react-bulma-components' 
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

class NavbarComp extends Component{
	state = {
		open:false,
		user:{}

	}

	static propTypes={
		userSession:PropTypes.object.isRequired,
		history:PropTypes.object.isRequired
	}

	componentDidMount (){
		const {userSession}=this.props
		if (userSession.isUserSignedIn()){
			const user=userSession.loadUserData()
			this.setState({user})
		}
	}

	goToAdminPosts = () => {
		const {history}=this.props
		const {user}=this.state

		return history.push(`/admin/${user.username}/posts`)

	}

	goToAdminProfile=() =>{
		const {history}=this.props
		const {user}=this.state

		return history.push(`/admin/${user.username}`)


	}

	handleSignOut = (e) => {
    const {userSession}=this.props
    e.preventDefault()
    userSession.signUserOut()
    window.location ='/'
  }
  	toggleNavBar = () =>{
  		this.setState({open:!this.state.open})
  	}

	render(){
		const {userSession}=this.props
		const isSignedIn=userSession.isUserSignedIn()
		const {open}=this.state
		return(
			<Navbar
			 color="dark"
			 fixed="top"
			 active={open}
			>
			 <Navbar.Brand>
			  <Navbar.Item>
			  <p>Secret Key</p> 
			  </Navbar.Item>
			  <Navbar.Burger onClick={this.toggleNavBar} />
			 </Navbar.Brand>
			 	<Navbar.Menu>
			 		<Navbar.Container position="end">
			 			{
			 				isSignedIn &&
			 				<React.Fragment>
			 				 <Navbar.Item onClick={this.goToAdminPosts}>Keys</Navbar.Item>
			 				 <Navbar.Item onClick={this.goToAdminProfile}>My Profile </Navbar.Item>
			 				 <Navbar.Item onClick={this.handleSignOut}>Sign Out</Navbar.Item>
			 				</React.Fragment>
			 			}
			 		</Navbar.Container>

			 	</Navbar.Menu>



			</Navbar>
		
			)
	}
}

export default  withRouter(NavbarComp)