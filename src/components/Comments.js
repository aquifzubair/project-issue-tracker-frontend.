import React from 'react'
import Axios from 'axios'

class Comments extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            commnets:[]
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/comments')
        .then(response => response.data)
        .then(response => this.setState({
            commnets:response
        }))
        .catch(err => console.error(err))
    }

    render(){

        const allComments = this.state.commnets.map(comment => {
            return (
                <div key={comment.comment_id}>
                    {comment.comment_message}
                    </div>
            )
        })
        return(
            <div>
                {allComments}
            </div>
        )
    }
}

export default Comments;