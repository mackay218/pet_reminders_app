import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import './TechUsed.css';

const mapStateToProps = state => ({
    user: state.user,
});

class TechUsed extends Component {


    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });  
    }


    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.replace('/#/home');
        }
    }

    render(){
        if (this.props.user.userName){
            return (

                <div className="pageContainer">
                    <h1>Tech Used</h1>
                    <ul className="techUsedList">
                        <li>React</li>
                        <li>React-Redux</li>
                        <li>Redux-Saga</li>
                        <li>MomentJS</li>
                        <li>Material UI</li>
                        <li>
                            React-phone-number-input FROM: 
                        </li>   
                        <li>
                            <a className="phoneLink" >https://github.com/catamphetamine/react-phone-number-input</a> 
                        </li>    
                        <li>Twilio</li>
                        <li>NodeJS</li>
                        <li>ExpressJS</li>
                        <li>Postgresql</li>
                        <li>Passport</li>
                        <li>Polaris' Brains</li>
                    </ul>
                </div>

            )
        }
        else{
            return (
                <p>loading</p>
            )
        }
    }
        
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TechUsed);