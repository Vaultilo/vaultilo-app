import React ,{Component} from 'react';
import './stylesheets/main.scss';
import {Container} from 'react-bulma-components';
import {appConfig} from './utils/constants';
import {UserSession} from 'blockstack';
import Login from './components/Login'
import NavbarComp from './components/Navbar'
import Routes from './Pages/routes'

 
class App extends Component {
  state={
    userSession:new UserSession({appConfig})
  };

  componentDidMount =  async () =>{
    const {userSession}=this.state;
    console.log(userSession)
    if(!userSession.isUserSignedIn() && userSession.isSignInPending()){
      const userData = await userSession.handlePendingSignIn();
      console.log(userData)
      if(!userData.username){
        throw new Error('Username is required')
      }

      window.location="/"
    }
  }


 render(){
  const { userSession } = this.state

  return (
    <div className="App">
    <NavbarComp userSession={userSession}/>
     <Container>
       {
          userSession.isUserSignedIn() ?
          <Routes userSession={userSession}/>:
          <Login userSession={userSession}/ >
      }  
     </Container>
    </div>
  );

 }
  
}

export default App;
