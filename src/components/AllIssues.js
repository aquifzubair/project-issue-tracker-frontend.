import axios from './../utils/API';
import React from 'react';
import { Button } from 'react-bootstrap';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from "react-router-dom";

class AllIssues extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            issues: [],
            statusUpdate:false
        }
    }


    componentDidMount() {
        axios.get(`/issues`)
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

    // renderTooltip = (props, createdBy, assignedTo,createdOn) => (
    //     <Tooltip id="button-tooltip" {...props}>
    //         <b>Created By:-</b> {createdBy} <br></br>
    //         <b>Created On:-</b> {createdOn} <br></br>
    //         <b>Assigned To:-</b> {assignedTo} <br></br>
    //     </Tooltip>
    // );

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
            axios.get(`/issues`)
            .then(data => data.data)
            .then(data => this.setState({
                 issues: data,
                 statusUpdate:!this.state.statusUpdate
            }))
            .catch(err => console.error(err))
        }
    }


    render() {
        const allIssues = this.state.issues.map(issue => {
            return (

                    <div className='issue' key={issue.issue_id}>

                        <div className='item'>
                                {/* <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip(this.props, issue.identified_by, issue.assigned_to, issue.issue_date.slice(0,10))}
                                > */}
                                    <Link to={`/comments/${issue.issue_id}`}>
                                        <p className='text-bold'>{issue.issue_summary}</p>
                                    </Link>

                                {/* </OverlayTrigger> */}
                        </div>

                        <div className='item item2'>
                            <p>{issue.issue_description}</p>
                        </div>

                        <div className='item edit'>
                            <select onChange={(e) => this.handleChange(issue.issue_id, e)} required >
                                <option value={issue.issue_status}>{issue.issue_status}</option>
                                <option value={issue.issue_status === 'close'? 'active' : 'close'}>{issue.issue_status === 'close'? 'active' : 'close'}</option>
                                <option value={issue.issue_status === 'progress'? 'active' : 'progress'}>{issue.issue_status === 'progress'? 'active' : 'progress'}</option>
                            </select>
                        </div>                        

                        <div className='item-end'>
                            <Button onClick={(e) => this.delete(issue.issue_id, e)} variant="outline-danger" size='sm'>Delete</Button>
                        </div>

                    </div>
            )
        })

        return (
            <div className='issues'>                
                {allIssues}
            </div>
        )
    }
}

export default AllIssues;