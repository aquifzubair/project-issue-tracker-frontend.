import Axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap'
import Comments from './Comments'

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
            issues: []
        }
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
        console.log(this.state.issues)
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

                        <div className='item-end'>
                            <Button onClick={(e) => this.delete(issue.issue_id, e)} variant="outline-danger" size='sm'>Delete</Button>

                        </div>
                    </div>

                    <Switch>
                        <Route path='/comments'>
                            <Comments />
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