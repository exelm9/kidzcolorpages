import React from 'react';
import PictureListItem from '../PictureListItem/PictureListItem';

const PictureList = (props) => {
	var counter = 0;
	const pictureItems = props.pictures.pictures.map((picture) => {
		return (
			<PictureListItem
				picture={picture} 
			></PictureListItem>
		);

	});

	return (
		<div className='picture-container col-md-9 col-md-push-3'>
			{pictureItems}
		</div>
	);
}

export default PictureList;