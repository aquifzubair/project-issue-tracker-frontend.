import React from 'react';
import { Button } from 'react-bootstrap'

import { Link } from "react-router-dom";
import ProjectForm from './ProjectForm';

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

            <div className='navbar'>

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

                <ProjectForm
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                />

            </div>


        )
    }
}
export default Navbar;