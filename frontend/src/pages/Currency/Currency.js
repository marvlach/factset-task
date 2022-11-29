import AdminPanel from "./components/AdminPanel/AdminPanel"
import ExchangeRateDisplay from "./components/ExchangeRateDisplay/ExchangeRateDisplay"
import ExchangeRateSelector from "./components/ExchangeRateSelector/ExchangeRateSelector"
import { useSelector } from 'react-redux';
import { useAddCurrencyMutation, useAddExchangeMutation, useDeleteCurrencyMutation, useGetCurrenciesQuery, useLazyGetExchangeQuery } from "../../api/currencyApiSlice";
import { useState } from "react";
import AddCurrencyModal from "./components/AddCurrencyModal/AddCurrencyModal";
import AddExchangeModal from "./components/AddExchangeModal/AddExchangeModal";
import DeleteCurrencyModal from "./components/DeleteCurrencyModal/DeleteCurrencyModal";
import Spinner from "../../components/UI/Spinner/Spinner";
import Message from "../../components/UI/Message/Message";

const Currency = () => {

    // global state
    const user = useSelector(store => store.user.user);

    // modal state
    const [currencyModalOpen, setcurrencyModalOpen] = useState(false);
    const [deleteCurrencyModalOpen, setDeleteCurrencyModalOpen] = useState(false);
    const [exchangeModalOpen, setExchangeModalOpen] = useState(false);

    // data state
    const { data: currencyData, error: currencyError, isLoading: currencyIsLoading } = useGetCurrenciesQuery();
    const [getExchange, { data: exchangeData, error: exchangeError, isLoading: exchangeIsLoading }] = useLazyGetExchangeQuery();
    const [addCurrency, { isLoading: addCurrencyIsLoading, error: addCurrencyError }] = useAddCurrencyMutation();
    const [addExchange, { isLoading: addExchangeIsLoading, error: addExchangeError }] = useAddExchangeMutation();
    const [deleteCurrency, { isLoading: deleteCurrencyIsLoading, error: deleteCurrencyError }] = useDeleteCurrencyMutation();

    // event handlers
    const openCurrencyModal = () => { setcurrencyModalOpen(true); }
    
    const closeCurrencyModal = () => { setcurrencyModalOpen(false); }

    const openDeleteCurrencyModal = () => { setDeleteCurrencyModalOpen(true); }
    
    const closeDeleteCurrencyModal = () => { setDeleteCurrencyModalOpen(false); }

    const openExchangeModal = () => { setExchangeModalOpen(true); }

    const closeExchangeModal = () => { setExchangeModalOpen(false); }

    const handleExchangeSearchSubmit = async (fromInput, toInput, latest=undefined) => {
        try {
            await getExchange({fromId: fromInput, toId: toInput, latest});
        } catch (error) {
            console.log('error', error)
        }
    }

    const handleDeleteCurrency = async (id) => {
        try {
            await deleteCurrency(id);
        } catch (error) {
            console.log('error', error)
        } finally {
            closeDeleteCurrencyModal();
        }
    }

    const handleSubmitNewCurrency = async (currency) => {
        try {
            await addCurrency({name: currency}).unwrap();
        } catch (error) {
            console.log('error', error)
        } finally {
            closeCurrencyModal();
        }
    }

    const handleSubmitNewExchange = async ({from, to, newRate}) => {
        try {
            await addExchange({from, to, rate: newRate}).unwrap();
        } catch (error) {
            console.log('error', error)
        } finally {
            closeExchangeModal();
        }
    }

    // passing data
    const currencyOptions =  !currencyError && !currencyIsLoading ? [{id:0, name: '-'}, ...currencyData] : [];
    const exchangeDisplay = !exchangeError && !exchangeIsLoading ? exchangeData : [];
    const error = addCurrencyError || addExchangeError || deleteCurrencyError;
    // jsx
    return (
        <>
            {error && <Message type='error' message={error?.data?.message || error?.error}/>}
            { (addCurrencyIsLoading || addExchangeIsLoading || deleteCurrencyIsLoading) && <Spinner />}
            {user.isAdmin && 
            <AdminPanel 
                openCurrencyModal={openCurrencyModal} 
                openExchangeModal={openExchangeModal}
                openDeleteCurrencyModal={openDeleteCurrencyModal}
            />}

            <ExchangeRateSelector 
                currency={currencyOptions} 
                handleSubmit={handleExchangeSearchSubmit}
            />

            <ExchangeRateDisplay 
                exchange={exchangeDisplay}
                handleExchangeSearchSubmit={handleExchangeSearchSubmit}
            />

            {currencyModalOpen && 
            <AddCurrencyModal 
                closeCurrencyModal={closeCurrencyModal}
                handleSubmitNewCurrency={handleSubmitNewCurrency}
            />}

            {exchangeModalOpen && 
            <AddExchangeModal 
                currencyOptions={currencyOptions}
                closeExchangeModal={closeExchangeModal}
                handleSubmitNewExchange={handleSubmitNewExchange}
            />}

            {deleteCurrencyModalOpen && 
            <DeleteCurrencyModal 
                currencyOptions={currencyOptions}
                closeDeleteCurrencyModal={closeDeleteCurrencyModal}
                handleDeleteCurrency={handleDeleteCurrency}
            />
            }
        </>
    )
}

export default Currency