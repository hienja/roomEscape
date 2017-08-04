import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

const App = () =>
	<Provider store={store}>
		<div>
			<div className="title">
				<h1>Room Escape</h1>
			</div>
			<div className="app">
				<div className="scene">
					<img className="img" src="client/public/chemistry-laboratory.png" />
				</div>
				<div className="console">
					<form>
						<input type="text" name="text" placeholder="Type here..." />
					</form>
				</div>
			</div>
		</div>
	</Provider>;

export default App;
