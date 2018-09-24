import React, {Component} from 'react';
import { connect } from 'react-redux';


import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
});

class Header extends Component{

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render(){

    let logOutBtn = null;

    if (this.props.user.userName){
      logOutBtn = (
        <button
          className="logoutBtn"
          onClick={this.logout}
        >
        Log Out
          </button>
      )
    } 

    return(
      <div className="instructions">
        <div>
          <h1 className="lead">Pet Reminder</h1>
          {logOutBtn}
        </div>
      </div>

    )
  }
  
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Header);