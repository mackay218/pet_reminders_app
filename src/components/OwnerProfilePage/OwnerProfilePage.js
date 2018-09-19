import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import axios from 'axios';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
});

class OwnerProfilePage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getUserInfo();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    getUserInfo = () => {

        axios.get('/ownerProfile' + id)

    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <h1>Owner Profile</h1>
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