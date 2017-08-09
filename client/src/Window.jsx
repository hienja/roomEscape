import React from 'react';

export const Window = props =>
	<div className="window">
		{props.dialogue
			? props.dialogue.map((value, i) =>
					<div key={i}>
						{value}
					</div>
				)
			: ''}
	</div>;

export default Window;
