import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/">Market Data Center</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/components/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/components/">Items</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/components/">Categories</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/AtamaZack">GitHub</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>            
            </Container>
        </Navbar>
    </div>
  );
}

export default AppNavbar;
