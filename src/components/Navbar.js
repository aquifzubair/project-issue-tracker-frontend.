import React from 'react';
import Project from './Projects'
import ProjectForm from './ProjectForm'

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

                    <Link to='project'>
                        <div>
                            <button onClick={this.handleClick} className='btn btn-primary'>All Projects                            </button>
                        </div>
                    </Link>

                        <div><button className='btn btn-primary' onClick={this.setModalShow}>New Project</button></div>
                    <ProjectForm
                        show={this.state.modalShow}
                        onHide={() => this.setState({ modalShow: false })} />
                </div>

                <Switch>
                    <Route path = '/project'>
                        <Project />
                    </Route>
                </Switch>

            </Router>



        )
    }
}
export default Navbar;