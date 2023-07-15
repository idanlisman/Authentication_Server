import { useState } from 'react';
import LoginPage from '../Auth/LoginPage';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
  const [isLoginScreen, setIsLoginScreen] = useState(false);

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link onClick={() => { setIsLoginScreen(isLoginScreen ? false : true) }}>Login</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isLoginScreen && <LoginPage />}
    </>
  );
}

export default NavigationBar;