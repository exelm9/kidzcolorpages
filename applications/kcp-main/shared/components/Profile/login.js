import React, {PropTypes, Component} from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <div className="loginForm">
        <input />
        <input />

      </div>

    );
  }
}
