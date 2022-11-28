import AdminPanel from "./components/AdminPanel/AdminPanel"
import ExchangeRateDisplay from "./components/ExchangeRateDisplay/ExchangeRateDisplay"
import ExchangeRateSelector from "./components/ExchangeRateSelector/ExchangeRateSelector"
import { useSelector } from 'react-redux';
import { useAddCurrencyMutation, useGetCurrenciesQuery, useLazyGetExchangeQuery } from "../../api/currencyApiSlice";
import { useState } from "react";
import AddCurrencyModal from "./components/AddCurrencyModal/AddCurrencyModal";
import AddExchangeModal from "./components/AddExchangeModal/AddExchangeModal";
const Currency = () => {

    const user = useSelector(store => store.user.user);
    const [fromInput, setFromInput] = useState('0');
    const [toInput, setToInput] = useState('0');
    const [exchange, setExchange] = useState(null);
    const [currencyModalOpen, setcurrencyModalOpen] = useState(false);
    const [exchangeModalOpen, setExchangeModalOpen] = useState(false);

    const { data: currencyData, error: currencyError, isLoading: currencyIsLoading } = useGetCurrenciesQuery();
    const [getExchange, { error: exchangeError, isLoading: exchangeIsLoading }] = useLazyGetExchangeQuery();
    const [addCurrency, { isLoading: addCurrencyIsLoading, error: addCurrencyError }] = useAddCurrencyMutation()

    const openCurrencyModal = () => { setcurrencyModalOpen(true); }
    
    const closeCurrencyModal = () => { setcurrencyModalOpen(false); }

    const openExchangeModal = () => { setExchangeModalOpen(true); }

    const closeExchangeModal = () => { setExchangeModalOpen(false); }

    const handleSearchSubmit = async () => {
        try {
            const response = await getExchange({fromId: fromInput, toId: toInput, latest: true});
            setExchange(response.data);
        } catch (error) {
            console.log('error', error)
        }
    }

    const handleSubmitNewCurrency = async (currency) => {
        try {
            console.log('Submitting', currency)
            const response = await addCurrency({name: currency}).unwrap();
            console.log(response)
        } catch (error) {
            console.log('error', error)
        } finally {
            closeCurrencyModal();
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
            {currencyModalOpen && 
            <AddCurrencyModal 
                closeCurrencyModal={closeCurrencyModal}
                handleSubmitNewCurrency={handleSubmitNewCurrency}
            />}
            {exchangeModalOpen && <AddExchangeModal closeExchangeModal={closeExchangeModal}/>}
        </>
    )
}

export default Currency