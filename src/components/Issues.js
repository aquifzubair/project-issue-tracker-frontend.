import axios from './../utils/API';
import React from 'react';
import { Button } from 'react-bootstrap'
import Comments from './Comments'
import CommentForm from './CommentForm'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Issues extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            issues: [],
            modelShow: false,
            statusUpdate:false
        }
    }

    
    setModalShow = () => {
        this.setState({
            modalShow: true
        })
    }

    componentDidMount() {
        axios.get(`/issues/${this.props.project_id}`)
            .then(data => data.data)
            .then(data => this.setState({ issues: data }))
    }

    delete = (id, e) => {
        const confirmation = window.confirm('Do you wanna delete this issue');
        if (confirmation) {
            axios.delete(`/issues/delete/${id}`)
                .then(response => console.log(response))
                .catch(err => console.error(err))

            const filterIssue = this.state.issues.filter(issue => issue.issue_id !== id)
            this.setState({ issues: filterIssue })
        }

    }

    renderTooltip = (props, createdBy, description, assignedTo,createdOn) => (
        <Tooltip id="button-tooltip" {...props}>
            <b>Created By:-</b> {createdBy} <br></br>
            <b>Created On:-</b> {createdOn} <br></br>
            <b>Assigned To:-</b> {assignedTo} <br></br>
            <b>description:-</b> {description}
        </Tooltip>
    );

    handleChange = (id,e) => {
        console.log(e.target.value)
        axios({
            method:'put',
            url:`/issues/status/${id}`,
            data:{issue_status:`${e.target.value}`}
        })
        .then(response => console.log(response))
        .catch(err => console.error(err))

        this.setState({
            statusUpdate:!this.state.statusUpdate
        })
    } 

    componentDidUpdate(){
        if(this.state.statusUpdate){
            axios.get(`/issues/${this.props.project_id}`)
            .then(data => data.data)
            .then(data => this.setState({
                 issues: data,
                 statusUpdate:!this.state.statusUpdate
            }))
            .catch(err => console.error(err))
        }
    }


    render() {
        console.log(this.state)
        const allIssues = this.state.issues.map(issue => {
            return (
                <Router key={issue.issue_id} >

                    <div className='issue'>

                        <div className='item'>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip(this.props, issue.identified_by, issue.issue_description, issue.assigned_to, issue.issue_date.slice(0,10))}
                                >
                                    <p>{issue.issue_summary}</p>
                                </OverlayTrigger>
                        </div>

                        <div className='item'>
                            <select onChange={(e) => this.handleChange(issue.issue_id, e)} required >
                                <option value={issue.issue_status}>{issue.issue_status}</option>
                                <option value={issue.issue_status === 'close'? 'active' : 'close'}>{issue.issue_status === 'close'? 'active' : 'close'}</option>
                                <option value={issue.issue_status === 'progress'? 'active' : 'progress'}>{issue.issue_status === 'progress'? 'active' : 'progress'}</option>
                            </select>
                        </div>

                        <div className='item'>
                            <Link to='comments'>
                                <Button variant="outline-secondary" size='sm' onClick={this.setModalShow}>Show Comments</Button>{' '}
                            </Link>
                        </div>

                        <div className='item'>
                            <Link to='commentForm'>
                                <Button variant="outline-primary" size='sm' onClick={this.setModalShow}>New Comment</Button>{' '}
                            </Link>
                        </div>

                        <div className='item-end'>
                            <Button onClick={(e) => this.delete(issue.issue_id, e)} variant="outline-danger" size='sm'>Delete</Button>
                        </div>

                    </div>

                    <Switch>

                        <Route exact path='/comments'>
                            <Comments issue_id={issue.issue_id} />
                        </Route>

                        <Route exact path='/commentForm'>
                            <CommentForm
                                issue_id={issue.issue_id}
                                show={this.state.modalShow}
                                onHide={() => this.setState({ modalShow: false })} 
                            />
                        </Route>

                    </Switch>
                </Router>
            )
        })
        return (
            <div className='issues'>
                {allIssues.length > 0 ? null :(<h3>No Issues</h3>) }
                {allIssues}
            </div>
        )
    }
}

export default Issues;