import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import './LoginPage.css';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName !== null) {
      this.props.history.push('reminders');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));


    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.props.login.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div className="pageContainer loginPage">
        {this.renderAlert()}
        <form onSubmit={this.login} className="loginForm">
          <div className="loginFormSection">
            <label htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
          </div>
          <div className="loginFormSection">
            <label htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
          </div>
          <div className="loginBtnContainer">
            <button
              type="submit"
              name="submit"
              value="Log In"
            >Log in </button>
            <Link className="registerBtn" to="/register">Register</Link>
          </div>
        </form>
        <img className="logInLogo" src="images/larger_pet_logo.png" alt="pet reminders logo" />
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
