import Axios from 'axios';
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
        Axios.get(`http://localhost:3001/issues/${this.props.project_id}`)
            .then(data => data.data)
            .then(data => this.setState({ issues: data }))
    }

    delete = (id, e) => {
        const confirmation = window.confirm('Do you wanna delete this issue');
        if (confirmation) {
            Axios({
                method: 'delete',
                url: `http://localhost:3001/projects/issues/${id}`,
            })
                .then(response => console.log(response))
                .catch(err => console.error(err))

            const filterIssue = this.state.issues.filter(issue => issue.issue_id !== id)
            this.setState({ issues: filterIssue })
        }

    }

    renderTooltip = (props, createdBy, description, assignedTo) => (
        <Tooltip id="button-tooltip" {...props}>
            <b>Created By:-</b> {createdBy} <br></br>
            <b>Assigned To:-</b> {assignedTo} <br></br>
            <b>description:-</b> {description}
        </Tooltip>
    );

    handleChange = (id,e) => {
        Axios({
            method:'put',
            url:`http://localhost:3001/issues/status/${id}`,
            data:{status:e.target.value}
        })
        .then(response => console.log(response))
        .catch(err => console.error(err))

        this.setState({
            statusUpdate:true
        })
    } 


    render() {
        const allIssues = this.state.issues.map(issue => {
            return (
                <Router key={issue.issue_id} >

                    <div className='issue'>

                        <div className='item'>
                            <Link to='/comments'>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip(this.props, issue.identified_by, issue.issue_description, issue.assigned_to)}
                                >
                                    <p>{issue.issue_summary}</p>
                                </OverlayTrigger>
                            </Link>
                        </div>

                        <div className='item'>
                            <select onChange={(e) => this.handleChange(issue.issue_id, e)} required >
                                <option value={issue.issue_status}>{issue.issue_status}</option>
                                <option value={issue.issue_status === 'close'? 'active' : 'close'}>{issue.issue_status === 'close'? 'active' : 'close'}</option>
                                <option value={issue.issue_status === 'progress'? 'active' : 'progress'}>{issue.issue_status === 'progress'? 'active' : 'progress'}</option>
                            </select>
                        </div>

                        <div className='item'>
                            <p>{issue.issue_date.slice(0, 10)}</p>
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
                                onHide={() => this.setState({ modalShow: false })} />
                        </Route>

                    </Switch>
                </Router>
            )
        })
        return (
            <div className='issues'>
                <h5>Issues in {this.props.project_name}</h5>
                <hr></hr>
                {allIssues}
            </div>
        )
    }
}

export default Issues;