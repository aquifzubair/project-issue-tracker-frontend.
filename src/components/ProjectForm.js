import React from 'react';
import axios from 'axios'
import { Modal } from 'react-bootstrap';

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            created_by: '',
            description: '',
            created_on: '',
            expected_completion_time: ''
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
                method: 'post',
                url: 'http://localhost:3001/projects/insert',
                data: this.state
            }
        )
            .then(response => console.log(response))
            .catch(err => console.error(err))
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
                        New proect form
                </Modal.Title>
                </Modal.Header>

                    <form onSubmit={this.handleSubmit} className='form-group'>
                        <label>
                            Project Name:<input type='text' onChange={this.handleChange} name='name' className='form-control form-control-sm'></input>
                        </label>
                        <label> Created By
                    <input type='text' onChange={this.handleChange} name='created_by' className='form-control form-control-sm'></input>
                        </label>
                        <label> Description: <br />
                            <textarea type='textarea' onChange={this.handleChange} name='description'></textarea>
                        </label>
                        <label> Created on:<br />
                            <input type='date' onChange={this.handleChange} name='created_on'></input>
                        </label>
                        <label> Completion time:<br />
                            <input type='date' onChange={this.handleChange} name='expected_completion_time'></input>
                        </label>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>
                <Modal.Footer>
                    <button onClick={this.props.onHide}>Close</button>
                </Modal.Footer>

            </Modal>
        )
    }
}

export default ProjectForm;