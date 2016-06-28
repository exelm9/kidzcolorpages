import React, {PropTypes, Component} from 'react';
import { browserHistory } from 'react-router';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }






  render() {
    return (
      <nav className="navbar navbar-light bg-faded" >
        <div onClick={event => this.homeReturn()} className="navbar-brand" href="#">KCP</div>
          <ul className="nav navbar-nav">
            <li className="nav-item active pull-xs-right">
              <div onClick={event => this.pusher()} className="navbar-brand" href="#">Profile</div>
            </li>
          </ul>
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
