import Modal from '../../../../components/UI/Modal/Modal.js'
import Input from '../../../../components/UI/Input/Input.js'
import { useRef, useState } from 'react'
import styles from './AddExchangeModal.module.css';
import Button from '../../../../components/UI/Button/Button.js';

const AddExchangeModal = ({ closeExchangeModal }) => {
    /* const currencyInputRef = useRef();
    const [currencyInput, setCurrencyInput] = useState('');

    const handleFieldChange = (e) => {
        setCurrencyInput(e.target.value);
    } */
    
    // const formIsValid = currencyInput.trim() !== '';

    return(
        <Modal closeModal={closeExchangeModal}>
            {/* <div className={styles['modal-card']}>
            <form onSubmit={handleSearchExchange}>
                <div className={styles['selector-container']}>
                    <label htmlFor={'from'}> From </label> 
                    <select name="from" id="from" onChange={handleFieldChange} value={fromInput}>
                        {optionsArray}
                    </select>

                    <label htmlFor={'to'}> To </label>
                    <select name="to" id="to" onChange={handleFieldChange} value={toInput}>
                        {optionsArray}
                    </select>
                </div>
                <Button 
                    button={{
                        type: 'submit',
                        disabled: submitDisabled
                    }}
                > 
                    Display Exchange Rate
                </Button>

            </form>
            </div> */}
            hello
        </Modal>
    )
}

export default AddExchangeModal