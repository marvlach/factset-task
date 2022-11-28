import AdminPanel from "./components/AdminPanel/AdminPanel"
import ExchangeRateDisplay from "./components/ExchangeRateDisplay/ExchangeRateDisplay"
import ExchangeRateSelector from "./components/ExchangeRateSelector/ExchangeRateSelector"
import { useSelector } from 'react-redux';
import { useGetCurrenciesQuery, useLazyGetExchangeQuery } from "../../api/currencyApiSlice";
import { useState } from "react";
const Currency = () => {

    const user = useSelector(store => store.user.user);
    const [fromInput, setFromInput] = useState('0');
    const [toInput, setToInput] = useState('0');
    const [exchange, setExchange] = useState({});
    const { data: currencyData, error: currencyError, isLoading: currencyIsLoading } = useGetCurrenciesQuery();
    const [getExchange, { error: exchangeError, isLoading: exchangeIsLoading }] = useLazyGetExchangeQuery();
    
    const handleSearchSubmit = async () => {
        try {
            const response = await getExchange({fromId: fromInput, toId: toInput, latest: true});
            console.log(response.data[0]);
            setExchange(response.data[0]);
        } catch (error) {
            console.log('error', error)
        }
    }

    const currencyOptions =  !currencyError && !currencyIsLoading ? [{id:0, name: '-'}, ...currencyData] : [];
    const exchangeDisplay = !exchangeError && !exchangeIsLoading ? exchange : {};
    console.log(fromInput, toInput)
    return (
        <>
            {user.isAdmin && <AdminPanel />}
            <ExchangeRateSelector 
                currency={currencyOptions} 
                fromInput={fromInput} 
                setFromInput={setFromInput}
                toInput={toInput}
                setToInput={setToInput}
                handleSubmit={handleSearchSubmit}
            />
            <ExchangeRateDisplay 
                exchange={exchangeDisplay}
            />
        </>
    )
}

export default Currency