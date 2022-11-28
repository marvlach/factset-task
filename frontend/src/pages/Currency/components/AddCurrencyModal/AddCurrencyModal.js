import Modal from '../../../../components/UI/Modal/Modal.js'
import Input from '../../../../components/UI/Input/Input.js'
import { useRef, useState } from 'react'
import styles from './AddCurrencyModal.module.css';
import Button from '../../../../components/UI/Button/Button.js';
const AddCurrencyModal = ({ closeCurrencyModal, handleSubmitNewCurrency }) => {
    const currencyInputRef = useRef();
    const [currencyInput, setCurrencyInput] = useState('');

    const handleFieldChange = (e) => {
        setCurrencyInput(e.target.value);
    }

    const handleNewCurrencySubmit = (event) => {
        event.preventDefault();
        handleSubmitNewCurrency(currencyInput);
    }
    
    const formIsValid = currencyInput.trim() !== '';

    return(
        <Modal closeModal={closeCurrencyModal}>
            <div className={styles['modal-card']}>
            <form onSubmit={handleNewCurrencySubmit}>
                <Input 
                    input = {{
                        className: styles['form-field'],
                        type: 'text',
                        id: 'currency',
                        value: currencyInput,
                        onChange: handleFieldChange
                    }}
                    label={'Currency Name'}
                    id={'currency'}
                    ref={currencyInputRef}
                />
                <div className={styles['modal-button-container2']}>
                    <div className={styles['modal-button-container']}>
                        <Button button={{type: 'button' , onClick: closeCurrencyModal}} > 
                            Cancel 
                        </Button>
                        <Button button={{type: 'submit', disabled: !formIsValid}} > 
                            Add Currency 
                        </Button>
                    </div>
                </div>
            </form>
            </div>
        </Modal>
    )
}

export default AddCurrencyModal