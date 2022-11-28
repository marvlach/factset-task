
import styles from './AdminPanel.module.css';

const AdminPanel = ({ openCurrencyModal, openExchangeModal }) => {

    const handleOpenNewCurrency = () => { openCurrencyModal(); }
    
    const handleOpenNewExchange = () => { openExchangeModal(); }

    return (<>
        <div className={styles["dropdown"]}>
            <button className={styles["dropbtn"]}>Admin</button>
            <div className={styles["dropdown-content"]}>
                <span onClick={handleOpenNewCurrency}>Create New Currency</span>
                <span onClick={handleOpenNewExchange}>Create New Exchange Rate</span>
            </div>
        </div>
    </>)
}

export default AdminPanel