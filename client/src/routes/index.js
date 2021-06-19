import React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { history } from '../store';


import IndexPage from '../pages/IndexPage/index.page';
import ChatPage from '../pages/ChatPage/chat.page';

//import PrivateRoute from './PrivateRoute';


const routes = ({user, loggedIn}) => {
  return (
    <ConnectedRouter history={history}>
        <React.Fragment>
        <Switch>
            {/* <AdminRoute path="/dashboard" component={AdminLoggedInLayout} user={props.user}/>
            <PrivateRoute path="/auth" component={UserLoggedInLayout} user={props.user}/>
            <Route path="/" render={() => <UserLayout {...props} history={history} redirect={checkIfAuthedAndRedirect}/>}/> */}
            <Route path="/" exact component={IndexPage} />
            {/* <Route path="/chat" exact component ={ChatPage} user={user}/> */}

          <Route path="/chat" render={() => <ChatPage user={user}/>}/>
        </Switch>
        </React.Fragment>
    </ConnectedRouter>
    )
}

const mapStateToProps = (state) => {
    return {
      loggedIn: state.authReducer.loggedIn,
      user: state.authReducer.user
    }
  }

export default connect(mapStateToProps, {})(routes);