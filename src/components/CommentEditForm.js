import React from 'react';
import axios from './../utils/API';

class CommentEditForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props, 'comment Edit Form ')
        this.state = {
            comment_message: this.props.match.params.message,
            comment_by: this.props.match.params.commentBy,
            issue_id: this.props.match.params.issueId
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
                url: `/comments/update/${this.props.match.params.id}`,
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

            <form onSubmit={this.handleSubmit} className='text-light'>
                <h3>Comment Edit Form</h3>
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

        )
    }
}

export default CommentEditForm;