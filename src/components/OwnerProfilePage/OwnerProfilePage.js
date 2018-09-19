import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

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