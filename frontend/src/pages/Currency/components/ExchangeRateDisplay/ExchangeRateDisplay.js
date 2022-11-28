import Button from '../../../../components/UI/Button/Button';
import Card from '../../../../components/UI/Card/Card';
import styles from './ExchangeRateDisplay.module.css';

/* 
@   exchange = {
@      comboKey 
@       from 
@       fromId 
@       id 
@       rate 
@       to 
@       toId 
@       updatedAt
@   }
*/
const ExchangeRateDisplay = ({ exchange }) => {
    return (<>
        {exchange?.rate && 
        <Card className={styles['card']}>
            <span>{exchange?.from} {`->`} {exchange?.to}</span>
            
            
            <span className={styles['rate']} >{Number.parseFloat(exchange?.rate).toFixed(4)}</span>
            <Button className={styles['history-button']}> Show history </Button>
        </Card>}
    </>)
}

export default ExchangeRateDisplay