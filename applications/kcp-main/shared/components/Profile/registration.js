import React, {PropTypes, Component} from 'react';

export default class Registration extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="registration-page">
        <div className="form">
          <form className="registration-form">
            <input type="text" placeholder="username"/>
            <input type="text" placeholder="email"/>
            <input type="text" placeholder="password"/>
            <input type="text" placeholder="confirm password"/>
            <button className="btn btn-default btn-lg" >REGISTER</button>

          </form>
        </div>


      </div>

    );
  }

}
