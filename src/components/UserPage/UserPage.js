import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import './UserPage.css';

//phone number formatting from https://github.com/catamphetamine/react-phone-number-input
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const mapStateToProps = state => ({
  user: state.user,
});

class UserPage extends Component {
  constructor(props) {
    super(props);

    //set local state to this.props.user values
    this.state = {
      first_name: '',
      last_name: '',
      clinic_name: '',
      phone: '',
      email: '',
      username: '',
      message: '',
      editMode: false,
    };
  }


  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

    this.setState({
      first_name: this.props.user.first_name
    });

  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  //toggle edit mode by changing local state
  handleEditClick = () => {
    console.log('handleEditClick', this.state);
    this.setState({
      editMode: true,
    })
  } //end handleEdirClick

  //handle changes for input fields of edit user form
  handleInputChangeFor = propertyName => (event) => {

    const action = {
      type: USER_ACTIONS.SET_USER, user: {
        ...this.props.user,
        [propertyName]: event.target.value,
      }
    }
    this.props.dispatch(action);

  } //end handleInputChangeFor

  //function to update user information in database
  updateUserInfo = (event) => {
    event.preventDefault();
    
    //make sure all fields have information
    if (this.props.user.username === '' || this.props.user.password === '' || this.props.user.first_name === '' ||
      this.props.user.last_name === '' || this.props.user.clinic_name === '' || this.props.user.phone === ''
      || this.props.user.email === '') {
      this.setState({
        message: 'Please fill out all fields.',
      });
    } else {
      const body = {
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        clinic_name: this.props.user.clinic_name,
        phone: this.props.user.phone,
        email: this.props.user.email,
        id: this.props.user.id
      };

      console.log('body on client side:', body);


      axios.put('/api/user/register/', body)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              editMode: false,
            });
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }

  } //end updateUserInfo

  //exit edit mode without submitting info
  //render page with previous information
  cancelEdit = () => {
    this.setState({
      editMode: false,
    });
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  } //end cancelEdit

  //render alert messages
  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  } //end renderAlert

  render() {
    let content = null;

    if (this.props.user.userName) {
      if (this.state.editMode === false) {
        content = (
          <div className="userContainer">
            <p>First name: {this.props.user.first_name}</p>
            <p>Last name: {this.props.user.last_name}</p>
            <p>Clinic: {this.props.user.clinic_name}</p>
            <p>phone: {this.props.user.phone}</p>
            <p>email: {this.props.user.email}</p>
            <button onClick={this.handleEditClick}>edit</button>
          </div>
        );
      }
      else if (this.state.editMode === true) {
        content = (
          <div className="userContainer">
            {this.renderAlert()}
            <form onSubmit={this.updateUserInfo}>
              <div className="userInfoSec">
                <label htmlFor="first_name">First name: </label>
                <input
                  type="text"
                  name="first_name"
                  value={this.props.user.first_name}
                  onChange={this.handleInputChangeFor("first_name")}
                />
              </div>
              <div className="userInfoSec">
                <label htmlFor="last_name">Last name: </label>
                <input
                  type="text"
                  name="first_name"
                  value={this.props.user.last_name}
                  onChange={this.handleInputChangeFor("last_name")}
                />
              </div>
              <div className="userInfoSec">
                <label htmlFor="clinic_name">Clinic: </label>
                <input
                  type="text"
                  name="clinic_name"
                  value={this.props.user.clinic_name}
                  onChange={this.handleInputChangeFor("clinic_name")}
                />
              </div>
              <div className="userInfoSec">
                <label htmlFor="phone">phone:</label>
                <PhoneInput
                  name="phone"
                  country='US'
                  placeholder="Enter phone number"
                  value={this.props.user.phone}
                  onChange={phone => this.setState({ phone: phone })} />
              </div>
              <div className="userInfoSec">
                <label htmlFor="email">email: </label>
                <input
                  className="emailInput"
                  type="text"
                  name="email"
                  value={this.props.user.email}
                  onChange={this.handleInputChangeFor("email")}
                />
              </div>
              <div className="btnContainer">
                <button name="submit">Submit</button>
                <button onClick={this.cancelEdit} type="button" name="cancel">Cancel</button>
              </div>
            </form>
          </div>
        );
      }

    }

    return (
      <div className="pageContainer">
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

