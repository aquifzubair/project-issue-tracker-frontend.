import React from 'react';
import axios from './../utils/API';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'

class ProjectEditForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            project_name: this.props.match.params.name,
            created_by: this.props.match.params.createdBy,
            description: this.props.match.params.description,
            created_on: this.props.match.params.createdOn.slice(0, 10),
            expected_completion_time: this.props.match.params.expectedDate.slice(0, 10)
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios(
            {
                method: `put`,
                url: `/projects/update/${this.props.match.params.id}`,
                data: this.state
            }
        )
            .then(response => {
                console.log(response)
                alert(response.data.message)
                this.setState({
                    project_name: '',
                    created_by: '',
                    description: '',
                    created_on: '',
                    expected_completion_time: ''
                })
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='text-light'>
                <h3>Project Edit Form</h3>
                <label>Project Name:</label>
                <input
                    type='text'
                    onChange={this.handleChange}
                    name='project_name'
                    className='form-control form-control-sm'
                    value={this.state.project_name}
                    required
                ></input><br />

                <label> Created By:</label>
                <input
                    type='text'
                    onChange={this.handleChange}
                    name='created_by' className='form-control form-control-sm'
                    value={this.state.created_by}
                    required
                ></input><br />

                <label> Description:</label>
                <textarea
                    type='textarea'
                    onChange={this.handleChange}
                    name='description'
                    value={this.state.description}
                    required
                ></textarea><br />


                <label> Completion time:</label>
                <input
                    type='date'
                    onChange={this.handleChange}
                    name='expected_completion_time'
                    value={this.state.expected_completion_time}
                    required
                ></input><br />
                <Button type='submit' variant='outline-primary' >Submit</Button><br />

                <Link to={`/projects`}>
                    <Button variant='outline-secondary' >Go back to all projects</Button><br />

                </Link>

            </form>


        )
    }
}


export default ProjectEditForm;