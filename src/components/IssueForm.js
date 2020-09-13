import React from 'react';
import axios from 'axios'
import { Modal } from 'react-bootstrap';

class IssueForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            summary: '',
            description: '',
            status: '',
            identified_by: '',
            assigned_to: '',
            issue_date: '',
            project_id: this.props.project_id,
            priority: ''
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
                url: 'http://localhost:3001/issues/insert',
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
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        New Issue Form
                    </Modal.Title>
                </Modal.Header>

                <form onSubmit={this.handleSubmit}>

                    <label> Issue Name:</label>
                    <input type='text' onChange={this.handleChange} name='summary' className='form-control form-control-sm' required></input><br></br>

                    <label> description:</label>
                    <textarea type='textarea' onChange={this.handleChange} name='description' required></textarea><br></br>

                    <label>Created By:</label>
                    <input type='text' onChange={this.handleChange} name='created_by' className='form-control form-control-sm' required></input>
                    <br></br>

                    <label> Status:</label>
                    <select onChange={this.handleChange} name='status' required>
                        <option>select status ...</option>
                        <option value="active">Active</option>
                        <option value="close">Close</option>
                        <option value="ongoing">Ongoing</option>
                    </select><br></br>                    

                    <label>Priority: </label>
                    <select onChange={this.handleChange} name='priority' required>
                        <option>select priority...</option>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select><br></br>                    

                    <label> Identified By: </label>
                    <input type='text' onChange={this.handleChange} name='identified_by' className='form-control form-control-sm' required></input><br></br>


                    <label> Assigned To:</label>
                    <input type='text' onChange={this.handleChange} name='assigned_to' className='form-control form-control-sm' required></input><br></br>


                    <label> Issue Date:</label>
                    <input type='date' onChange={this.handleChange} name='issue_date' required></input><br></br>                    

                    <button type='submit' className='btn btn-primary'>Submit</button><br></br>

                </form>

                <Modal.Footer>
                    <button onClick={this.props.onHide}>Close</button>
                </Modal.Footer>

            </Modal>
        )
    }
}

export default IssueForm;