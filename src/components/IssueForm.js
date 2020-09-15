import React from 'react';
import axios from './../utils/API';
import { Modal } from 'react-bootstrap';

class IssueForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            issue_summary: '',
            issue_description: '',
            issue_status: '',
            identified_by: '',
            assigned_to: '',
            issue_date: '',
            project_id: this.props.project_id,
            issue_priority: ''
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
                url: '/issues/insert',
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
                   
                </Modal.Header>

                <form onSubmit={this.handleSubmit}>

                    <label> Issue Name:</label>
                    <input 
                        type='text' 
                        onChange={this.handleChange} 
                        name='issue_summary' 
                        className='form-control form-control-sm' 
                        required
                    ></input>

                    <label> description:</label>
                        <textarea 
                        type='textarea' 
                        onChange={this.handleChange} 
                        name='issue_description' 
                        required
                    ></textarea>

                    <label>Created By:</label>
                    <input 
                        type='text' 
                        onChange={this.handleChange} 
                        name='created_by' 
                        className='form-control form-control-sm' 
                        required
                    ></input>
                    

                    <label> Status:</label>
                    <select onChange={this.handleChange} name='issue_status' required >
                        <option>select status ...</option>
                        <option value="active">Active</option>
                        <option value="close">Close</option>
                        <option value="progress">progress</option>
                    </select>                    

                    <label>Priority: </label>
                    <select onChange={this.handleChange} name='issue_priority' required >
                        <option>select priority...</option>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>                    

                    <label> Identified By: </label>
                    <input 
                        type='text' 
                        onChange={this.handleChange} 
                        name='identified_by' 
                        className='form-control form-control-sm' 
                        required
                    ></input>

                    <label> Assigned To:</label>
                    <input 
                        type='text' 
                        onChange={this.handleChange} 
                        name='assigned_to' 
                        className='form-control form-control-sm' 
                        required
                    ></input>

                    <label> Issue Date:</label>
                        <input 
                        type='date' 
                        onChange={this.handleChange} 
                        name='issue_date' 
                        required
                    ></input>  <br></br>               

                    <button type='submit' className='btn btn-primary'>Submit</button><br></br>

                </form>

            </Modal>
        )
    }
}

export default IssueForm;