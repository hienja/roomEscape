import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handlingInventory, changingScene } from './actions';

class Console extends Component {
	constructor() {
		super();
	}
	action(event) {
		console.log(event.target[0].value.split(' '));
		return { type: '' };
	}
	render() {
		return (
			<div className="console">
				<div className="window">
					{this.props.handleInventory.inventory.map((value, i) =>
						<div key={i}>
							{value}
						</div>
					)}
				</div>
				<form onSubmit={this.action.bind(this)}>
					<input type="text" name="text" placeholder="Type here..." />
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return state;
};

const mapDispatchToProps = dispatch => {
	return {
		// addItem: dispatch(addingItem(action(event))),
		// useItem: dispatch(usingItem(action(event))),
		// changeScene: dispatch(changingScene(event))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Console);
