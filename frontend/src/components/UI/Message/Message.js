import { useState } from "react";
import Card from "../Card/Card"
import styles from './Message.module.css';
const Message = (props) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        console.log('close mf')
        setOpen(false);
    }

    const style = props.type === 'error' ? 'error-message' : 'success-message';
    return(
        <>
        {open && <Card className={`${styles[style]} ${styles['message-container']}`}>
            {props.message}
            <button className={styles['little-X']} onClick={handleClose}>X</button>
        </Card>}
        </>
    )
}

export default Message