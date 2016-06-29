import React, {PropTypes, Component} from 'react';

export default class PasswordReset extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="password-reset-page">
        <div className="form">
          <form className="password-reset-form">
            <input type="text" placeholder="current password"/>
            <input type="text" placeholder="new password"/>
            <input type="text" placeholder="confirm password"/>
            <button className="btn btn-default btn-lg"> submit </button>

          </form>
        </div>
       </div>

    );
  }

}
