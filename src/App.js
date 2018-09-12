import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Questions from './components/Questions';
import Question from './Question/Question';
import Callback from './Callback';
import NewQuestion from './NewQuestion/NewQuestion';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import {Route, withRouter} from 'react-router-dom';
import auth0Client from './Auth';

class App extends Component {
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }
  render() {
    return (
      <div>
      <NavBar />
      <Route exact path='/' component={Questions}/>
      <Route exact path='/question/:questionId' component={Question}/>
      <Route exact path='/callback' component={Callback}/>
      <SecuredRoute path='/new-question' component={NewQuestion} />
      </div>
    );
  }
}
export default withRouter(App);