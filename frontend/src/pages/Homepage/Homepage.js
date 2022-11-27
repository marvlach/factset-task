import styles from './Homepage.module.css';
import Card from '../../components/UI/Card/Card.js';

const Homepage = () => {
    return (
    <>
        <Card className={styles['card-container']}>    
            <h1> Very cool Homepage </h1>    
        </Card>
    </>)
}

export default Homepage