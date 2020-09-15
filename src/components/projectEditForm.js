import React from 'react';
import axios from './../utils/API';
import { Modal } from 'react-bootstrap';

class ProjectEditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project_name: this.props.project_name,
            created_by: this.props.created_by,
            description: this.props.description,
            created_on: this.props.created_on.slice(0,10),
            expected_completion_time: this.props.expected_completion_time.slice(0,10),
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
                url: `/projects/update/${this.props.project_id}`,
                data: this.state
            }
        )
        .then(response => {
            console.log(response)
            alert(response.data.message)
            this.props.onHide()
        })
        .catch(err => {
            console.error(err)
            alert(err)
        })
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Project Form
                </Modal.Title>
                </Modal.Header>

                    <form onSubmit={this.handleSubmit} className='form-group'>

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
                        
                        <button type='submit' className='btn btn-primary' >Submit</button><br />

                    </form>

                <Modal.Footer>
                    <button onClick={this.props.onHide}>Close</button>
                </Modal.Footer>

            </Modal>
        )
    }
}

export default ProjectEditForm;