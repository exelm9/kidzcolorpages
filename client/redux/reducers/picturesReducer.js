import { UPDATE_PICTURES } from '../constants/ActionTypes'
const initialState = {
  pictures: [
	  { url:"http://cdn.quotesgram.com/img/85/55/329025798-weeninja-2.png",
		category:"ninja"},
	  {url:"http://www.cutestpaw.com/wp-content/uploads/2011/11/How-is-it-so-fluffy.jpg",
	  	category:"dog"
	  }
  ]
};

export default function picturesReducer(pictures = initialState, action) {
  switch (action.type) {
    case UPDATE_PICTURES:
      return pictures.push(action.payload);
    default:
      return pictures;
  }
}