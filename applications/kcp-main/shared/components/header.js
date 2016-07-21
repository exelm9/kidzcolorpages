import React, {PropTypes, Component} from 'react';
import { browserHistory } from 'react-router';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }






  render() {
    return (
      <nav className="navbar navbar-light bg-faded" >
        <div className="container-fluid">
          {/*KCP title button*/}
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <button href="#" className="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded="false">menu <span className="caret"></span></button>
                <ul className="dropdown-menu">
                  <li><div onClick={event => this.homeReturn()} href="#">home</div></li>
                  <li><div onClick={event => this.goToProfilePage()} href="#">profile</div></li>
                  <li><div onClick={event => this.goToSettings()} href="#">change password</div></li>
                  <li><div onClick={event => this.goToRegister()} href="#">register</div></li>
                  <li role="separator" className="divider"></li>
                  <li><div onClick={event => this.goToLogin()} href="#">log in</div></li>
                  <li><div href="#">log out</div></li>
                </ul>
              </li>
            </ul>

        </div>

      </nav>
    );
  }

  goToProfilePage() {
    browserHistory.push('/profile');
  }

  homeReturn() {
    browserHistory.push('/');
  }

  goToSettings() {
    browserHistory.push('/passwordreset');
  }
  goToLogin() {
    browserHistory.push('/login');
  }

  goToRegister() {
    browserHistory.push('/registration');
  }



};
