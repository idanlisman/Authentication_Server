import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LoginPageStateContext } from '../Auth/LoginPageStateContext';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const NavigationBar = () => {

  const navigate = useNavigate();
  const path = useLocation();

  const [isLoginPage, setIsLoginPage] = useContext(LoginPageStateContext);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const setLoginScreenActivityState = () => setIsLoginPage({ ...isLoginPage, isScreenActive: !isLoginPage.isScreenActive });

  function onUserSignOutHandler() {
    cookies.remove('token');
    setIsTokenValid(false);
    navigate('/');
  }

  useEffect(() => {
    cookies.get('token') && setIsTokenValid(true);
  }, [path])

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">

            {isTokenValid
              ? <Button variant="secondary"><Nav.Link onClick={onUserSignOutHandler}>Sign Out</Nav.Link></Button>
              : <Button variant="info"><Nav.Link onClick={setLoginScreenActivityState}>Sign In</Nav.Link></Button>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavigationBar;