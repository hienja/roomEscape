import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

const App = () =>
	<Provider store="store">
		<div className="title">
			<h1>Room Escape</h1>
		</div>
		<div className="app">
			<div className="scene" />
			<div className="console">
				<div />
				<form>
					<input text="text" placeholder="Type here..." />
				</form>
			</div>
		</div>
	</Provider>;

export default App;
