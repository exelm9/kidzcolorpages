import React, {PropTypes, Component} from 'react';

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-page">
        <div>This is a profile.</div>
        <div>Picture</div>
        <div>email</div>
        <div>sidebar</div>
    </div>

    );
  }
}
