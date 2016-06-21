
import * as types from '../constants/ActionTypes'

const initialState = {
  pictures: [
	  { url:"http://cdn.quotesgram.com/img/85/55/329025798-weeninja-2.png",
		category:"ninja"},
	  {url:"http://www.cutestpaw.com/wp-content/uploads/2011/11/How-is-it-so-fluffy.jpg",
	  	category:"dog"
	  }
  ]
};

const afterSearchRequest = {
  pictures: [
    { url:"http://cdn.quotesgram.com/img/85/55/329025798-weeninja-2.png",
    category:"ninja"},
    {url:"http://www.cutestpaw.com/wp-content/uploads/2011/11/How-is-it-so-fluffy.jpg",
      category:"dog"
    },
    {url:"https://s-media-cache-ak0.pinimg.com/236x/62/ca/b7/62cab73a1499cabe2f8a2a2a49ae3135.jpg",
      category:"dog"
    },
  ]
};

export default function picturesReducer(pictures = initialState, action) {
  switch (action.type) {
    case types.FIND_PICTURES:
      console.log(action)
      return afterSearchRequest;
    default:
      return pictures;
  }
}