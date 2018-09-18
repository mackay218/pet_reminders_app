import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


class UpdateUser extends Component {


    render(){

        return(
            <div>
                {this.renderAlert()}
                <form onSubmit={this.updateUserInfo}>
                    <div className="userInfoSec">
                        <label htmlFor="first_name">First name: </label>
                        <input
                            type="text"
                            name="first_name"
                            value={this.state.first_name}
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
                        <label htmlFor="email">email: </label>
                        <input
                            type="text"
                            name="email"
                            value={this.props.user.email}
                            onChange={this.handleInputChangeFor("email")}
                        />
                    </div>
                    <button name="submit">Submit</button>
                </form>
            </div>
        )
    }

}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UpdateUser);