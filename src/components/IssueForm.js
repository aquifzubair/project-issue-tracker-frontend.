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
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        New proect form
                </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handleSubmit}>
                    <label> Issue Name:
                    <input type='text' onChange={this.handleChange} name='summary' className='form-control form-control-sm' ></input>
                    </label>
                    <label> description:
                    <textarea type='textarea' onChange={this.handleChange} name='description'></textarea>
                    </label>
                    <label> Created By:
                    <input type='text' onChange={this.handleChange} name='created_by' className='form-control form-control-sm'></input>
                    </label>
                    <label> Status:
                    <select onChange={this.handleChange} name='status'>
                            <option>select status ...</option>
                            <option value="active">Active</option>
                            <option value="close">Close</option>
                            <option value="ongoing">Ongoing</option>
                        </select>
                    </label>

                    <label> Priority:
                    <select onChange={this.handleChange} name='priority'>
                            <option>select priority...</option>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                    </label>
                    <label> Identified By:
                    <input type='text' onChange={this.handleChange} name='identified_by' className='form-control form-control-sm'></input>
                    </label>
                    <label> Assigned To:
                    <input type='text' onChange={this.handleChange} name='assigned_to' className='form-control form-control-sm'></input>
                    </label>
                    <label> Issue Date:
                    <input type='date' onChange={this.handleChange} name='issue_date'></input>
                    </label>
                    <label> Project Id:
                    <input type='text' onChange={this.handleChange} name='project_id' value={this.props.project_id} readOnly></input>
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

export default IssueForm;