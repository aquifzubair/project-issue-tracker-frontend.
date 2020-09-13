import Axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap'
import Comments from './Comments'
import CommentForm from './CommentForm'

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
            modelShow:false
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


    render() {
        const allIssues = this.state.issues.map(issue => {
            return (
                <Router key={issue.issue_id} >
                    <div className='issue'>
                        <div className='item'>
                            <Link to='/comments'>
                                <p className='it'> {issue.issue_summary}</p>
                            </Link>
                        </div>

                        <div className='item'>
                            <p>{issue.issue_status}</p>

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
                            <Comments issue_id={issue.issue_id}/>
                        </Route>
                        <Route exact path='/commentForm'>
                            <CommentForm 
                            issue_id={issue.issue_id}
                            show={this.state.modalShow}
                            onHide={() => this.setState({ modalShow: false })}/>
                        </Route>
                    </Switch>
                </Router>
            )
        })
        return (
            <div className='issues'>
                <h3>issues in {this.props.project_name}</h3>

                {allIssues}
            </div>
        )
    }
}

export default Issues;