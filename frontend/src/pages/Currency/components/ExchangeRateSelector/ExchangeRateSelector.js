import Button from '../../../../components/UI/Button/Button.js';
import Card from '../../../../components/UI/Card/Card.js'
import styles from './ExchangeRateSelector.module.css';

const ExchangeRateSelector = ({ currency, fromInput, setFromInput, toInput, setToInput, handleSubmit }) => {

    const handleFieldChange = (event) => {
        console.log(event.target.getAttribute('id'), event.target.value)
        if (event.target.getAttribute('id') === 'from') {
            setFromInput(event.target.value);
        } else {
            setToInput(event.target.value);
        }
    }

    const handleSearchExchange = (event) => {
        event.preventDefault();
        handleSubmit();
    }
    
    const optionsArray = currency?.map(cur => <option key={cur.id} value={cur.id}>{cur.name}</option>);
    const submitDisabled = fromInput === '0' ||  toInput === '0';
    return (
        <>
        <Card className={styles['card']}>
            <form onSubmit={handleSearchExchange}>
                <label> From </label>
                <select name="from" id="from" onChange={handleFieldChange} value={fromInput}>
                    {optionsArray}
                </select>

                <label> To </label>
                <select name="to" id="to" onChange={handleFieldChange} value={toInput}>
                    {optionsArray}
                </select>
                <Button 
                    button={{
                        type: 'submit',
                        disabled: submitDisabled
                    }}
                > 
                    Find Exchange Rate
                </Button>

            </form>
        </Card>
        </>
    )
}

export default ExchangeRateSelector