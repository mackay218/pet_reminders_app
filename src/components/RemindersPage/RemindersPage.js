import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import './RemindersPage.css';

import TableComponent from '../TableComponent/TableComponent';

const mapStateToProps = state => ({
    user: state.user,
    careHistory: state.careHistory,
});

class RemindersPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

        setTimeout(()=> {
            this.getCareHistory();
        }, 100);
        
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.replace('home');
        }
    }

    
    getCareHistory = () => {
        console.log('get care history for:', this.props.user.id);
        const action = {type: 'GET_CARE_HISTORY', payload: this.props.user.id}

        this.props.dispatch(action);
    }

    render(){
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <h1>Reminders</h1>
                    <div className = "tableContainer">
                        <TableComponent/>
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
export default connect(mapStateToProps)(RemindersPage);