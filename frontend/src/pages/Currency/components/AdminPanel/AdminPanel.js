
import styles from './AdminPanel.module.css';

const AdminPanel = ({ openCurrencyModal, openExchangeModal, openDeleteCurrencyModal }) => {

    const handleOpenNewCurrency = () => { openCurrencyModal(); }
    
    const handleOpenNewExchange = () => { openExchangeModal(); }

    const handleOpenDeleteCurrency = () => { openDeleteCurrencyModal(); }

    return (<>
        <div className={styles["dropdown"]}>
            <button className={styles["dropbtn"]}>Admin</button>
            <div className={styles["dropdown-content"]}>
                <span onClick={handleOpenNewCurrency}>Create New Currency</span>
                <span onClick={handleOpenNewExchange}>Create New Exchange Rate</span>
                <span onClick={handleOpenDeleteCurrency}>Delete Currency</span>
            </div>
        </div>
    </>)
}

export default AdminPanel