import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handlingInput } from './actions';
import Scene from './Scene';
import Window from './Window';

class Game extends Component {
	render() {
		return (
			<div className="game">
				<div className="title">
					<h1>Room Escape</h1>
				</div>
				<Scene location={this.props.gameProps.location} />
				<div className="console">
					<Window dialogue={this.props.gameProps.dialogue} />
					<form onSubmit={this.props.handlingInput}>
						<input type="text" name="text" placeholder="Type here..." />
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		gameProps: {
			dialogue: state.dialogue,
			location: state.location
		}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handlingInput: event => {
			event.preventDefault();
			dispatch(handlingInput(event.target.children[0].value));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
