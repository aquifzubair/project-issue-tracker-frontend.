import React from 'react';
import axios from './../utils/API';

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
            project_id: this.props.match.params.id,
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
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='text-light '>

                <div className='form-group'>

                    <label> Issue Name:</label>
                    <input
                        type='text'
                        onChange={this.handleChange}
                        name='issue_summary'
                        className='form-control'
                        required
                    ></input>
                </div>


                <div className='form-group'>

                    <label> description:</label>
                    <textarea
                        type='textarea'
                        onChange={this.handleChange}
                        name='issue_description'
                        className='form-control'
                        required
                    ></textarea>
                </div>


                <div className='form-group'>

                    <label>Created By:</label>
                    <input
                        type='text'
                        onChange={this.handleChange}
                        name='created_by'
                        className='form-control'
                        required
                    ></input>
                </div>


                <div className='form-group'>

                    <label> Status:</label>
                    <select onChange={this.handleChange} name='issue_status' className='form-control' required >
                        <option>select status ...</option>
                        <option value="active">Active</option>
                        <option value="close">Close</option>
                        <option value="progress">progress</option>
                    </select>
                </div>


                <div className='form-group'>

                    <label>Priority: </label>
                    <select onChange={this.handleChange} name='issue_priority' className='form-control' required >
                        <option>select priority...</option>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>
                </div>


                <div className='form-group'>
                    <label> Identified By: </label>
                    <input
                        type='text'
                        onChange={this.handleChange}
                        name='identified_by'
                        className='form-control'
                        required
                    ></input>
                </div>


                <div className='form-group'>

                    <label> Assigned To:</label>
                    <input
                        type='text'
                        onChange={this.handleChange}
                        name='assigned_to'
                        className='form-control'
                        required
                    ></input>
                </div>


                <div className='form-group'>
                    <label> Issue Date:</label>
                    <input
                        type='date'
                        onChange={this.handleChange}
                        name='issue_date'
                        className='form-control'
                        required
                    ></input>

                </div>


                <button type='submit' className='btn btn-primary btn-sm'>Submit</button><br></br>

            </form>
        )
    }
}

export default IssueForm;