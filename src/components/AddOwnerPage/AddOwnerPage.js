import React, { Component } from 'react';
import { connect } from 'react-redux';
//phone number formatting from https://github.com/catamphetamine/react-phone-number-input
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import './AddOwnerPage.css';

const mapStateToProps = state => ({
    user: state.user,
    owner: state.owner,
});

//Object to hold info from add owner form
const addOwnerObject = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: '',
    vet_id: '',
    message: '',
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
            this.props.history.replace('home');
        }

        if (this.props.owner.newOwnerId){
            this.props.history.push('/ownerProfile/' + this.props.owner.newOwnerId);
        }
    }

    // submit new owner information
    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.first_name === '' || this.state.last_name === '' || this.state.phone === '' ||
            this.state.email === '' || this.state.address === '') {
            this.setState({
                message: 'Please fill out all fields.',
            });
        }
        else {
            const body = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone: this.state.phone,
                email: this.state.email,
                address: this.state.address,
                vet_id: this.props.user.id,
            };

            this.props.dispatch({ type: 'ADD_OWNER', payload: body });
            //reset form
            event.target.reset();
            //clear phone input
            this.setState({
                phone: '',
            });
        }
    } //end handleSubmit

    //handle change in input fields
    handleChangeFor = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
    } // end handleChangeFor

    //function to render alert message
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

        //show view if user is logged in
        if (this.props.user.userName) {
            content = (
                <div className="addOwnerPage">
                    <h1>Add Owner</h1>
                    <div className="addOwnerFormContainer">
                        {this.renderAlert()}
                        <form onSubmit={this.handleSubmit}>
                            <div className="formBigSec">
                                <h4>Name</h4>
                                <div className="formSection">
                                    <label htmlFor="#firstName">First:</label>
                                    <input
                                        id="firstName"
                                        name="first_name"
                                        type="text"
                                        placeholder="Dan"
                                        onChange={this.handleChangeFor} />
                                </div>
                                <div className="formSection">
                                    <label htmlFor="#lastName">Last:</label>
                                    <input
                                        id="lastName"
                                        name="last_name"
                                        type="text"
                                        placeholder="MacKay"
                                        onChange={this.handleChangeFor} />
                                </div>
                            </div>
                            <div className="formBigSec">
                                <h4>Contact Info</h4>
                                <div className="formSection addOwnerSection">
                                    <label htmlFor="phone">phone:</label>
                                    <PhoneInput
                                        name="phone"
                                        country='US'
                                        placeholder="Enter phone number"
                                        value={this.state.phone}
                                        onChange={phone => this.setState({ phone })} />
                                </div>
                                <div className="formSection">
                                    <label htmlFor="#email">email:</label>
                                    <input
                                        id="email"
                                        name="email"
                                        placeholder="name@gmail.com"
                                        onChange={this.handleChangeFor} />
                                </div>
                                <div className="formSection">
                                    <label htmlFor="#address">address:</label>
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="123 Main St"
                                        onChange={this.handleChangeFor} />
                                </div>
                            </div>
                            <div className="formBigSec">
                                <button>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }

        return (
            <div className="pageContainer">
                <Nav />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddOwnerPage);