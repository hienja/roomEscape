import React from 'react';

const Scene = props =>
	<div className="scene">
		<img className="img" src={'client/public/images/' + props.location + '.png'} />
	</div>;

export default Scene;
