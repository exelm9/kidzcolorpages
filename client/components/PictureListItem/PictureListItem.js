import React from 'react';

const PictureListItem = ({picture}) => {
	// const picture = props.picture; // identical to {picture} but also need to pass in props
	const imageUrl = picture.url
	

	return(
		<li className="list-group-item">
			<div className="video-list media">
				<div className="media-left">
					<img className="media-object" src={imageUrl} />
				</div>
			</div>
		</li>
	);
}

export default PictureListItem;