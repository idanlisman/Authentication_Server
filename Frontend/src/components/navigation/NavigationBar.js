import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UsernameContext } from '../Auth/UsernameContext';

const NavigationBar = () => {

  const [username] = useContext(UsernameContext);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          {
            username
              ? <Navbar.Text>Wellcome <a href={username}>{username}</a></Navbar.Text>
              : <Nav.Link href="#login">Login</Nav.Link>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;