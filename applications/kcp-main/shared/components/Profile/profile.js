import React, {PropTypes, Component} from 'react';
import Header from '../header';

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          This is a profile.
        </div>
    </div>

    );
  }
}
