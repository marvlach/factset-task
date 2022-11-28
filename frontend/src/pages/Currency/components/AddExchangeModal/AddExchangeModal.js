import Modal from '../../../../components/UI/Modal/Modal.js'
import Input from '../../../../components/UI/Input/Input.js'
import { useRef, useState } from 'react'
import styles from './AddExchangeModal.module.css';
import Button from '../../../../components/UI/Button/Button.js';

const AddExchangeModal = ({ currencyOptions, closeExchangeModal, handleSubmitNewExchange }) => {
    const [fromInput, setFromInput] = useState('0');
    const [toInput, setToInput] = useState('0');
    const [exchange, setExchange] = useState('');  

    const handleFieldChange = (event) => {
        if (event.target.getAttribute('id') === 'from') {
            setFromInput(event.target.value);
            return
        } 
        
        if (event.target.getAttribute('id') === 'to') {
            setToInput(event.target.value);
            return
        } 

        if (event.target.getAttribute('id') === 'exchangeValue') {
            setExchange(event.target.value);
            return
        } 
    }

    const handleNewExchangeSubmit = (event) => {
        event.preventDefault();
        handleSubmitNewExchange({ from: fromInput, to: toInput , newRate: exchange });
    }

    const optionsArray = currencyOptions?.map(cur => <option key={cur.id} value={cur.id}>{cur.name}</option>);
    const submitDisabled = fromInput === '0' ||  toInput === '0' || exchange.trim() === '';
    
    return(
        <Modal closeModal={closeExchangeModal}>
            <form onSubmit={handleNewExchangeSubmit}>
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
                <Input 
                    input = {{
                        className: styles['form-field'],
                        type: 'number',
                        id: 'exchangeValue',
                        value: exchange,
                        onChange: handleFieldChange
                    }}
                    label={'New Exchange Value'}
                    id={'exchangeValue'}
                    
                />
                <div className={styles['modal-button-container2']}>
                    <div className={styles['modal-button-container']}>
                        <Button button={{type: 'button' , onClick: closeExchangeModal}} > 
                            Cancel 
                        </Button>
                        <Button button={{type: 'submit', disabled: submitDisabled}} > 
                            Add Exchange 
                        </Button>
                    </div>
                </div>

            </form>
        </Modal>
    )
}

export default AddExchangeModal