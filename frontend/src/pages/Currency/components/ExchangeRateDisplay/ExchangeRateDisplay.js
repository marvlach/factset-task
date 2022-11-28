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
    return (
        <Card className={styles['card']}>
            {exchange?.rate}
        </Card>
    )
}

export default ExchangeRateDisplay