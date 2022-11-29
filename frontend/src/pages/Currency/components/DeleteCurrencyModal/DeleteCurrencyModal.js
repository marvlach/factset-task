import { useState } from "react";
import Button from "../../../../components/UI/Button/Button";
import Modal from "../../../../components/UI/Modal/Modal";
import styles from './DeleteCurrencyModal.module.css';

const DeleteCurrencyModal = ({currencyOptions, closeDeleteCurrencyModal, handleDeleteCurrency}) => {
    const [input, setInput] = useState('0');
     

    const handleFieldChange = (event) => {
        setInput(event.target.value);
    }

    const handleDeleteCurrencySubmit = (event) => {
        event.preventDefault();
        handleDeleteCurrency(input);
        setInput('0')
    }

    const optionsArray = currencyOptions?.map(cur => <option key={cur.id} value={cur.id}>{cur.name}</option>);
    const submitDisabled = input === '0' ;
    
    return(
        <Modal closeModal={closeDeleteCurrencyModal}>
            <form onSubmit={handleDeleteCurrencySubmit}>
                <div className={styles['selector-container']}>
                    <label htmlFor={'toDelete'}> Currency To Delete </label> 
                    <select name="from" id="from" onChange={handleFieldChange} value={input}>
                        {optionsArray}
                    </select>

                    
                </div>
                <div className={styles['modal-button-container2']}>
                    <div className={styles['modal-button-container']}>
                        <Button button={{type: 'button' , onClick: closeDeleteCurrencyModal}} > 
                            Cancel 
                        </Button>
                        <Button button={{type: 'submit', disabled: submitDisabled}} > 
                            Delete Currency
                        </Button>
                    </div>
                </div>

            </form>
        </Modal>
    )
}

export default DeleteCurrencyModal