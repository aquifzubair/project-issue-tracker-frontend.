import React from 'react';
import axios from './../utils/API';

class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment_message:'',
            comment_by:'',
            issue_id:this.props.match.params.id
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
        })
        .catch(err => {
            console.error(err)
            alert(err)
        })
    }

    render() {
        console.log(this.props.match.params.id)
        return (
            
                <form onSubmit={this.handleSubmit} className='text-light'>
                    <label> Comment By:</label>
                    <input 
                        type='text' 
                        onChange={this.handleChange} 
                        name='comment_by' 
                        className='form-control form-control-sm' 
                        required
                    ></input>
                    
                    <label> Comment Message</label>
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
               
        )
    }
}

export default CommentForm;