import '../Auth.css';

const PointsDecorator = (props) => {
    return (
        <div className='point_decorator__container'>
            <button className={`point_decorator__button ${props.msg && 'point_decorator__button_warn'}`} />
            <p className='point_decorator__msg'>{props.msg}</p>
            <button className={`point_decorator__button ${props.msg && 'point_decorator__button_warn'}`} />
        </div>
    )
}

export default PointsDecorator;