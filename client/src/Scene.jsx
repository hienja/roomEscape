import React from 'react';

const Scene = props =>
	<div className="scene">
		<img className="img" src={'client/public/' + props.location + '.png'} />
		{props.location}
	</div>;

export default Scene;
