import React from 'react';
import axios from './../utils/API';

import { Button } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Link } from "react-router-dom";
import ProjectEditForm from './projectEditForm';


class Project extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: [],
            projectForm: false
        }
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

    renderTooltip = (props, name, createdOn) => (
        <Tooltip id="button-tooltip" {...props}>
            <b>Created By:-</b> {name} <br></br>
            <b>Created On:-</b> {createdOn}
        </Tooltip>
    );


    render() {
        let allProjects = this.state.project.map(project => {
            return (
                <div className='project' key={project.project_id}>

                    <div className='item'>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(this.props, project.created_by, project.created_on)}   >
                            <Link to={`/issue/${project.project_id}`} >
                                <p className='text-bold'>{project.project_name}</p>
                            </Link>

                        </OverlayTrigger>
                    </div>

                    <div className='item item2 color-green'>
                        <p >{project.description}</p>
                    </div>

                    <div className='item edit'>
                        <Button variant="outline-secondary" onClick={this.setProjectForm} size='sm' >Edit</Button>
                    </div>

                    <div className='ite item-end'>
                        <Button onClick={(e) => this.delete(project.project_id, e)} variant="outline-danger" size='sm'>delete</Button>
                    </div>

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

                </div>

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