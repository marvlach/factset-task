import './App.css';
import MainHeader from './components/Layout/MainHeader/MainHeader.js';
import Footer from './components/Layout/Footer/Footer.js';
import Routing from './router/Routing';


function App() {
  	return (
		<div className='layout-wrapper'>
			<MainHeader />
			<main className='layout-content'>
				<Routing />
			</main>
			<Footer />
		</div>
	);
}

export default App;
