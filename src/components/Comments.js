import React from 'react'
import axios from './../utils/API';
import {Button} from 'react-bootstrap'
import CommentEditForm from './CommentEditForm'
import {OverlayTrigger,Tooltip} from 'react-bootstrap'

class Comments extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            comments:[],
            modalShow:false
        }
    }

    setModalShow = () => {
        this.setState({
            modalShow: true
        })
    }

    componentDidMount() {
        axios.get(`/comments/${this.props.issue_id}`)
        .then(response => response.data)
        .then(response => this.setState({comments:response}))
        .catch(err => console.error(err))

    }

    delete = (id, e) => {
        console.log(id)
        const confirmation = window.confirm('Do you wanna delete this comment');
        if (confirmation) {
            axios.delete(`/comments/delete/${id}`)
            .then(response => console.log(response))
            .catch(err => console.error(err))

            const filterComments = this.state.comments.filter(comment => comment.comment_id !== id)
            this.setState({ comments:filterComments })
        }

    }

    renderTooltip = (props, commentBy) => (
        <Tooltip id="button-tooltip" {...props}>
        <b>Comment By:-</b> {commentBy} <br></br>
        </Tooltip>
      );


    render(){
        console.log(this.state.comments)
        const allComments = this.state.comments.map(comment => {
            return (
                <div key={comment.comment_id} className='comment'>
                    
                    <div className='item'>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip(this.props,comment.comment_by)}
                                >
                                   <p>{comment.comment_message}</p>
                                </OverlayTrigger>    
                        </div>

                    <div className='item'>
                        <Button variant="outline-secondary" size='sm' onClick={this.setModalShow}>Edit Comment</Button>
                    </div>

                    <CommentEditForm
                                comment_id={comment.comment_id}
                                issue_id = {comment.issue_id}
                                comment_message= {comment.comment_message}
                                comment_by = {comment.comment_by}
                                show={this.state.modalShow}
                                onHide={() => this.setState({ modalShow: false })} 
                    />
                    
                    <div className='item-end'>
                            <Button onClick={(e) => this.delete(comment.comment_id, e)} variant="outline-danger" size='sm'>Delete</Button>
                    </div>

                </div>
            )
        })
        return(
            <div className='comments'>
                {allComments}
            </div>
        )
    }
}

export default Comments;