import React, { Component } from 'react';
import { connect } from 'react-redux';

//material ui 
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';


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
    rabies_date: '',
    canine_distemper_date: '',
    bordatella_date: '',
    lyme_date: '',
    feline_distemper_date: '',
    leukemia_date: '',
    addPetForm: true,
}

class AddPetPage extends Component {

    constructor(props){
        super(props);
        
        const { classes } = props;
        this.state = addPetObj;
    }


    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        console.log(this.props);

    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }
    

    handleChangeForPet = propertyName => (event) => {
        console.log(event.target.value);
        this.setState({
            ...this.state,
            [propertyName]: event.target.value,
        });
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
        
        //make sure all dates of previous vaccinations are provided
        if(this.state.rabies_date === '' || this.state.canine_distemper_date === '' || 
            this.state.bordatella_date === '' || this.state.lyme === ''){
                alert('please provide all dates.');
            }
        else{
            const action = {type: 'ADD_PET', payload: this.state}

            this.props.dispatch(action);
        }
    }


    submitCatInfo = (event) => {
        event.preventDefault();

        //make sure all dates of previous vaccinations are provided
        if(this.state.rabies_date === '' || this.state.feline_distemper_date || 
            this.state.leukemia_date === ''){
                alert('please provide all dates.')
            }
        else{
            const action = { type: 'ADD_PET', payload: this.state }

            this.props.dispatch(action);
        }
    }

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
                                    />
                                </div>
                                <div className="formSection">
                                    <label htmlFor="species">Species: </label>
                                    <label htmlFor="#canine">Canine</label>
                                    <input
                                        id="canine"
                                        type="radio"
                                        name="species"
                                        value="canine"
                                        onChange={this.handleChangeForPet("species")}
                                    />
                                    <label htmlFor="#feline">Feline</label>
                                    <input
                                        id="feline"
                                        type="radio"
                                        name="species"
                                        value="feline"
                                        onChange={this.handleChangeForPet("species")}
                                    />
                                </div>
                                <div className="formSection">
                                    <label htmlFor="breed">Breed:</label>
                                    <input
                                        type="text"
                                        name="breed"
                                        onChange={this.handleChangeForPet("breed")}
                                    />
                                </div>
                                <div className="formSection">
                                    <label htmlFor="age">Age: </label>
                                    <input
                                        type="number"
                                        step="1"
                                        name="age"
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
                                        onChange={this.handleChangeForPet("sex")}
                                    />
                                    <label htmlFor="#female">F</label>
                                    <input
                                        id="female"
                                        type="radio"
                                        name="sex"
                                        value="F"
                                        onChange={this.handleChangeForPet("sex")}
                                    />
                                </div>
                                <div className="formSection">
                                    <label htmlFor="weight">Weight: </label>
                                    <input
                                        type="number"
                                        step="1"
                                        name="weight"
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
                                            name="rabies_date"
                                            label="Rabies Date"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForPet("rabies_date")}
                                        />
                                    </div>
                                    <div className="formSection">
                                        <TextField
                                            name="canine_distemper_date"
                                            label="Canine Distemper Combo Date"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForPet("canine_distemper_date")}
                                        />
                                    </div>
                                    <div className="formSetion">
                                        <TextField
                                            name="bordatella_date"
                                            label="Bordatella"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForPet("bordatella_date")}

                                        />
                                    </div>
                                    <div className="formSetion">
                                        <TextField
                                            name="lyme_date"
                                            label="Lyme Date"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForPet("lyme_date")}

                                        />
                                    </div>
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
                                            name="rabies_date"
                                            label="Rabies Date"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForPet("rabies_date")}
                                        />
                                    </div>
                                    <div className="formSetion">
                                        <TextField
                                            name="feline_distemper_date"
                                            label="Feline Distemper Combo Date"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForPet("feline_distemper_date")}

                                        />
                                    </div>
                                    <div className="formSetion">
                                        <TextField
                                            name="leukemia_date"
                                            label="Leukemia"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChangeForPet("leukemia_date")}
                                        />
                                    </div>
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