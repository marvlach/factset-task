import { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef((props, ref) => {    
    const {input, label, id, error} = props

    const inputRef = useRef();

    const focus = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(ref, () => {
        return {
            focus: focus
        }
    })

    return (
        <div className={`${styles['input']}`}>
            <label htmlFor={id}>{label}</label>
            <input 
                {...input}
                ref={inputRef}
            />
            <span className={styles['error-message']}>{error ? error : ''}</span>
        </div>
    ) ;

});

export default Input;