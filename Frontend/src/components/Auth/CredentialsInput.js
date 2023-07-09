import Form from 'react-bootstrap/Form';
import './Auth.css';

const CredentialsInput = (props) => {
    return (
        <div className='login_page__inputs_inner_container'>
            <Form.Label className='login_page__input_title'>{props.title}</Form.Label>
            <Form.Control value={props.value || ""} onChange={props.onTyping} name={props.name} size="lg" type={props.type} className='login_page__input_field' />
            {props.isWarn && <Form.Text className='login_page__input_note'>Must not be Null</Form.Text>}
        </div>
    );
}

export default CredentialsInput;