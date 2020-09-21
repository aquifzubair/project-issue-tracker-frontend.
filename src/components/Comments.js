import React from 'react'
import axios from './../utils/API';
import { Button } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Comments extends React.Component {

    componentDidMount() {
        axios.get(`/comments/${this.props.match.params.id}`)
            .then(response => response.data)
            .then(response => {
                this.props.dispatch({
                    type: 'GET_COMMENTS',
                    data: response
                })
            })
            .catch(err => console.error(err))
    }

    delete = (id, e) => {
        console.log(id)
        const confirmation = window.confirm('Do you wanna delete this comment');
        if (confirmation) {
            axios.delete(`/comments/delete/${id}`)
                .then(response => console.log(response))
                .catch(err => console.error(err))

            const filterComments = this.props.comments.allComments.filter(comment => comment.comment_id !== id)
            this.props.dispatch({
                type: 'GET_COMMENTS',
                data: filterComments
            })
        }

    }

    renderTooltip = (props, commentBy) => (
        <Tooltip id="button-tooltip" {...props}>
            <b>Comment By:-</b> {commentBy} <br></br>
        </Tooltip>
    );


    render() {
        const allComments = this.props.comments.allComments.map(comment => {
            return (
                <div key={comment.comment_id} className='comment'>

                    <div className='item'>
                        {comment.comment_by}
                    </div>

                    <div className='item2 item'>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={this.renderTooltip(this.props, comment.comment_by)}
                        >
                            <p >{comment.comment_message}</p>
                        </OverlayTrigger>
                    </div>

                    <div className='item'>
                        <Link to={`/editComment/${comment.comment_id}/${comment.issue_id}/${comment.comment_message}/${comment.comment_by}`}>
                            <Button variant="outline-secondary" size='sm' >Edit Comment</Button>

                        </Link>
                    </div>

                    <div className='item'>
                        <Link to={`/commentForm/${this.props.match.params.id}`}>
                            <Button variant="outline-secondary" size='sm'>New Comment</Button>
                        </Link>
                    </div>



                    <div className='item-end'>
                        <Button onClick={(e) => this.delete(comment.comment_id, e)} variant="outline-danger" size='sm'>Delete</Button>
                    </div>

                </div>
            )
        })

        let newCommentButton =
            (<div className='comment'>
                <div className='item'>There is no any comment, you can add by clicking on the button</div>
                <Link to={`/commentForm/${this.props.match.params.id}`} className='item item-end'>
                    <Button variant="outline-secondary" size='sm' onClick={this.setModalShow}>New Comment</Button>
                </Link>
            </div>)

        return (
            <div className='comments'>
                {allComments.length > 0 ? allComments : newCommentButton}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        comments: state.commentReducer.comments
    }
}

export default connect(mapStateToProps)(Comments);