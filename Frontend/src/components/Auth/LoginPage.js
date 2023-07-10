import Button from 'react-bootstrap/Button';
import './Auth.css';
import { useState } from 'react';
import PointsDecorator from './PointsDecorator';
import CredentialsInput from './CredentialsInput';

const LoginPage = () => {

    const [isSignUp, setIsSignUp] = useState(false);
    const [credentials, setCredentials] = useState({});
    const [isFieldWarn, setIsFieldWarn] = useState({});

    const onSignUpClickHandler = () => setIsSignUp(true);
    const onBackClickHandler = () => setIsSignUp(false);
    const onTyping = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    }
    const onSubmitSignUp = () => {
        validateFieldsNotNull(true);
    };
    const setInvalidFieldWarn = (name, warn) => setIsFieldWarn(isFieldWarn => ({ ...isFieldWarn, [name]: warn }));

    function validateFieldsNotNull(isSignUp) {
        const { username, password, validatedPassword } = credentials;

        if (!username || username === '') {
            setInvalidFieldWarn('username', true);
        } else {
            setInvalidFieldWarn('username', false);
        }
        if (!password || password === '') {
            setInvalidFieldWarn('password', true);
        } else {
            setInvalidFieldWarn('password', false);
        }
        if (isSignUp && (!validatedPassword || validatedPassword === '')) {
            setInvalidFieldWarn('validatedPassword', true);
        } else {
            setInvalidFieldWarn('validatedPassword', false);
        }
    }

    return (
        <div className='login_page__container'>
            <PointsDecorator />
            <div className='login_page__inputs_container'>
                <CredentialsInput onTyping={onTyping} title='Username' name='username' value={credentials.username} isWarn={isFieldWarn.username} type='text' />
                <CredentialsInput onTyping={onTyping} title='Password' name='password' value={credentials.password} isWarn={isFieldWarn.password} type='password' />
                {isSignUp && <CredentialsInput onTyping={onTyping} title='Validate Password' name='validatedPassword' value={credentials.validatedPassword} isWarn={isFieldWarn.validatedPassword} type='password' />}
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