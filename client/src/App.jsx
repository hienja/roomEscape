import React from 'react';
import { connect, Provider } from 'react-redux';
import store from './store';
import Game from './Game';

const App = () =>
	<Provider store={store}>
		<Game />
	</Provider>;

export default App;
