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
    width: '',
    care_types: '',
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
    

    handleChangeFor = propertyName => (event) => {
        
    }

    handleChangeForRadio = propertyName => (event) => {

    }

    handleChangeForSpecies = propertyName => (event) => {

    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div className="pageContainer">
                    <h1>Add a New Pet</h1>
                    <div className="formContainer">
                        <form>
                            <div className="formSection">
                                <label htmlFor="name">Name: </label>
                                    <input 
                                        type="text"
                                        name="name"
                                        onChange={this.handleChangeFor("name")}
                                    />
                            </div>
                            <div className="formSection">
                                <label htmlFor="species">Species: </label>
                                <label htmlFor="#caninde">Canine</label>
                                <input
                                    id="canine"
                                    type="radio"
                                    name="species"
                                    value="canine"
                                    onChange={this.handleChangeForSpecies("species")}
                                /> 
                                <label htmlFor="#feline">Feline</label>
                                <input
                                    id="feline"
                                    type="radio"
                                    name="species"
                                    value= "feline"
                                    onChange={this.handleChangeForSpecies("species")}
                                />
                            </div>
                            <div className="formSection">
                                <label htmlFor="breed">Breed:</label>
                                <input 
                                    type="text"
                                    name="breed"
                                    onChange={this.handleChangeFor("breed")}
                                />
                            </div>
                            <div className="formSection">
                                <label htmlFor="age">Age: </label>
                                <input
                                    type="number"
                                    step="1"
                                    name="age"
                                    onChange={this.handleChangeFor("age")}
                                />
                            </div>
                            <div className="formSection">
                                <label htmlFor="sex">Sex:  </label>
                                <label htmlFor="#male">M</label>
                                <input
                                    id="male"
                                    type="radio"
                                    name="sex"
                                    onChange={this.handleChangeForRadio("sex")}
                                /> 
                                <label htmlFor="#female">F</label>
                                <input
                                    id="female"
                                    type="radio"
                                    name="sex"
                                    onChange={this.handleChangeForRadio("sex")}
                                />
                            </div>
                            <div className="formSection">
                                <label htmlFor="weight">Weight: </label>
                                <input
                                    type="number"
                                    step="1"
                                    name="weight"
                                    onChange={this.handleChangeFor("weight")}
                                />
                            </div>
                            <button>Submit</button>
                        </form>
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
export default connect(mapStateToProps)(AddPetPage);