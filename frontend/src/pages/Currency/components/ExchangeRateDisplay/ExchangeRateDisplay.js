import { useState } from 'react';
import Button from '../../../../components/UI/Button/Button';
import Card from '../../../../components/UI/Card/Card';
import ExchangeHistory from '../ExchangeHistory/ExchangeHistory';
import styles from './ExchangeRateDisplay.module.css';

/* 
@   exchange = [{
@      comboKey 
@       from 
@       fromId 
@       id 
@       rate 
@       to 
@       toId 
@       updatedAt
@   }]
*/
const ExchangeRateDisplay = ({ exchange, handleExchangeSearchSubmit }) => {


    return (
        <>{exchange !== undefined && 
        <Card className={styles['card']}>
            <>
                {exchange?.length === 0 ? 
                    <>No data available</> : 
                    <>
                        <span>{exchange[0]?.from} {`->`} {exchange[0]?.to}</span> 
                        <span className={styles['rate']} >{Number.parseFloat(exchange[0]?.rate).toFixed(4)}</span>
                        
                        <ExchangeHistory exchange={exchange}/>
                    </> 
                }
            </>
        </Card> 
        }</>
    )
}

export default ExchangeRateDisplay