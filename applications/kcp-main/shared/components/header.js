import React, {PropTypes, Component} from 'react';
import { browserHistory } from 'react-router';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }






  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-faded" >
          <a onClick={event => this.homeReturn()} className="navbar-brand" href="#">KCP</a>
            <ul className="nav navbar-nav">
              <li className="nav-item active pull-xs-right">
                <a onClick={event => this.pusher()} className="nav-link" href="#">Profile</a>
              </li>
            </ul>
        </nav>
      </div>
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
