
import React, {Component} from "react";
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from "react-router-dom"

class Header extends Component {
    render() {
        return (
            // <Navbar bg="primary" expand="lg">
            //     <Container>
            //         <Navbar.Brand href="#home">Automated Dining-Hall Management Tool</Navbar.Brand>
            //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
            //         <Navbar.Collapse id="basic-navbar-nav">
            //         <Nav className="me-auto position-relative">
            //             <Nav.Link href="#home">My Schedule</Nav.Link>
            //             <Nav.Link href="#link">Trade Shifts</Nav.Link>
            //         </Nav>
            //         </Navbar.Collapse>
            //     </Container>
            //     </Navbar>
            <div className="navigation">
                <nav className="navbar navbar-expand navbar-primary bg-primary">
                    <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        Automated Dining-Hall Management Tool
                    </NavLink>
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                My Schedule
                                {/* <span className="sr-only">(current)</span> */}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/tradeshift">
                                Trade Shifts
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    </div>
                </nav>
            </div>
    )}
}

export default Header;