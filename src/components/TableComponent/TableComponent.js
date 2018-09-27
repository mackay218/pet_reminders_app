import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import Moment from 'moment';
import { extendMoment } from 'moment-range';



import './TableComponent.css';


const mapStateToProps = state => ({
    user: state.user,
    careHistory: state.careHistory,
    careTypes: state.careTypes,
});

const moment = extendMoment(Moment);

class TableComponent extends Component {
    
    

    constructor(props){
        super(props);

        this.state = {
            sortItem: 'last_name',
            timeFilter: 'week',
            sentStatus: false,
            completeStatus: false,
        }

        
    }
    

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        
        this.setState({
            timeFilter: 'week',
            sentStatus: false,
            completeStatus: false,
        });
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
           
        }, 10);
    }

    completeCare = (dataToSend) => () => {
        console.log('in completeCare', dataToSend);

        const action = {type: 'COMPLETE_CARE', payload: dataToSend};

        this.props.dispatch(action);

        //create new due date for next reminder
        let careCompleteDate = new Date();
        careCompleteDate = moment(careCompleteDate).format('YYYY-MM-DD');

        let careTypesCompleted = dataToSend.care_type;
        console.log('careTypesCompleted', careTypesCompleted);

        let careTypes = this.props.careTypes.careTypeInfo;


        //compare care types completed to careTypes to get correct frequency for care type
        for(let careTypeCompleted of careTypesCompleted){
            for (let care of careTypes) {
                const frequency = care.frequency;
                
                if(careTypeCompleted === care.name){
                    let newDueDate = moment(careCompleteDate).add(frequency, 'months').format('YYYY-MM-DD');
                
                    const objectToSend = {
                        petId: dataToSend.pet_id,
                        vetId: dataToSend.vet_id,
                        careType: care.name,
                        previousDate: careCompleteDate,
                        dueDate: newDueDate,
                    };
                
                    const action = {type: 'NEW_CARE_DATES', payload: objectToSend}

                    this.props.dispatch(action);
                }   
            }
        }
        
        console.log('care completeDate', careCompleteDate);



        setTimeout(() => {

            this.refreshCareHistory();

        }, 200);
    }


    undoCompleteCare = (dataToSend) => () => {
        console.log('in completeCare', dataToSend);

        const action = { type: 'COMPLETE_CARE', payload: dataToSend };

        this.props.dispatch(action);

        //create new due date for next reminder
        let careCompleteDate = new Date();
        careCompleteDate = moment(careCompleteDate).format('YYYY-MM-DD');

        let careTypesCompleted = dataToSend.care_type;
        console.log('careTypesCompleted', careTypesCompleted);

        let careTypes = this.props.careTypes.careTypeInfo;


        //compare care types completed to careTypes to get correct frequency for care type
        for (let careTypeCompleted of careTypesCompleted) {
            for (let care of careTypes) {
                const frequency = care.frequency;

                if (careTypeCompleted === care.name) {
                    let newDueDate = moment(careCompleteDate).add(frequency, 'months').format('YYYY-MM-DD');

                    const objectToSend = {
                        petId: dataToSend.pet_id,
                        vetId: dataToSend.vet_id,
                        careType: care.name,
                        previousDate: careCompleteDate,
                        dueDate: newDueDate,
                    };

                    const action = { type: 'UNDO_NEW_CARE_DATES', payload: objectToSend }

                    this.props.dispatch(action);
                }
            }
        }

        console.log('care completeDate', careCompleteDate);



        setTimeout(() => {

            this.refreshCareHistory();

        }, 200);
    }

    refreshCareHistory = () => {
        console.log('in refreshCareHistory');
        const action = { type: 'GET_CARE_HISTORY', payload: this.props.user.id }

        this.props.dispatch(action);
    }

    //change filter term for date range
    handleChangeForTimeFilter = (event) => {
        let timeFilter = event.target.value;
        
        this.setState({
            timeFilter: timeFilter,
        });
    }

    //change filter term for sent status of reminder
    changeSentStatus = () =>{
        if(this.state.sentStatus === false){
            this.setState({
                sentStatus: true,
            })
        }
        else if(this.state.sentStatus === true){
            this.setState({
                sentStatus: false,
            });
        }
    }

    changeCompleteStatus = () => {
        if(this.state.completeStatus === false){
            this.setState({
                completeStatus: true,
            });
        }
        else if(this.state.completeStatus === true){
            this.setState({
                completeStatus: false,
            });
        }
    }

    filterSentReminders = (careObj) => {
        console.log('in filterSentReminders');

        if(careObj.notification_sent === this.state.sentStatus){
            return true;
        }
        return false;
    }

    filterCompleteCare = (careObj) => {
        console.log('in filterCompleteCare');

        if(careObj.complete_care === this.state.completeStatus){
            return true;
        }
        return false;
    }

    filterForTime = (careObj) =>{

        console.log('in filterForTime');

        let startDate;
        let endDate;
        let range;

        let dueDate = moment( new Date(careObj.due_date));
        
         if(this.state.timeFilter === 'week'){
            
            startDate = moment(new Date()).format('YYYY-MM-DD');
            
            endDate = moment(startDate).add(7, 'days').format('YYYY-MM-DD');
         
            range = moment.range(startDate, endDate);
        
            if(range.contains(dueDate)){
                
                 return true;
            }  
         }
         else if (this.state.timeFilter === 'month') {

             startDate = moment(new Date()).format('YYYY-MM-DD');
             console.log('startDate:', startDate);

             endDate = moment(startDate).add(1, 'months').format('YYYY-MM-DD');
             console.log("endDate:", endDate);
             console.log("dueDate:", moment(dueDate).format('YYYY-MM-DD'));

             range = moment.range(startDate, endDate);
             console.log('range:', range);

             console.log('range contains', range.contains(dueDate));

             if (range.contains(dueDate)) {
               
                 return true;
             }
         }
         else if (this.state.timeFilter === '3_months') {

             startDate = moment(new Date()).format('YYYY-MM-DD');
             console.log('startDate:', startDate);

             endDate = moment(startDate).add(3, 'months').format('YYYY-MM-DD');
             console.log("endDate:", endDate);
             console.log("dueDate:", moment(dueDate).format('YYYY-MM-DD'));

             range = moment.range(startDate, endDate);
             console.log('range:', range);

             console.log('range contains', range.contains(dueDate));

             if (range.contains(dueDate)) {
              
                 return true;
             }
         }
         else if (this.state.timeFilter === '6_months') {

             startDate = moment(new Date()).format('YYYY-MM-DD');
             console.log('startDate:', startDate);

             endDate = moment(startDate).add(6, 'months').format('YYYY-MM-DD');
             console.log("endDate:", endDate);
             console.log("dueDate:", moment(dueDate).format('YYYY-MM-DD'));

             range = moment.range(startDate, endDate);
             console.log('range:', range);

             console.log('range contains', range.contains(dueDate));

             if (range.contains(dueDate)) {
            
                 return true;
             }
         }
         else if (this.state.timeFilter === 'year') {

             startDate = moment(new Date()).format('YYYY-MM-DD');
             console.log('startDate:', startDate);

             endDate = moment(startDate).add(12, 'months').format('YYYY-MM-DD');
             console.log("endDate:", endDate);
             console.log("dueDate:", moment(dueDate).format('YYYY-MM-DD'));

             range = moment.range(startDate, endDate);
             console.log('range:', range);

             console.log('range contains', range.contains(dueDate));

             if (range.contains(dueDate)) {
                 return true;
             }
         }
         else if (this.state.timeFilter === 'all') {
            return true; 
         }  

        return false;
    }

    

    render(){
        let content = null;

        let sentCheckBtn = null;
        let completeCareCheckBtn = null;

        if (this.props.user.userName && this.props.careHistory.careHistoryReducer){

            const sortTerm = this.state.sortItem

            
            let careArrOne = this.props.careHistory.careHistoryReducer;
            careArrOne = careArrOne.filter(this.filterCompleteCare);
            careArrOne = careArrOne.filter(this.filterSentReminders);
            careArrOne = careArrOne.filter(this.filterForTime);

            console.log('filtered array', careArrOne);

            //sort array dynamically based on sort term
            const careArr = careArrOne.sort((a,b) => (a[sortTerm] > b[sortTerm]));
            
            //conditional render sent reminders button
            if(this.state.sentStatus === false){
                sentCheckBtn = (
                    <button type="button" onClick={this.changeSentStatus}>Sent Reminders</button>
                )
            }
            else if(this.state.sentStatus === true){
                sentCheckBtn = (
                    <button type="button" onClick={this.changeSentStatus}>Unsent Reminders</button>
                )
            }
            
            //conditional render completed care button
            if(this.state.completeStatus === false){
                completeCareCheckBtn = (
                    <button type="button" onClick={this.changeCompleteStatus}>Completed Care</button>
                ) 
            }
            else if(this.state.completeStatus === true){
                completeCareCheckBtn = (
                    <button type="button" onClick={this.changeCompleteStatus}>Uncompleted Care</button>
                )
            }

            content = (

                <div>
                    <select 
                        id="timeFilterDropDown"
                        onChange={this.handleChangeForTimeFilter}
                        >
                        <option value="week">week</option>
                        <option value="month">month</option>
                        <option value="3_months">3 months</option>
                        <option value="6_months">6 months</option>
                        <option value="year">year</option>
                        <option value="all">all</option>
                    </select>
                    {sentCheckBtn}
                    {completeCareCheckBtn}
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
                                        <button 
                                            onClick={this.completeCare(care)}
                                            type="button"
                                        >Complete
                                        </button>
                                    )
                                }
                                else if(care.complete_care === true){
                                    completeButton = (
                                        <button 
                                            onClick={this.undoCompleteCare(care)}
                                            type="button"
                                        >Undo
                                        </button>
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
                                    <tr className = {rowClass} key={care.pet_id + care.name + careType + care.due_date} id={care.pet_id + care.name + careType}>
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