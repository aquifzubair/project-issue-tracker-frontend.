import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
// import Project from './components/Projects'
// import ProjectForm from './components/ProjectForm'
// import Issues from './components/Issues'
import Comments  from './components/Comments'




function App() {
  return (
    <div>
      <Navbar />
      {/* <Project className='container' /> */}
      {/* <ProjectForm /> */}
      {/* <IssueForm /> */}
      {/* <CommentForm /> */}
      <Comments />
    </div>

  );
}

export default App;
