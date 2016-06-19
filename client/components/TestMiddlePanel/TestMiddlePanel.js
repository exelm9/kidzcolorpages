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
		<ul className=''>
			{pictureItems}
		</ul>
	);
}

export default PictureList;