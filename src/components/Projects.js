import React from 'react';
import axios from './../utils/API';

import Issues from './Issues';
import IssueForm from './IssueForm'
import ProjectEditForm from './projectEditForm'

import { Button } from 'react-bootstrap'
import {OverlayTrigger,Tooltip} from 'react-bootstrap'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";


class Project extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: [],
            modalShow: false,
            projectForm:false
        }
    }

    setModalShow = () => {
        this.setState({
            modalShow: true
        })
    }

    setProjectForm = () => {
        this.setState({
            projectForm: true
        })
    }

    componentDidMount() {
        axios.get('/projects')
            .then(data => data.data)
            .then(data => this.setState({ project: data }))
    }

    delete = (id, e) => {
        const confirmation = window.confirm('Do you wanna delete this project');
        if (confirmation) {
            axios.delete(`/projects/delete/${id}`)
            .then(response => console.log(response))
            .catch(err => console.error(err))

            const projects = this.state.project.filter(project => project.project_id !== id)
            this.setState({ project: projects })
        }

    }

    renderTooltip = (props, name, description) => (
        <Tooltip id="button-tooltip" {...props}>
        <b>Created By:-</b> {name} <br></br>
        <b>description:-</b> {description}
        </Tooltip>
      );

    
    render() {
        let allProjects = this.state.project.map(project => {
            return (
                <Router key={project.project_id}>

                    <div className='project'>

                        <div className='item color-green'>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip(this.props,project.created_by, project.description)}
                                >
                                    <p>{project.project_name}</p>
                                </OverlayTrigger>    
                        </div>

                        

                        <div className='item'>
                            
                            <Link to='ProjectEditForm'>
                                <Button onClick={this.setProjectForm} variant="outline-secondary" size='sm'>edit</Button>
                            </Link>                            
                        </div>

                        <div className='item'>
                            <Link to='/issues' >
                                <Button variant="outline-secondary" size='sm' >Show Issues</Button>
                            </Link>                            
                        </div>

                        <div className='item'>
                            <Link to='issueForm'>
                                <Button variant="outline-primary" size='sm' onClick={this.setModalShow}>New Issue</Button>
                            </Link>
                        </div>  

                        <div className='ite item-endm'>
                            <Button onClick={(e) => this.delete(project.project_id, e)} variant="outline-danger" size='sm'>delete</Button>
                        </div>                          

                    </div>

                    <Switch>

                        <Route path='/issues'>
                            <Issues project_id={project.project_id}/>
                        </Route>
                        
                        <Route path='/issueForm'>

                            <IssueForm
                                method='insert'
                                project_id={project.project_id}
                                show={this.state.modalShow}
                                onHide={() => this.setState({ modalShow: false })} 
                            />

                        </Route>

                        <Route path='/ProjectEditForm'>

                            <ProjectEditForm
                                created_on={project.created_on}
                                project_name={project.project_name}
                                created_by={project.created_by}
                                description={project.description}
                                expected_completion_time={project.expected_completion_time}
                                project_id={project.project_id}
                                show={this.state.projectForm}
                                onHide={() => this.setState({ projectForm: false })} 
                            />

                        </Route>

                    </Switch>
                    
                </Router>

            )
        })

        return (
            <div className='allProjects'>
                {allProjects}
            </div>
        )
    }
}

export default Project;