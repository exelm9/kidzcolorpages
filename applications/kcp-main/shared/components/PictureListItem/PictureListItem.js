import React from 'react';

const PictureListItem = ({picture}) => {
	// const picture = props.picture; // identical to {picture} but also need to pass in props
	const imageUrl = picture.url
	

	return(
		<div className="picture-wrap media">
				<img className="media-object" src={imageUrl} />
		</div>

	);
}

export default PictureListItem;