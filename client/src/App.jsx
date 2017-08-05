import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Scene from './Scene';
import Console from './Console';

const App = () =>
	<Provider store={store}>
		<div className="game">
			<div className="title">
				<h1>Room Escape</h1>
			</div>
			<div className="app">
				<Scene />
				<Console />
			</div>
		</div>
	</Provider>;

export default App;
