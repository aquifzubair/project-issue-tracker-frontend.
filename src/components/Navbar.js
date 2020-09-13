import React from 'react';
import Project from './Projects'
import ProjectForm from './ProjectForm'
import {Button} from 'react-bootstrap'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";




class Navbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
        }
    }

    setModalShow = () => {
        this.setState({
            modalShow: true
        })
    }

    render() {
        return (
            <Router>
                <div className='navbar'>

                    <Link to='/project'>
                        <div>
                            <Button onClick={this.handleClick} variant="primary" size='sm'>All Projects                            </Button>
                        </div>
                    </Link>

                        <div><Button variant="primary" size='sm' onClick={this.setModalShow}>New Project</Button></div>
                    <ProjectForm
                        show={this.state.modalShow}
                        onHide={() => this.setState({ modalShow: false })} />
                </div>

                <Switch>
                    <Route exact path = '/project'>
                        <Project />
                    </Route>
                </Switch>

            </Router>



        )
    }
}
export default Navbar;