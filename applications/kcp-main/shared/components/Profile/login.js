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
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="username"/>
            <input type="text" placeholder="password"/>
            <button className="btn btn-default btn-lg" >login</button>

          </form>
        </div>


      </div>

    );
  }
}
