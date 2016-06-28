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
          <a className="navbar-brand" href="#">KCP</a>
            <ul className="nav navbar-nav">
              <li className="nav-item active pull-xs-right">
                <a className="nav-link" href="#">Profile</a>
              </li>
            </ul>
        </nav>
      </div>
    );
  }



};
