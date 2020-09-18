import React from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Comments from './components/Comments';
import CommentForm from './components/CommentForm';

import Issues from './components/Issues';
import IssueForm from './components/IssueForm';
import AllIssues from './components/AllIssues';

import Project from './components/Projects'
import {Switch, Route} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />

      <Switch>
        <Route exact path='/'>
          <AllIssues />
        </Route>

        <Route exact path='/projects'>
          <Project />
        </Route>

        <Route exact path={`/issueForm/:id`} component={IssueForm}></Route>
        <Route exact path={`/comments/:id`} component={Comments}></Route>
        
        <Route exact path={`/commentForm/:id`} component={CommentForm}></Route>
        <Route exact path={`/issue/:id`} component={Issues}></Route>
      </Switch>
    </div>
  );
}

export default App;
