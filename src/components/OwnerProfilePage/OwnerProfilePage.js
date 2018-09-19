import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
    owner: state.owner,
});

class OwnerProfilePage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getOwnerInfo();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
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

        if (this.props.user.userName) {
            content = (
                <div>
                    <h3><span>{this.props.owner.ownerInfo.first_name}</span>
                        <span> </span>
                        <span>{this.props.owner.ownerInfo.last_name}</span>
                    </h3>
                </div>
            );
        }

        return (
            <div>
                <Nav />
                {content}
                <p>{JSON.stringify(this.props.owner.ownerInfo)}</p>
            </div>
        );
    }

}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(OwnerProfilePage);