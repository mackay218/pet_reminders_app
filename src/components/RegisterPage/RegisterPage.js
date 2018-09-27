import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//phone number formatting from https://github.com/catamphetamine/react-phone-number-input
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      clinic_name: '',
      phone: '',
      email: '',
      username: '',
      password: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '' || this.state.first_name === '' ||
        this.state.last_name === '' || this.state.clinic_name === '' || this.state.email === '' ||
        this.state.phone === '') {
      this.setState({
        message: 'Please fill out all fields.',
      });
    } else {
      const body = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        clinic_name: this.state.clinic_name,
        phone: this.state.phone,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
            event.target.reset();
            this.setState({
              phone: '',
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
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

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
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="first_name">
              First name:
              <input
                type="text"
                name="first_name"
                placeholder="Daniel"
                value={this.state.first_name}
                onChange={this.handleInputChangeFor('first_name')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="last_name">
              Last name:
              <input
                type="text"
                name="last_name"
                placeholder="MacKay"
                value={this.state.last_name}
                onChange={this.handleInputChangeFor('last_name')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="clinic_name">
              Clinic:
              <input
                type="text"
                name="clinic_name"
                placeholder="Door Step Pet Vet"
                value={this.state.clinic_name}
                onChange={this.handleInputChangeFor('clinic_name')}
              />
            </label>
          </div>
          <div className="formSection">
            <label htmlFor="phone">phone</label>
            <PhoneInput
              name="phone"
              country='US'
              placeholder="Enter phone number"
              value={this.state.phone}
              onChange={phone => this.setState({ phone: phone })} />
          </div>
          <div>
            <label htmlFor="email">
              email:
              <input
                type="text"
                name="email"
                placeholder="doorStepPetVet@example.com"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                placeholder="dan2588"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                placeholder="********"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Register"
            />
            <Link to="/home">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;

