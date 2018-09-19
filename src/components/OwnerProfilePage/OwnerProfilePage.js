import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const mapStateToProps = state => ({
    user: state.user,
    owner: state.owner,
});

class OwnerProfilePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            editMode: false,
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
        
    }

    componentWillMount(){
        this.getOwnerInfo();
    }

    //get 
    getOwnerInfo = () => {
 
        console.log('getOwnerInfo page', this.props.match.params.id);

        //get owner id from address bar
        const ownerId = this.props.match.params.id

        const action = {type: 'GET_OWNER_INFO', payload: ownerId};

        this.props.dispatch(action);

    }

    //run saga to change owner info
    handleChangeFor = propertyName => (event) => {
        const action = {type: 'SET_OWNER', payload:{
            ...this.props.owner.ownerInfo,
            [propertyName]: event.target.value,
        } }

        this.props.dispatch(action);
        
    }

    updateOwnerInfo = (event) => {
        event.preventDefault();
        if(this.props.owner.ownerInfo.first_name === '' || 
            this.props.owner.ownerInfo.last_name === '' ||
            this.props.owner.ownerInfo.phone === '' || 
            this.props.owner.ownerInfo.email === ''  || 
            this.props.owner.ownerInfo.address === ''){
                alert('please fill out all fields');
        }
        else{
            const action = {type: 'UPDATE_OWNER_INFO', payload: this.props.owner.ownerInfo};

            this.props.dispatch(action);

            
            this.setState({
                editMode: false
            });
            
        }
    }


    handleEditClick = () => {
        console.log('handleEditClick', this.state);
        this.setState({
            editMode: true,
        });
    }

   
    cancelEdit = () => {
        this.setState({
            editMode: false
        });
        
        this.getOwnerInfo();
    }

    render() {
        let content = null;
        let contact_info = null;

        if (this.props.user.userName) {
            if(this.state.editMode === false){
                contact_info = (
                    <div className="contactInfo">
                        <div className="infoSec">
                            <h4>Name</h4>
                            <p>First: {this.props.owner.ownerInfo.first_name}</p>
                            <p>Last: {this.props.owner.ownerInfo.last_name}</p>
                        </div>
                        <div className="infoSec">
                            <h4>Contact Info</h4>
                            <p>Phone: {this.props.owner.ownerInfo.phone}</p>
                            <p>Email: {this.props.owner.ownerInfo.email}</p>
                            <p>Address: {this.props.owner.ownerInfo.address}</p>
                        </div>
                        <button type="button" onClick={this.handleEditClick}>Edit</button>
                    </div>
                )
            }
            else if(this.state.editMode === true){
                contact_info = (
                    <div className="contactInfo">
                        <form onSubmit={this.updateOwnerInfo}>
                            <div className="infoSec">
                                <h4>Name</h4>
                                <div className="inputSec">
                                    <label htmlFor="first_name">First:</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={this.props.owner.ownerInfo.first_name}
                                        onChange={this.handleChangeFor("first_name")}
                                    />
                                </div>
                                <div className="inputSec">
                                    <label htmlFor="last_name">Last:</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={this.props.owner.ownerInfo.last_name}
                                        onChange={this.handleChangeFor("last_name")}
                                    />
                                </div>
                            </div>
                            <div className="infoSec">
                                <h4>Contact Info</h4>
                                <div className="inputSec">
                                    <label htmlFor="phone">Phone:</label>
                                    <PhoneInput
                                        name="phone"
                                        country='US'
                                        placeholder="Enter phone number"
                                        value={this.props.owner.ownerInfo.phone}
                                        onChange={this.handleChangeFor("phone")} 
                                    />
                                </div>
                                <div className="inputSec">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={this.props.owner.ownerInfo.email}
                                        onChange={this.handleChangeFor("email")}
                                    />
                                </div>
                                <div className="inputSec">
                                    <label htmlFor="address">Address:</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={this.props.owner.ownerInfo.address}
                                        onChange={this.handleChangeFor("address")}
                                    />
                                </div>
                            </div>
                            <button >Submit</button>
                            <button type="button" onClick={this.cancelEdit} name="cancel" >Cancel</button>
                        </form>
                    </div>
                )
            }
            content = (
                <div>
                    <h3><span>{this.props.owner.ownerInfo.first_name}</span>
                        <span> </span>
                        <span>{this.props.owner.ownerInfo.last_name}</span></h3>
                        {contact_info}
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
export default connect(mapStateToProps)(OwnerProfilePage);