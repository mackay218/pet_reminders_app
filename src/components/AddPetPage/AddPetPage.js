import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

//material ui 
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { isMoment } from 'moment';


const mapStateToProps = state => ({
    user: state.user,
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
    date: moment(new Date).format('YYYY-MM-DD').replace(/\//g, "-"),
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
        this.setState({
            ...this.state,
            ownerId: parseInt(this.props.match.params.id),
        });
        
        console.log(moment(new Date).format('YYYY-MM-DD').replace(/\//g, "-"));

    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }
    

    handleChangeForPet = propertyName => (event) => {
        console.log('stats', event.target.value);
        this.setState({
            ...this.state,
            [propertyName]: event.target.value,
        });
    }

    handleChangeForDate = (event) => {
        
        const careObj = {name: event.target.name, date: event.target.value};

        this.setState({
            care_dates: [...this.state.care_dates, careObj],
        });

        console.log(this.state);
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
                                            defaultValue= {this.state.date}
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
                                            defaultValue={this.state.date}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForDate}
                                        />
                                    </div>
                                    <div className="formSetion">
                                        <TextField
                                            name="bordatella"
                                            label="Bordatella"
                                            type="date"
                                            defaultValue={this.state.date}
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
                                            defaultValue={this.state.date}
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
                                            defaultValue={this.state.date}
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
                                            defaultValue={this.state.date}
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
                                            defaultValue={this.state.date}
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