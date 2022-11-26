import { createPortal } from 'react-dom';
import styles from './Modal.module.css'


const Backdrop = (props) => {
    return <div className={styles['backdrop']} onClick={props.closeModal}/>
}

const ModalOverlay = (props) => {
    return(
        <div className={styles['modal']}>
            {props.children}
        </div>
    );
}


function Modal(props) {

    
    return (
        <>
            {createPortal(
                <Backdrop closeModal={props.closeModal}/>,
                document.getElementById('backdrop-root')
            )}
            {createPortal(
                <ModalOverlay>
                    {props.children}
                </ModalOverlay>
                ,
                document.getElementById('overlay-root')
            )}
            
        </>
    );
}

export default Modal;