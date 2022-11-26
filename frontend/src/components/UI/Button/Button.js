import styles from './Button.module.css';

const Button = (props) => {
    const {button, id} = props;
    return (
        <div className={`${styles['button-container']}`}>
            <button {...button} >
                {props.children}
            </button>
        </div>
    );
};

export default Button;