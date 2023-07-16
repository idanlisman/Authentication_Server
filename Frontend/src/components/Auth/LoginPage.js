import Button from 'react-bootstrap/Button';
import './Auth.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { LoginPageStateContext } from './LoginPageStateContext';
import PointsDecorator from './layouts/PointsDecorator';
import CredentialsInput from './CredentialsInput';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const USERNAME_ID = 'username';
const PASSWORD_ID = 'password';
const PASSWORD_VALIDATE_ID = 'validatedPassword';

const LoginPage = () => {

    const usernameEvaluation = useRef();
    const navigate = useNavigate();
    const [isLoginPage, setIsLoginPage] = useContext(LoginPageStateContext);

    const [isSignUp, setIsSignUp] = useState(false);
    const [credentials, setCredentials] = useState({});
    const [isFieldWarn, setIsFieldWarn] = useState({});
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [submitFailureMsg, setSubmitFailureMsg] = useState();

    useEffect(() => {
        setSubmitFailureMsg();
    }, [isSignUp])

    const setInvalidFieldWarn = (name, warn) => setIsFieldWarn(isFieldWarn => ({ ...isFieldWarn, [name]: warn }));
    const setTokenCookie = (token) => cookies.set('token', token, { paht: '/' });
    const setLoginScreenActivityStateOff = () => setIsLoginPage({ ...isLoginPage, isScreenActive: false });
    const setUserConnected = () => setIsLoginPage({ ...isLoginPage, isUserConnected: true });

    const onSignUpClickHandler = () => setIsSignUp(true);
    const onBackClickHandler = () => setIsSignUp(false);

    const onTyping = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
        setIsFieldWarn({});

        if (name === 'username') {
            setIsUsernameValid();
            clearTimeout(usernameEvaluation.current);
            usernameEvaluation.current = setTimeout(async () => { await validateUsername(value) }, 500);
        }
    }

    const onSubmitSignUp = async () => {
        const isFieldsNotNull = validateFieldsNotNull(true);
        const isPasswordValid = validatePassword();
        if (isFieldsNotNull && isPasswordValid) {
            axios.post('http://localhost:3002/v1/auth/signup', credentials)
                .then(() => {
                    setCredentials({});
                    setIsSignUp(false);
                    setSubmitFailureMsg();
                })
                .catch(err => {
                    if (err.response?.status === 400) {
                        setSubmitFailureMsg('Username Already Exists');
                    } else {
                        setSubmitFailureMsg('Internal Error - Request Failed');
                    }
                })
                .finally(() => { setIsUsernameValid(false); })
        }
    };

    const onSubmitLogIn = () => {
        const isFieldsNotNull = validateFieldsNotNull(false);
        if (isFieldsNotNull) {
            axios.post('http://localhost:3002/v1/auth/login', credentials)
                .then(res => {
                    setTokenCookie(res.data.token);
                    navigate(credentials.username);
                    setLoginScreenActivityStateOff();
                })
                .catch(err => {
                    if (err.response?.status === 403) {
                        setSubmitFailureMsg('Wrong Username or Password');
                    } else {
                        setSubmitFailureMsg('Internal Error - Request Failed');
                    }
                })
        }
    };

    async function validateUsername(username) {
        axios.post('http://localhost:3002/v1/auth/validate', { username })
            .then(() => { setIsUsernameValid(true) })
            .catch(() => { setIsUsernameValid(false) })
    }

    function validatePassword() {
        if (credentials[PASSWORD_ID] !== credentials[PASSWORD_VALIDATE_ID]) {
            setInvalidFieldWarn(PASSWORD_VALIDATE_ID, true);
            return false;
        }

        return true;
    }

    function validateFieldsNotNull(isSignUp) {
        let isFieldsValid = true;
        const fieldsName = [USERNAME_ID, PASSWORD_ID];
        if (isSignUp) {
            fieldsName.push(PASSWORD_VALIDATE_ID);
        } else {
            delete credentials[PASSWORD_VALIDATE_ID];
        }

        fieldsName.map(field => {
            if (!(field in credentials)) {
                isFieldsValid = false;
                setInvalidFieldWarn(field, true);
            }
        });

        Object.keys(credentials).map(field => {
            if (credentials[field] === '') {
                isFieldsValid = false;
                setInvalidFieldWarn(field, true);
            } else {
                setInvalidFieldWarn(field, false);
            }
        })

        return isFieldsValid;
    }

    return (
        <>
            <div className='login_page__background' onClick={setLoginScreenActivityStateOff} />
            <div className='login_page__container'>
                <PointsDecorator msg={submitFailureMsg} />
                <div className='login_page__inputs_container'>
                    <div>
                        <CredentialsInput onTyping={onTyping} title='Username' name={USERNAME_ID} value={credentials[USERNAME_ID]} isWarn={isFieldWarn[USERNAME_ID]} presetValidationStatus={isSignUp} status={isUsernameValid} setFocus={true} type='text' />
                    </div>
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
        </>
    );
}

export default LoginPage;