import AdminPanel from "./components/AdminPanel/AdminPanel"
import ExchangeRateDisplay from "./components/ExchangeRateDisplay/ExchangeRateDisplay"
import ExchangeRateSelector from "./components/ExchangeRateSelector/ExchangeRateSelector"
import { useSelector } from 'react-redux';
import { useGetCurrenciesQuery, useLazyGetExchangeQuery } from "../../api/currencyApiSlice";
import { useState } from "react";
import AddCurrencyModal from "./components/AddCurrencyModal/AddCurrencyModal";
import AddExchangeModal from "./components/AddExchangeModal/AddExchangeModal";
const Currency = () => {

    const user = useSelector(store => store.user.user);
    const [fromInput, setFromInput] = useState('0');
    const [toInput, setToInput] = useState('0');
    const [exchange, setExchange] = useState({});
    const [currencyModalOpen, setcurrencyModalOpen] = useState(false);
    const [exchangeModalOpen, setExchangeModalOpen] = useState(false);

    const { data: currencyData, error: currencyError, isLoading: currencyIsLoading } = useGetCurrenciesQuery();
    const [getExchange, { error: exchangeError, isLoading: exchangeIsLoading }] = useLazyGetExchangeQuery();
    

    const openCurrencyModal = () => { setcurrencyModalOpen(true); }
    
    const closeCurrencyModal = () => { setcurrencyModalOpen(false); }

    const openExchangeModal = () => { setExchangeModalOpen(true); }

    const closeExchangeModal = () => { setExchangeModalOpen(false); }


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

    
    return (
        <>
            {user.isAdmin && <AdminPanel openCurrencyModal={openCurrencyModal} openExchangeModal={openExchangeModal}/>}
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
            {currencyModalOpen && <AddCurrencyModal closeCurrencyModal={closeCurrencyModal}/>}
            {exchangeModalOpen && <AddExchangeModal closeExchangeModal={closeExchangeModal}/>}
        </>
    )
}

export default Currency