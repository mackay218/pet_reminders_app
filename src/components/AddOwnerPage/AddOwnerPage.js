import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
});

//Object to hold info from add owner form
const addOwnerObject = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
}

class AddOwnerPage extends Component {
    constructor() {
        super();

        this.state = addOwnerObject;
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    //handle change in input fields
    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
    }


    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <h1>Add Owner</h1>

                    <div className="addOwnerFormContainer">
                        <form>
                            <div className="formBigSec">
                                <h4>Name</h4>
                                <div className="formSection">
                                    <label htmlFor="#firstName">First</label>
                                    <input id="firstName" name="firstName" type="text" placeholder="Dan"/>
                                </div>
                                <div className="formSection">
                                    <label htmleFor="#lastName">Last</label>
                                    <input id="lastName" name="lastName" type="text" placeholder="MacKay"/>
                                </div>
                            </div>
                            <div className="formBigSec">
                                <label htmlFor="#phone">Phone</label>
                                <input id="phone" name="phone" type="tel" placeholder="555-555-5555"/>
                                
                            </div>
                        </form>
                    </div>

                </div>
            );
        }

        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }

}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddOwnerPage);