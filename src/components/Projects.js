import React from 'react';
import axios from 'axios';

import Issues from './Issues';
import IssueForm from './IssueForm'

import { Button } from 'react-bootstrap'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class Project extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: [],
            modalShow: false
        }
    }

    setModalShow = () => {
        this.setState({
            modalShow: true
        })
    }

    componentDidMount() {
        axios.get('http://localhost:3001/projects')
            .then(data => data.data)
            .then(data => this.setState({ project: data }))
    }

    delete = (id, e) => {
        const confirmation = window.confirm('Do you wanna delete this project');
        if (confirmation) {
            axios({
                method: 'delete',
                url: `http://localhost:3001/projects/delete/${id}`,
            })
                .then(response => console.log(response))
                .catch(err => console.error(err))

            const projects = this.state.project.filter(project => project.project_id !== id)
            this.setState({ project: projects })
        }

    }

    edit = () => {
        console.log('edit')
    }
    render() {
        let allProjects = this.state.project.map(project => {
            return (
                <Router key={project.project_id}>

                    <div className='project'>

                        <div className='item'>
                            <Link to='/issues'>
                                <p>{project.project_name}</p>
                            </Link>
                        </div>

                        <div className='item'>
                            <Button onClick={(e) => this.delete(project.project_id, e)} variant="outline-danger" size='sm'>delete</Button>
                        </div>

                        <div className='item'>
                            <Button onClick={this.edit} variant="outline-secondary" size='sm'>edit</Button>{' '}
                        </div>

                        <div className='item item-end'>
                            <Link to='issueForm'>
                            <Button variant="outline-primary" size='sm' onClick={this.setModalShow}>New Issue</Button>{' '}
                            </Link>
                        </div>
                        
                        {/* <IssueForm
                            show={this.state.modalShow}
                            onHide={() => this.setState({ modalShow: false })}
                        /> */}

                    </div>

                    <Switch>

                        <Route path='/issues'>
                            <Issues project_id={project.project_id} project_name={project.project_name} />
                        </Route>
                        <Route path='/issueForm'>
                            <IssueForm 
                            project_id={project.project_id}
                            show={this.state.modalShow}
                            onHide={() => this.setState({ modalShow: false })}/>
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