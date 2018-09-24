import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

//material ui 
import TextField from '@material-ui/core/TextField';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
    careTypes: state.careTypes
});


const addPetObj = {
    name: '',
    species: '',
    breed: '',
    age: '',
    sex: '',
    weight: '',
    care_dates: [],
    addPetForm: true,
    ownerId: '',
    date: moment(new Date).format('YYYY-MM-DD'),
}

class AddPetPage extends Component {

    constructor(props){
        super(props);
        
        this.state = addPetObj;
    }


    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        console.log(this.props);
        console.log('id', this.props.match.params.id);
        
        const action = {type: 'GET_CARE_TYPES'};
        this.props.dispatch(action);

        
        setTimeout(this.initializePetInfo, 1);
          
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.replace('/#/home');
        }       
    }

    initializePetInfo = () => {
        console.log('in initializePetInfo');
        this.setState({
            ...this.state,
            ownerId: this.props.match.params.id,
            date: this.state.date,
        })
    }

    handleChangeForPet = propertyName => (event) => {
        //console.log('stats', event.target.value);
        this.setState({
            ...this.state,
            [propertyName]: event.target.value,
        });
    }

    handleChangeForDate = (event) => {
        
        //console.log('careTypes', this.props.careTypes.careTypeInfo);
        console.log('in handleChangeforDate');

        let careTypes = this.props.careTypes.careTypeInfo;

        //loop through care types from redux store
        for(let care of careTypes){
            console.log('in loop');
            if(event.target.name === care.name){

                const name = event.target.name;
                const previousDate = event.target.value;

                const frequency = care.frequency;

                //calculate due date
                let dueDate = moment(previousDate).add(frequency, 'months').calendar();
                dueDate = moment(dueDate).format('YYYY-MM-DD');

                this.setState({
                    ...this.state,
                    care_dates: [...this.state.care_dates, {name: name, previousDate: previousDate, 
                                                            dueDate: dueDate}]
                });
            }
        }

        console.log('state', this.state);
    }

    showCareTypes = () => {
        if(this.state.name === '' || this.state.species === '' ||
            this.state.age === '' || this.state.sex === '' || this.state.weight === ''){
            alert('please fill out all fields.');
        }
        else{
            this.setState({
                ...this.state,
                addPetForm: false,
            });
        }
        
    }

    submitDogInfo = (event) => {
        event.preventDefault();
        console.log('submitDogInfo');
        //make sure all dates of previous vaccinations are provided
        if(this.state.care_dates.lengh < 4){
                alert('please provide all dates for dog.');
            }
        else{
            const action = {type: 'ADD_PET', payload: this.state}

            this.props.dispatch(action);
        }
    }//end submitDogInfo


    submitCatInfo = (event) => {
        event.preventDefault();

        //make sure all dates of previous vaccinations are provided
        if(this.state.care_dates.length < 3){
                alert('please provide all dates.')
            }
        else{
            const action = { type: 'ADD_PET', payload: this.state }

            this.props.dispatch(action);
        }
    }//end submitCatInfo

    //function to show add pet form 
    goBack = (event) => {
        this.setState({
            ...this.state,
            addPetForm: true,
        });
    }//end goBack

    render() {
        let content = null;

        if (this.props.user.userName) {
            if(this.state.addPetForm === true){
                content = (
                    <div className="pageContainer">
                        {JSON.stringify(this.props.careTypes.careTypeInfo)}
                        <h3>Add a New Pet</h3>
                        <div className="formContainer">
                            <form>
                                <div className="formSection">
                                    <label htmlFor="name">Name: </label>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={this.handleChangeForPet("name")}
                                        value={this.state.name}
                                    />
                                </div>
                                <div className="formSection">
                                    <label htmlFor="species">Species: </label>
                                    <label htmlFor="#canine">Canine</label>
                                    <input
                                        id="canine"
                                        type="radio"
                                        name="species"
                                        value= "canine"
                                        checked={this.state.species === "canine"}
                                        onChange={this.handleChangeForPet("species")}
                                        
                                    />
                                    <label htmlFor="#feline">Feline</label>
                                    <input
                                        id="feline"
                                        type="radio"
                                        name="species"
                                        value="feline"
                                        checked={this.state.species === "feline"}
                                        onChange={this.handleChangeForPet("species")}
                                    />
                                </div>
                                <div className="formSection">
                                    <label htmlFor="breed">Breed:</label>
                                    <input
                                        type="text"
                                        name="breed"
                                        value={this.state.breed}
                                        onChange={this.handleChangeForPet("breed")}
                                    />
                                </div>
                                <div className="formSection">
                                    <label htmlFor="age">Age: </label>
                                    <input
                                        type="number"
                                        step="1"
                                        name="age"
                                        value={this.state.age}
                                        onChange={this.handleChangeForPet("age")}
                                    />
                                </div>
                                <div className="formSection">
                                    <label htmlFor="sex">Sex:  </label>
                                    <label htmlFor="#male">M</label>
                                    <input
                                        id="male"
                                        type="radio"
                                        name="sex"
                                        value="M"
                                        checked={this.state.sex === "M"}
                                        onChange={this.handleChangeForPet("sex")}
                                    />
                                    <label htmlFor="#female">F</label>
                                    <input
                                        id="female"
                                        type="radio"
                                        name="sex"
                                        value="F"
                                        checked={this.state.sex === "F"}
                                        onChange={this.handleChangeForPet("sex")}
                                    />
                                </div>
                                <div className="formSection">
                                    <label htmlFor="weight">Weight: </label>
                                    <input
                                        type="number"
                                        step="1"
                                        name="weight"
                                        value={this.state.weight}
                                        onChange={this.handleChangeForPet("weight")}
                                    /> lbs.
                                </div>
                                <button type="button" onClick={this.showCareTypes}>Next</button>
                            </form>
                        </div>
                    </div>
                );
            }
            else if(this.state.addPetForm === false){
                if(this.state.species === 'canine'){
                    content = (
                        <div className="pageContainer">
                            <h3>Add Dog Care History</h3>
                            <div className="formContainer">
                                <form onSubmit={this.submitDogInfo}>
                                    <div className="formSection">
                                        <TextField
                                            name="rabies"
                                            label="Rabies Date"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForDate}
                                        />
                                    </div>
                                    <div className="formSection">
                                        <TextField
                                            name="canine_distemper"
                                            label="Canine Distemper Combo Date"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForDate}
                                        />
                                    </div>
                                    <div className="formSetion">
                                        <TextField
                                            name="bordetella"
                                            label="Bordetella"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForDate}

                                        />
                                    </div>
                                    <div className="formSetion">
                                        <TextField
                                            name="lyme"
                                            label="Lyme Date"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForDate}

                                        />
                                    </div>
                                    <button type="button" onClick={this.goBack}>Prev</button>
                                    <button >Submit</button>
                                </form>
                            </div>
                        </div>
                    )
                }
                else if(this.state.species === 'feline'){
                    content = (
                       <div className="pageContainer">
                            <h3>Add Cat Care History</h3>
                            <div className="formContainer">
                                <form onSubmit={this.submitCatInfo}>
                                    <div className="formSection">
                                        <TextField
                                            name="rabies"
                                            label="Rabies Date"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForDate}
                                        />
                                    </div>
                                    <div className="formSetion">
                                        <TextField
                                            name="feline_distemper"
                                            label="Feline Distemper Combo Date"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForDate}

                                        />
                                    </div>
                                    <div className="formSetion">
                                        <TextField
                                            name="leukemia"
                                            label="Leukemia"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForDate}
                                        />
                                    </div>
                                    <button type="button" onClick={this.goBack}>Prev</button>
                                    <button >Submit</button>
                                </form>
                            </div>
                       </div>
                    )
                }
               
            }
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
export default connect(mapStateToProps)(AddPetPage);