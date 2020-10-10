import React, {useState} from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Comments from './components/Comments';
import CommentForm from './components/CommentForm';

import Issues from './components/Issues';
import IssueForm from './components/IssueForm';
import AllIssues from './components/AllIssues';

import Project from './components/Projects'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store'
import ProjectEditForm from './components/projectEditForm';
import CommentEditForm from './components/CommentEditForm';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

const App = () => {

  const token = localStorage.getItem('token');

  const [isLoggedIn, setLoggedIn] = useState(token? true : false);

  const handleLoggedIn = () => {    
    setLoggedIn(!isLoggedIn)
  }

  return (
    <Provider store={store}>

      <Router>
        <Navbar token={token} handleLoggedIn={handleLoggedIn} />

        <Switch>

          <Route exact path='/signup'> <SignUp /> </Route>
          <Route exact path='/login' component={(props) => <LogIn  handleLoggedIn={handleLoggedIn} {...props} />}>
          </Route>



          <Route exact path='/'> <AllIssues /> </Route>
          <Route exact path='/projects'> <Project /> </Route>

          <Route exact path={`/issueForm/:id`} component={IssueForm}></Route>
          <Route exact path={`/comments/:id`} component={Comments}></Route>

          <Route exact path={`/commentForm/:id`} component={CommentForm}></Route>
          <Route exact path={`/issue/:id`} component={Issues}></Route>

          <Route exact path={`/editProject/:id/:name/:createdOn/:createdBy/:description/:expectedDate`} component={ProjectEditForm} ></Route>
          <Route exact path={`/editComment/:id/:issueId/:message/:commentBy`} component={CommentEditForm}></Route>

        </Switch>
      </Router>

    </Provider>

  );
}

export default App;
