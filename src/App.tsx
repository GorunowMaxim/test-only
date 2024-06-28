import CircleWidget from './widgets/circleWidget/CircleWidget';

import './App.scss';

function App() {
	return (
		<div className='wrapper'>
			<h1 className='main-headline'>
				Исторические <br /> даты
			</h1>
			<main className='main'>
				<CircleWidget totalCountPoints={6} numberActivePosition={3} />
			</main>
		</div>
	);
}

export default App;
