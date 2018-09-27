import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import moment from 'moment';

import './TableComponent.css';

const mapStateToProps = state => ({
    user: state.user,
    careHistory: state.careHistory,
});

class TableComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            sortItem: 'last_name',
        }
    }


    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        
        
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.replace('home');
        }
    }

    //change sort term for table arr
    handleSortChange = propertName => (event) => {
        console.log('sort term', [propertName]);
        this.setState({
            sortItem: [propertName],
        });
    }

    //dispatch action to saga with data for message
    sendMessageData = (dataToSend) => () => {
        console.log('in sendMessageData', dataToSend);

        const action = {type: 'SEND_REMINDER', payload: dataToSend};

        this.props.dispatch(action);

        setTimeout(() => {

            this.refreshCareHistory();
           
        }, 1);
    }

    refreshCareHistory = () => {
        const action = { type: 'GET_CARE_HISTORY', payload: this.props.user.id }

        this.props.dispatch(action);
    }

    render(){
        let content = null;



        if (this.props.user.userName && this.props.careHistory.careHistoryReducer){

            const sortTerm = this.state.sortItem

            const careArrOne = this.props.careHistory.careHistoryReducer;

            //sort array dynamically based on sort term
            const careArr = careArrOne.sort((a,b) => (a[sortTerm] > b[sortTerm]));
            

            console.log('careArr', careArr);

            content = (

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={this.handleSortChange("last_name")} name="last_name" >Owner</th>
                                <th onClick={this.handleSortChange("name")} name="name" >Pet</th>
                                <th onClick={this.handleSortChange("care_type")} >Care</th>
                                <th onClick={this.handleSortChange("due_date")} >Due Date</th>
                                <th onClick={this.handleSortChange("previous_date")}>Last Date</th>
                                <th>
                                    Notification
                                    <button type="button">Send All</button>
                                </th>
                                <th>Complete Care</th>
                            </tr>
                        </thead>
                        <tbody>
                            {careArr.map((care) => {
                                let sendButton = null;
                                if(care.notification_sent === false){
                                    
                                    sendButton = (
                                        <button 
                                            onClick = {this.sendMessageData(care)}
                                            type="button"
                                        >Send
                                        </button>
                                    )
                                }
                                else if(care.notification_sent === true){
                                    sendButton = (
                                        <button 
                                            onClick={this.sendMessageData(care)}
                                            type="button"
                                        >Resend
                                        </button>
                                    )
                                }

                                let completeButton = null;
                                if(care.complete_care === false){
                                    completeButton = (
                                        <button type="button">Complete</button>
                                    )
                                }
                                else if(care.complete_care === true){
                                    completeButton = (
                                        <button type="button">Undo</button>
                                    )
                                }

                                let dueDate = care.due_date;
                                dueDate = moment(dueDate).format('YYYY-MM-DD');
                                
                                let careType = care.care_type.toString().replace(/_/g, ' ').replace(/,/g, ', ');
                                
                                let profileLink = '#/ownerProfile/' + care.owner_id;

                                let rowClass;

                                if(care.notification_sent === false){
                                    rowClass = "notSent";
                                }
                                else if(care.notification_sent === true){
                                    rowClass = "sent";
                                }


                                return (
                                    <tr className = {rowClass} key={care.pet_id + care.name + careType} id={care.pet_id + care.name + careType}>
                                        <td><a href={profileLink}>{care.first_name + ' ' + care.last_name}</a></td>
                                        <td>{care.name}</td>
                                        <td>{careType}</td>
                                        <td>{dueDate}</td>
                                        <td>{care.previous_date}</td>
                                        <td>{sendButton}</td>
                                        <td>{completeButton}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )
        }

        return (
            <div className="pageContainer">
                {content}
            </div>
        );
    }

}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TableComponent);