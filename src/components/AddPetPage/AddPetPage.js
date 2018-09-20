import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    care_types: '',
    rabies_date: 'na',
    canine_distemper_date: 'na',
    bordatella_date: 'na',
    lyme_date: 'na',
    feline_distemper_date: 'na',
    leukemia_date: 'na',
    addPetForm: true,
}

class AddPetPage extends Component {

    constructor(props){
        super(props);

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
        
        this.setState({
            ...this.state,
            [propertyName]: event.target.value,
        });
    }

    showCareTypes = () => {
        if(this.state.name === '' || this.state.species === '' ||
            this.state.age === '' || this.state.sex === '' || this.state.weight === ''){
            alert('please fill out all fields');
        }
        else{
            this.setState({
                ...this.state,
                addPetForm: false,
            });
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
                                <button type="button" onClick={this.showCareTypes}>Submit</button>
                            </form>
                        </div>
                    </div>
                );
            }
            else if(this.state.addPetForm === false){
                content = (
                    <div className="pageContainer">
                        <h3>Add Care History</h3>
                        <div className="formContainer">
                            <form>
                                <div className="formSection">
                                    <label htmlFor="rabies_date">Rabies</label>
                                </div>
                                <div className="formSection">
                                    <label htmlFor="distemper_date">Canine Distemper Combo</label>
                                </div>
                                <div className="formSetion">
                                    <label htmlFor="bordatella_date">Bordatella</label>
                                </div>
                                <div className="formSetion">
                                    <label htmlFor="lyme_date">Lyme</label>
                                </div>
                                <div className="formSetion">
                                    <label htmlFor="feline__distemper_date">Feline Distemper Combo</label>
                                </div>
                                <div className="formSetion">
                                    <label htmlFor="Leukemia">Leukemia</label>
                                </div>
                            </form>
                        </div>
                    </div>
                )
               
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