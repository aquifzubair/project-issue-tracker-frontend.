import React from 'react';
import axios from './../utils/API';
import {Modal} from 'react-bootstrap'

class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment_message:'',
            comment_by:'',
            issue_id:this.props.issue_id
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
                url: `/comments/insert`,
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
                        New proect form
                </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handleSubmit}>
                    <label> Comment By:</label>
                    <input 
                        type='text' 
                        onChange={this.handleChange} 
                        name='comment_by' 
                        className='form-control form-control-sm' 
                        required
                    ></input>
                    
                    <label> Comment:</label>
                    <textarea 
                        type='textarea'
                        onChange={this.handleChange} 
                        name='comment_message' 
                        className="form-control" 
                        row='10' 
                        required
                    ></textarea><br></br>                    
                    
                    <button type='submit' className='btn btn-primary'>Submit</button>
                    
                </form>
                <Modal.Footer>
                    <button onClick={this.props.onHide}>Close</button>
                </Modal.Footer>

            </Modal>
        )
    }
}

export default CommentForm;