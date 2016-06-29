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
          <div onClick={event => this.homeReturn()} className="navbar-brand" href="#">KCP</div>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <div href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Menu <span className="caret"></span></div>
                <ul className="dropdown-menu">
                  <li><div onClick={event => this.goToProfilePage()} href="#">Profile</div></li>
                  <li><div onClick={event => this.goToSettings()} href="#">Settings</div></li>
                  <li><div href="#">Something else here</div></li>
                  <li role="separator" className="divider"></li>
                  <li><div href="#">Log out</div></li>
                </ul>
              </li>
            </ul>

        </div>

      </nav>
    );
  }

  goToProfilePage() {
    console.log("goToProfilePage");
    browserHistory.push('/profile');
  }

  homeReturn() {
    console.log("homeReturn");
    browserHistory.push('/browse');
  }

  goToSettings() {
    console.log("goToSettings");
    browserHistory.push('/passwordreset');
  }


};
