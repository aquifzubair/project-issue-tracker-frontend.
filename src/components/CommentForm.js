import React from 'react';
// import axios from 'axios'

class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment_by:'',
            comment_message:''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios(
    //         {
    //             method: 'post',
    //             url: 'http://localhost:3001/projects/insert',
    //             data: this.state
    //         }
    //     )
    //         .then(response => console.log(response))
    //         .catch(err => console.error(err))
    // }

    render() {
        return (
            <div>
                <form>
                    <label> Comment By:
                    <input type='text' onChange={this.handleChange} name='comment_by' className='form-control form-control-sm'></input>
                    </label>
                    <label> Comment:
                    <textarea type='textarea' onChange={this.handleChange} name='comment_message' className="form-control" row='10'></textarea>
                    </label>
                    
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        )
    }
}

export default CommentForm;