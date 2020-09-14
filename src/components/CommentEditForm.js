import React from 'react';
import axios from 'axios'
import {Modal} from 'react-bootstrap'

class CommentEditForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            comment_message:this.props.message,
            comment_by:this.props.comment_by,
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
                method: 'put',
                url: `http://localhost:3001/comments/update/${this.props.comment_id}`,
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
                    
                    <label> Comment:</label>
                    <textarea 
                        type='textarea'
                        onChange={this.handleChange} 
                        name='comment_message' 
                        className="form-control" 
                        row='10'
                        value={this.state.comment_message} 
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

export default CommentEditForm;