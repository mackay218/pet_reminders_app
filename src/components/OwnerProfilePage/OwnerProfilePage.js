import React, { Component } from 'react';
import { connect } from 'react-redux';
//styles for this component
import './OwnerProfilePage.css';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const mapStateToProps = state => ({
    user: state.user,
    owner: state.owner,
    petsInfo: state.petsInfo,
});

class OwnerProfilePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            open: false,
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getOwnerInfo();

        if (this.props.petsInfo.onePetInfo) {
            console.log('sex of pet');
            if (this.props.petsInfo.onePetInfo.sex === 'M') {
                this.setState({
                    sex: 'M',
                });
            }
            else if (this.props.petsInfo.onePetInfo.sex === 'F') {
                this.setState({
                    sex: 'F',
                });
            }
            console.log(this.state);
        }
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.replace('/#/home');
        }
       
    }

    //GET 
    //function to get specific owner info
    getOwnerInfo = () => {

        console.log('getOwnerInfo page', this.props.match.params.id);

        //get owner id from address bar
        const ownerId = this.props.match.params.id

        const action = { type: 'GET_OWNER_INFO', payload: ownerId };

        this.props.dispatch(action);

    }// end getOwnerInfo

    //run saga to change owner info
    //handlge change in input fields
    handleChangeFor = propertyName => (event) => {
        const action = {
            type: 'SET_OWNER', payload: {
                ...this.props.owner.ownerInfo,
                [propertyName]: event.target.value,
            }
        }

        this.props.dispatch(action);

    } //end handleChangeFor


    //handle change in input field in pet dialog
    handleChangeForPet = (event) => {

        const action = {
            type: 'SET_ONE_PET', payload: {
                ...this.props.petsInfo.onePetInfo,
                [event.target.name]: event.target.value,
            }
        }

        this.props.dispatch(action);
    } //end handleChangeForPet

    //function to update owner information
    updateOwnerInfo = (event) => {
        event.preventDefault();
        if (this.props.owner.ownerInfo.first_name === '' ||
            this.props.owner.ownerInfo.last_name === '' ||
            this.props.owner.ownerInfo.phone === '' ||
            this.props.owner.ownerInfo.email === '' ||
            this.props.owner.ownerInfo.address === '') {
            alert('please fill out all fields');
        }
        else {
            const action = { type: 'UPDATE_OWNER_INFO', payload: this.props.owner.ownerInfo };

            this.props.dispatch(action);

            this.setState({
                editMode: false
            });
        }
    } //end updateOwnerInfo

    //function to update pet info
    updatePetInfo = (event) => {
        event.preventDefault();
        if (this.props.petsInfo.onePetInfo.name === '' ||
            this.props.petsInfo.onePetInfo.species === '' ||
            this.props.petsInfo.onePetInfo.age === '' ||
            this.props.petsInfo.onePetInfo.sex === '' ||
            this.props.petsInfo.onePetInfo.weight === '') {
            alert('please fill out required fields');
        }
        else {
            const action = { type: 'UPDATE_PET_INFO', payload: this.props.petsInfo.onePetInfo };

            this.props.dispatch(action);

            this.setState({
                open: false
            });

            this.getOwnerInfo();
        }
    } //end updatePetInfo

    //function to toggle edito mode by changing local state
    handleEditClick = () => {
        console.log('handleEditClick', this.state);
        this.setState({
            editMode: true,
        });
    } //end handleEditClick

    //function to toggle edit mode and re-render component from info in redux store
    cancelEdit = () => {
        this.setState({
            editMode: false
        });

        this.getOwnerInfo();
    } //end cancelEdit

    //function to dinamically populated and open dialog modal
    makeDialog = (event) => {
        console.log('makeDialog', event.target.id);
        const action = { type: 'GET_ONE_PET', payload: event.target.id };

        this.props.dispatch(action);

        this.setState({
            open: true,
        });
    } //end makeDialog

    // close dialog
    handleClose = () => {
        this.setState({ open: false });
    }; // end handleClose

    render() {
        let content = null;
        let contact_info = null;
        let notes = null;

        let pet_list = null;

        let pet_dialog = null;

        if (this.props.user.userName && this.props.owner.ownerInfo) {
            if (this.state.editMode === false) {
                contact_info = (
                    <div className="contactInfo ownerProfileSection">
                        <div className="infoSec">
                            <h4>Name</h4>
                            <p>First: {this.props.owner.ownerInfo.first_name}</p>
                            <p>Last: {this.props.owner.ownerInfo.last_name}</p>
                        </div>
                        <div className="infoSec">
                            <h4>Contact Info</h4>
                            <p>phone: {this.props.owner.ownerInfo.phone}</p>
                            <p className="emailInfo">email: {this.props.owner.ownerInfo.email}</p>
                            <p>address: {this.props.owner.ownerInfo.address}</p>
                        </div>
                        <div className="notesSection infoSec">
                            <label htmlFor="#notesParagraph">notes: </label>
                            <div className="notesContainer" id="notesContainer">

                                <p className="ownerNotes">{this.props.owner.ownerInfo.notes}</p>
                            </div>
                        </div>
                        <button type="button" onClick={this.handleEditClick}>Edit</button>
                    </div>
                );
            }
            else if (this.state.editMode === true) {
                contact_info = (
                    <div className="contactInfo">
                        <form onSubmit={this.updateOwnerInfo} className="contactInfoForm">
                            <div className="infoSec">
                                <h4>Name</h4>
                                <div className="inputSec">
                                    <label htmlFor="first_name">First:</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={this.props.owner.ownerInfo.first_name}
                                        onChange={this.handleChangeFor("first_name")}
                                    />
                                </div>
                                <div className="inputSec">
                                    <label htmlFor="last_name">Last:</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={this.props.owner.ownerInfo.last_name}
                                        onChange={this.handleChangeFor("last_name")}
                                    />
                                </div>
                            </div>
                            <div className="infoSec">
                                <h4>Contact Info</h4>
                                <div className="inputSec">
                                    <label htmlFor="phone">phone:</label>
                                    <PhoneInput
                                        name="phone"
                                        country='US'
                                        placeholder="Enter phone number"
                                        value={this.props.owner.ownerInfo.phone}
                                        onChange={this.handleChangeFor("phone")}
                                    />
                                </div>
                                <div className="inputSec">
                                    <label htmlFor="email">email:</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={this.props.owner.ownerInfo.email}
                                        onChange={this.handleChangeFor("email")}
                                    />
                                </div>
                                <div className="inputSec">
                                    <label htmlFor="address">address:</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={this.props.owner.ownerInfo.address}
                                        onChange={this.handleChangeFor("address")}
                                    />
                                </div>
                            </div>
                            <div className="notesSection">
                                <div className="infoSec">
                                    <label htmlFor="notesContainer">notes:</label>
                                    <div className="notesContainer" name="notesContainer">
                                        <textarea
                                            className="ownerNotes"
                                            value={this.props.owner.ownerInfo.notes}
                                            name="notes"
                                            onChange={this.handleChangeFor("notes")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="btnSec">
                                <button >Submit</button>
                                <button type="button" onClick={this.cancelEdit} name="cancel" >Cancel</button>
                            </div>

                        </form>
                    </div>
                );
            }
            content = (
                <div>
                    {contact_info}
                </div>
            );

            let ownerId = this.props.owner.ownerInfo.id;

            let addPetLink = "#/addPet/" + ownerId


            if (this.props.petsInfo.petInfo) {
                pet_list = (
                    <div className="petListSection ownerProfileSection">
                        <h4>Pets</h4>
                        <div className="petListContainer">
                            <ul className="petList" >
                                {this.props.petsInfo.petInfo.map((pet) => {
                                    return (
                                        <li id={pet.id} key={pet.id}
                                            onClick={this.makeDialog}>
                                            {pet.name}
                                        </li>
                                    );

                                })}
                            </ul>

                        </div>
                        <a className="newPetLink" href={addPetLink} >New Pet</a>
                    </div>
                );
            }
            else {
                pet_list = (
                    <div className="petListSection ownerProfileSection">
                        <div className="petListContainer">

                        </div>
                        <a href={addPetLink} >New Pet</a>
                    </div>
                );
            }

        }

        if (this.props.petsInfo.onePetInfo) {
            pet_dialog = (
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    modal={false}
                    style={this.state.dialogStyle}
                >
                    <DialogContent>
                        <div className="petInfoformContainer">
                            <h3 className="dialogTitle" >Pet Info</h3>
                            <form className="petInfoForm" onSubmit={this.updatePetInfo}>
                                <div className="petFormSection">
                                    <label htmlFor="name">name:</label>
                                    <input
                                        value={this.props.petsInfo.onePetInfo.name}
                                        name="name"
                                        onChange={this.handleChangeForPet}
                                    />
                                </div>
                                <div className="petFormSection">
                                    <p>Species: {this.props.petsInfo.onePetInfo.species}</p>
                                </div>
                                <div className="petFormSection">
                                    <label htmlFor="breed">breed:</label>
                                    <input
                                        value={this.props.petsInfo.onePetInfo.breed}
                                        name="breed"
                                        onChange={this.handleChangeForPet}
                                    />
                                </div>
                                <div className="petFormSection">
                                    <label htmlFor="age">age:</label>
                                    <input
                                        value={this.props.petsInfo.onePetInfo.age}
                                        type="number"
                                        name="age"
                                        onChange={this.handleChangeForPet}
                                    />
                                </div>
                                <div className="petFormSection">
                                    <label htmlFor="sex">sex:  </label>
                                    <label htmlFor="#male">M</label>
                                    <input
                                        id="male"
                                        type="radio"
                                        name="sex"
                                        value="M"
                                        checked={this.props.petsInfo.onePetInfo.sex === "M"}
                                        onChange={this.handleChangeForPet}
                                    />
                                    <label htmlFor="#female">F</label>
                                    <input
                                        id="female"
                                        type="radio"
                                        name="sex"
                                        value="F"
                                        checked={this.props.petsInfo.onePetInfo.sex === "F"}
                                        onChange={this.handleChangeForPet}
                                    />
                                </div>
                                <div className="petFormSection">
                                    <label htmlFor="weight">weight: </label>
                                    <input
                                        value={this.props.petsInfo.onePetInfo.weight}
                                        type="number"
                                        onChange={this.handleChangeForPet}
                                    />
                                </div>
                                <div className="petFormSection">
                                    <label htmlFor="notes">notes: </label>
                                    <textarea
                                        name="notes"
                                        value={this.props.petsInfo.onePetInfo.notes}
                                        onChange={this.handleChangeForPet}
                                    />
                                </div>
                                <div className="petFormBtnSec">
                                    <button>Submit</button>
                                    <button onClick={this.handleClose}>Close</button>
                                </div>


                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
            );
        }

        let titleName = null;

        if (this.props.owner.ownerInfo) {
            titleName = (
                <h3><span>{this.props.owner.ownerInfo.first_name}</span>
                    <span> </span>
                    <span>{this.props.owner.ownerInfo.last_name}</span></h3>
            );
        }

        if (this.props.user.userName) {
            return (
                <div className="pageContainer">
                    <Nav />
                    {titleName}
                    <div className="ownerProfile">

                        <div className="profileInfo">
                            {content}
                            {notes}
                        </div>
                        {pet_list}
                    </div>

                    {pet_dialog}
                </div>
            );
        }
        else {
            return (
                <p>loading</p>
            );
        }
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(OwnerProfilePage);