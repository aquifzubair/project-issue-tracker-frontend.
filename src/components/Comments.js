import React from 'react'
import Axios from 'axios'
import {Button} from 'react-bootstrap'

class Comments extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            comments:[]
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:3001/comments/${this.props.issue_id}`)
        .then(response => response.data)
        .then(response => this.setState({
            comments:response
        }))
        .catch(err => console.error(err))
    }

    delete = (id, e) => {
        console.log(id)
        const confirmation = window.confirm('Do you wanna delete this comment');
        if (confirmation) {
            Axios({
                method: 'delete',
                url: `http://localhost:3001/comments/delete/${id}`,
            })
                .then(response => console.log(response))
                .catch(err => console.error(err))

            const filterComments = this.state.comments.filter(comment => comment.comment_id !== id)
            this.setState({ comments:filterComments })
        }

    }

    render(){
        const allComments = this.state.comments.map(comment => {
            return (
                <div key={comment.comment_id} className='comments'>
                    <div className='item'>
                    <p>{comment.comment_message}</p>
                    </div>
                    
                    <div className='item-end'>
                            <Button onClick={(e) => this.delete(comment.comment_id, e)} variant="outline-danger" size='sm'>Delete</Button>
                        </div>
                    </div>
            )
        })
        return(
            <div className='issues'>
                {allComments}
            </div>
        )
    }
}

export default Comments;