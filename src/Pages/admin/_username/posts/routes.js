import React,{Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import AdminPostCreate from './create/index'
import AdminPosts from '../posts/index'
import AdminPostView from './post_id/index'
import AdminPostEdit from './post_id/edit/index'
class AdminUsernamePostRoute extends Component{
    static propTypes={
        match:PropTypes.object.isRequired
    }
    render(){
        return(
            <Switch>
                <Route 
                    exact
                    path={this.props.match.url}
                    render={()=> <AdminPosts/> }
                />
                <Route
                    path={`${this.props.match.url}/create`} 
                    render={()=> <AdminPostCreate/>}

                />
                <Route 
                    exact   
                    path={`${this.props.match.url}/:post_id`}
                    render={({match}) => <AdminPostView match={match}/>}
                />
                <Route    
                    path={`${this.props.match.url}/:post_id/edit`}
                    render={({match})=> <AdminPostEdit match={match}/> }
                />
            </Switch>
        )
    }
}

export default AdminUsernamePostRoute;