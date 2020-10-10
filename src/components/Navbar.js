import React from 'react';
import { Button } from 'react-bootstrap'

import { Link } from "react-router-dom";
import ProjectForm from './ProjectForm';

class Navbar extends React.Component {

    constructor(props) {
        super(props)
        console.log(props, 'navvar ============')
        this.state = {
            modalShow: false,
        }
    }

    setModalShow = () => {
        this.setState({
            modalShow: true
        })
    }

    logout = () => {
        localStorage.clear();
        this.props.handleLoggedIn()
    }

    render() {

        const signedNavbar = <div className='navbar'>

            <Link to='/projects'>
                <div>
                    <Button onClick={this.handleClick} variant="primary" size='sm'>All Projects</Button>
                </div>
            </Link>

            <Link to='/'>
                <div>
                    <Button onClick={this.handleClick} variant="primary" size='sm'>All Issues</Button>
                </div>
            </Link>

            <div>
                <Button variant="primary" size='sm' onClick={this.setModalShow}>New Project</Button>
            </div>
            <div>
                <Button variant="danger" size='sm' onClick={this.logout}>Logout</Button>
            </div>

            <ProjectForm
                show={this.state.modalShow}
                onHide={() => this.setState({ modalShow: false })}
            />
            </div>

        const unsignedNavar = <div className='navbar'>
        <Link to='/signup'>
            <div>
                <Button onClick={this.handleClick} variant="primary" size='sm'>Sign Up</Button>
            </div>
        </Link>

        <Link to='login/'>
            <div>
                <Button variant="primary" size='sm'>Log In</Button>
            </div>
        </Link>
        </div>

        return (
            <div>
            {this.props.token ?  signedNavbar :  unsignedNavar }
                
            </div>
        )

}
}
export default Navbar;