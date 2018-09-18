import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
});

class UserPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      clinic_name: '',
      email: '',
      username: '',
      password: '',
      message: '',
      editMode: false,
    };
  }


  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  handleEditClick = () => {
    console.log('handleEditClick', this.state);
    this.setState({
      editMode: true,
    })
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  updateUserInfo = (event) => {
    event.preventDefault();
    if (this.state.username === '' || this.state.password === '' || this.state.first_name === '' ||
      this.state.last_name === '' || this.state.clinic_name === '' || this.state.email === '') {
      this.setState({
        message: 'Please fill out all fields.',
      });
    }

  }

  render() {
    let content = null;
    
    if (this.props.user.userName) {
      if (this.state.editMode === false){
        content = (
          <div>
            <p>First name: {this.props.user.first_name}</p>
            <p>Last name: {this.props.user.last_name}</p>
            <p>Clinic: {this.props.user.clinic_name}</p>
            <p>email: {this.props.user.email}</p>
            <button onClick={this.handleEditClick}>edit</button>
          </div>
        );
      }
      else if(this.state.editMode === true){
        content = (
          <div>
            <form>
              <div className ="userInfoSec">
                <label htmlFor="first_name">First name: </label>
                <input 
                  type="text"
                  name="first_name" 
                  value={this.props.user.first_name}
                  onChange={this.handleInputChangeFor("first_name")} 
                  />
              </div>
              <div className="userInfoSec">
                <label htmlFor="last_name">First name: </label>
                <input
                  type="text"
                  name="first_name"
                  value={this.props.user.last_name}
                  onChange={this.handleInputChangeFor("last_name")}
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
                <label htmlFor="email">email: </label>
                <input
                  type="text"
                  name="email"
                  value={this.props.user.email}
                  onChange={this.handleInputChangeFor("email")}
                />
              </div>
            </form>
          </div>
        )
      }
      
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

