import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import './TableComponent.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortDown } from '@fortawesome/free-solid-svg-icons'

//arrow icon for sorting
library.add(faSortDown)


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
            timeFilter: 'all',
            sentStatus: false,
            completeStatus: false,
            searchTerm: '',
        }
    }
    
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        
        this.setState({
            timeFilter: 'all',
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

         const action = {
             type: 'SEND_REMINDER', payload: { dataToSend: dataToSend, vetPhone: this.props.user.phone}};

         this.props.dispatch(action);

         setTimeout(() => {

             this.refreshCareHistory();
           
         }, 10);
    }

    //function to send all current shown history rows a message
    sendAllMessages = (arr) => {
        console.log('in sendAllMessages', arr);

        for(let careObj of arr){
            console.log('send for:', careObj);

            const action = { type: 'SEND_REMINDER', payload: { dataToSend: careObj, vetPhone: this.props.user.phone }};

            this.props.dispatch(action);

            setTimeout(() => {

                this.refreshCareHistory();

            }, 10);
            
        }
    }

    //mark history event as completed and create new event
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

    //remove new events and mark event as undone
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

    //refresh table shown on DOM
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

    //change local state for filter term for sent status of reminder
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

    //change local state for filter
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

    handleSearchChange = (event) => {
        console.log('handleSearchChange:', event.target.value);

        this.setState({
            searchTerm: event.target.value,
        });
    }

    //FILTERS
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

    filterSearch = (careObj) => {
        //if search field is empty
        if(this.state.searchTerm === ''){
            return true;
        }
        else{
            let firstName = careObj.first_name;
            let lastName = careObj.last_name;
            let petName = careObj.name;

            firstName = firstName.toLowerCase();
            lastName = lastName.toLowerCase();
            petName = petName.toLowerCase();

            firstName = firstName.split('');
            lastName = lastName.split('');
            petName = petName.split('');

            let searchString = this.state.searchTerm;
            searchString = searchString.toLowerCase();

            let searchStringArr = searchString.split('');


            for (let i = 0; i <= searchStringArr.length; i++) {
                if (i < searchStringArr.length) {
                    if (searchStringArr[i] === firstName[i]) {
                        continue;
                    }
                    else if (searchStringArr[i] === lastName[i]) {
                        continue;
                    }
                    else if (searchStringArr[i] === petName[i]) {
                        continue;
                    }
                    else {
                        break;
                    }
                }
                else if (i === searchStringArr.length) {
                    return true;
                }
            }
            return false;
        }  
    }

    render(){

        let content = null;

        let sentCheckBtn = null;
        let completeCareCheckBtn = null;

        let nameSortIcon = null;
        let petSortIcon = null;
        let careSortIcon = null;
        let dueDateSortIcon = null;
        let lastDateSortIcon = null;

        if(this.state.sortItem == 'last_name'){
            nameSortIcon = (
                <FontAwesomeIcon icon='sort-down'/>
            )
        }
        else if(this.state.sortItem == 'name'){
            petSortIcon = (
                <FontAwesomeIcon icon='sort-down' />
            )
        }
        else if (this.state.sortItem == 'care_type') {
            careSortIcon = (
                <FontAwesomeIcon icon='sort-down' />
            )
        }
        else if (this.state.sortItem == 'due_date') {
            dueDateSortIcon = (
                <FontAwesomeIcon icon='sort-down' />
            )
        }
        else if (this.state.sortItem == 'previous_date') {
            lastDateSortIcon = (
                <FontAwesomeIcon icon='sort-down' />
            )
        }

        if (this.props.user.userName && this.props.careHistory.careHistoryReducer){

            const sortTerm = this.state.sortItem

            
            let careArrOne = this.props.careHistory.careHistoryReducer;
            careArrOne = careArrOne.filter(this.filterCompleteCare);
            careArrOne = careArrOne.filter(this.filterSentReminders);
            careArrOne = careArrOne.filter(this.filterForTime);
            careArrOne = careArrOne.filter(this.filterSearch);

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
                    <div className="filtersContainer">
                        <div className="searchFormWrapper">
                            <label>Search</label>
                            <input
                                type="text"
                                onChange={this.handleSearchChange}
                                placeHolder="Pet or Owner" 
                            />
                        </div>
                        <select
                            className="timeSelect"
                            id="timeFilterDropDown"
                            onChange={this.handleChangeForTimeFilter}
                        >
                            <option value="all">all</option>
                            <option value="week">week</option>
                            <option value="month">month</option>
                            <option value="3_months">3 months</option>
                            <option value="6_months">6 months</option>
                            <option value="year">year</option>
                        </select>
                        <div className="filterButtons">
                            {sentCheckBtn}
                            {completeCareCheckBtn}
                        </div>
                        
                    </div>
                    
                    
                    <table>
                        <thead>
                            <tr>
                                <th 
                                    onClick={this.handleSortChange("last_name")} 
                                    name="last_name">
                                    <p>Owner{nameSortIcon}</p>
                                </th>
                                <th 
                                    onClick={this.handleSortChange("name")} 
                                    name="name" >
                                    <p>Pet{petSortIcon}</p>
                                    </th>
                                <th 
                                    onClick={this.handleSortChange("care_type")} 
                                    name="care_type" >
                                    <p>Care{careSortIcon}</p>
                                    </th>
                                <th 
                                    onClick={this.handleSortChange("due_date")} 
                                    name="due_date">
                                    <p>Due Date{dueDateSortIcon}</p>
                                    </th>
                                <th 
                                    onClick={this.handleSortChange("previous_date")}
                                    name="previous_date">
                                    <p>Last Date{lastDateSortIcon}</p>
                                    </th>
                                <th>
                                    Notification
                                    <button className="sendBtn"
                                        onClick={() => this.sendAllMessages(careArr)}
                                        type="button"
                                    >Send All
                                    </button>
                                </th>
                                <th>Complete Care</th>
                            </tr>
                        </thead>
                        <div className="tbodyContainer">
                        <tbody>
                            {careArr.map((care) => {
                                let sendButton = null;
                                if(care.notification_sent === false){
                                    
                                    sendButton = (
                                        <button 
                                            className="sendBtn"
                                            onClick = {this.sendMessageData(care)}
                                            type="button"
                                        >Send
                                        </button>
                                    )
                                }
                                else if(care.notification_sent === true){
                                    sendButton = (
                                        <button 
                                            className="sendBtn"
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
                                            className="completeBtn"
                                            onClick={this.completeCare(care)}
                                            type="button"
                                        >Complete
                                        </button>
                                    )
                                }
                                else if(care.complete_care === true){
                                    completeButton = (
                                        <button 
                                            className="completeBtn"
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
                                        <td className="ownerName"><a href={profileLink}>{care.first_name + ' ' + care.last_name}</a></td>
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
                        </div>
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