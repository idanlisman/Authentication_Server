import Button from 'react-bootstrap/Button';
import './Auth.css';
import { useState } from 'react';
import PointsDecorator from './PointsDecorator';
import CredentialsInput from './CredentialsInput';
import axios from 'axios';

const USERNAME_ID = 'username';
const PASSWORD_ID = 'password';
const PASSWORD_VALIDATE_ID = 'validatedPassword';

const LoginPage = () => {

    const [isSignUp, setIsSignUp] = useState(false);
    const [credentials, setCredentials] = useState({});
    const [isFieldWarn, setIsFieldWarn] = useState({});

    const setInvalidFieldWarn = (name, warn) => setIsFieldWarn(isFieldWarn => ({ ...isFieldWarn, [name]: warn }));
    const onSignUpClickHandler = () => setIsSignUp(true);
    const onBackClickHandler = () => setIsSignUp(false);
    const onTyping = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });

        setIsFieldWarn({});
    }

    const onSubmitSignUp = async () => {
        const isFieldsNotNull = validateFieldsNotNull();
        const isPasswordValid = validatePassword();
        if (isFieldsNotNull && isPasswordValid) {
            axios.post('http://localhost:3002/v1/auth/signup', credentials)
                .then(() => {
                    setCredentials({});
                })
        }
    };

    const onSubmitLogIn = () => {
        const isFieldsNotNull = validateFieldsNotNull();
    };

    function validatePassword() {
        if (credentials[PASSWORD_ID] !== credentials[PASSWORD_VALIDATE_ID]) {
            setInvalidFieldWarn(PASSWORD_VALIDATE_ID, true);
            return false;
        }

        return true;
    }

    function validateFieldsNotNull() {
        let isFieldsValid = true;
        const fieldsName = [USERNAME_ID, PASSWORD_ID, PASSWORD_VALIDATE_ID];

        fieldsName.map(field => {
            if (!(field in credentials)) {
                isFieldsValid = false;
                setInvalidFieldWarn(field, true);
            }
        });

        Object.keys(credentials).map(field => {
            if (credentials[field] === '') {
                setInvalidFieldWarn(field, true);
            } else {
                setInvalidFieldWarn(field, false);
            }
        })

        return isFieldsValid;
    }

    return (
        <div className='login_page__container'>
            <PointsDecorator />
            <div className='login_page__inputs_container'>
                <CredentialsInput onTyping={onTyping} title='Username' name={USERNAME_ID} value={credentials[USERNAME_ID]} isWarn={isFieldWarn[USERNAME_ID]} type='text' />
                <CredentialsInput onTyping={onTyping} title='Password' name={PASSWORD_ID} value={credentials[PASSWORD_ID]} isWarn={isFieldWarn[PASSWORD_ID]} type='password' />
                {isSignUp && <CredentialsInput onTyping={onTyping} title='Validate Password' name={PASSWORD_VALIDATE_ID} value={credentials[PASSWORD_VALIDATE_ID]} isWarn={isFieldWarn[PASSWORD_VALIDATE_ID]} type='password' />}
            </div>
            <div className='login_page__buttons_container'>
                {
                    isSignUp ?
                        <>
                            <Button onClick={onBackClickHandler} variant="secondary" className='login_page__button'>{'⇤ Log In'}</Button>
                            <Button onClick={onSubmitSignUp} variant="outline-dark" className='login_page__button'>Sign Up</Button>
                        </> :
                        <>
                            <Button onClick={onSubmitLogIn} variant="outline-dark" className='login_page__button'>Log In</Button>
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