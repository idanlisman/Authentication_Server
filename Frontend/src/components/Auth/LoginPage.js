import Button from 'react-bootstrap/Button';
import './Auth.css';
import { useState } from 'react';
import PointsDecorator from './PointsDecorator';
import CredentialsInput from './CredentialsInput';

const LoginPage = () => {

    const [isSignUp, setIsSignUp] = useState(false);
    const [credentials, setCredentials] = useState({});

    const onSignUpClickHandler = () => setIsSignUp(true);
    const onBackClickHandler = () => setIsSignUp(false);
    const onTyping = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    }
    const onSubmitSignUp = () => { };

    function validateFieldsNotNull(isSignUp) {
        return Object.values.every()
    }

    return (
        <div className='login_page__container'>
            <PointsDecorator />
            <div className='login_page__inputs_container'>
                <CredentialsInput onTyping={onTyping} title='Username' name='username' value={credentials.username} type='text' />
                <CredentialsInput onTyping={onTyping} title='Password' name='password' value={credentials.password} type='password' />
                {isSignUp && <CredentialsInput onTyping={onTyping} title='Validate Password' name='validatedPassword' value={credentials.validatedPassword} type='password' />}
            </div>
            <div className='login_page__buttons_container'>
                {
                    isSignUp ?
                        <>
                            <Button onClick={onBackClickHandler} variant="secondary" className='login_page__button'>{'⇤ Log In'}</Button>
                            <Button onClick={onSubmitSignUp} variant="outline-dark" className='login_page__button'>Sign Up</Button>
                        </> :
                        <>
                            <Button variant="outline-dark" className='login_page__button'>Log In</Button>
                            <br />
                            <Button onClick={onSignUpClickHandler} variant="secondary" className='login_page__button'>{'Sign Up ⇥'}</Button>
                        </>
                }
            </div>
            <PointsDecorator />
        </div>
    );
}

export default LoginPage;