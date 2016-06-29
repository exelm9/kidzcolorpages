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
                  <li><div onClick={event => this.pusher()} href="#">Profile</div></li>
                  <li><div href="#">Settings</div></li>
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

  pusher() {
    console.log("LOGGED");
    browserHistory.push('/profile');
  }

  homeReturn() {
    console.log("LOGGED AGAIN");
    browserHistory.push('/browse');
  }


};
