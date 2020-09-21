import React from 'react';
import axios from './../utils/API';
import { Modal } from 'react-bootstrap';
import {connect} from 'react-redux'
import store from '../store'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project_name: '',
            created_by: '',
            description: '',
            created_on: '',
            expected_completion_time: '',
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
                method: `post`,
                url: `/projects/insert`,
                data: this.state
            }
        )
        .then(response => {
            axios.get('/projects')
            .then(data => data.data)
            .then(data => store.dispatch({
            type:'GET_PROJECTS',
            data:data
        }))
        .then(()=>{
            alert(response.data.message)
            this.props.onHide()
        })
                            
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
                        New project form
                </Modal.Title>
                </Modal.Header>

                    <form onSubmit={this.handleSubmit} className='form-group'>

                        <label>Project Name:</label>
                            <input 
                                type='text' 
                                onChange={this.handleChange} 
                                name='project_name' 
                                className='form-control form-control-sm' 
                                required
                            ></input><br />
                        
                        <label> Created By:</label>
                            <input 
                                type='text' 
                                onChange={this.handleChange} 
                                name='created_by' 
                                className='form-control form-control-sm' 
                                required
                            ></input><br />
                        
                        <label> Description:</label> 
                            <textarea 
                                type='textarea' 
                                onChange={this.handleChange} 
                                name='description' 
                                required></textarea
                            ><br />
                        
                        <label> Created on:</label>
                            <input 
                                type='date' 
                                onChange={this.handleChange} 
                                name='created_on' 
                                required
                            ></input><br />
                        
                        <label> Completion time:</label>
                            <input 
                                type='date' 
                                onChange={this.handleChange} 
                                name='expected_completion_time' 
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

const mapStateToProps = state => {
    return{
        projects:state.projectReducer.projects
    }
}

export default connect(mapStateToProps)(ProjectForm);