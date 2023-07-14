import Spinner from 'react-bootstrap/Spinner';
import '../Auth.css';

const StatusPoint = (props) => {
    return (
        <>
            {props.status === undefined && <Spinner animation="grow" variant="info" className='login_page__input_validation_loading' />}
            <span className={`login_page__input_validation_point_${props.status ? 'valid' : (props.status === false ? 'invalid' : 'loading')}`}>·</span>
        </>
    )
}

export default StatusPoint;