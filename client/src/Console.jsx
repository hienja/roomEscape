import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handlingInventory, changingScene } from './actions';

class Console extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div className="console">
				<div className="window">
					{this.props.dialogue
						? this.props.dialogue.map((value, i) =>
								<div key={i}>
									{value}
								</div>
							)
						: ''}
				</div>
				<form onSubmit={this.props.handlingInventory}>
					<input type="text" name="text" placeholder="Type here..." />
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		inventory: state.inventory,
		dialogue: state.dialogue,
		location: state.location
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handlingInventory: event => {
			event.preventDefault();
			dispatch(handlingInventory(event.target.children[0].value));
		}
		// changeScene: dispatch(changingScene(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Console);
