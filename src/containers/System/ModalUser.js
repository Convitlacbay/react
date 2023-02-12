import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter()
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState = ({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }

    componentDidMount() {

    }

    toggle = () => {//cong tat dong mo
        this.props.toggleModalUser()
    }

    handleOnchangeInput = (event, id) => {
        //bad code

        // this.state[id] = event.target.value
        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log(`check bad code: `, this.state)
        // })

        //good code

        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState,
        })
        // , () => {
        //     console.log(`check code: `, this.state)
        // })// lay gia tri trong input
    }

    checkValideInput = () => {
        let isValide = true
        let arrInput = [`email`, `password`, `firstName`, `lastName`, `address`,]
        // if (!this.state.email) {
        //     alert(`Missing email`)
        //     return false
        // }
        for (let i = 0; i < arrInput.length; i++) {
            // console.log(`check loop`, this.state[arrInput[i]], arrInput[i])
            if (!this.state[arrInput[i]]) {
                isValide = false
                alert(`Missing required parameter: ` + arrInput[i])
                break
            }
        }
        return isValide
    }

    handleAddNewUser = () => {
        let isValide = this.checkValideInput()
        if (isValide === true) {
            // call apis
            this.props.createNewUser(this.state, `abc`)
            // console.log('data modal', this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={`modal-user-container`}
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email:</label>
                            <input type="email" className=""
                                value={this.state.email}
                                onChange={(event) => { this.handleOnchangeInput(event, `email`) }} />
                        </div>
                        <div className='input-container'>
                            <label>Password:</label>
                            <input type="password" className=""
                                value={this.state.password}
                                onChange={(event) => { this.handleOnchangeInput(event, `password`) }} />
                        </div>
                        <div className='input-container'>
                            <label>First Name:</label>
                            <input type="text" className=""
                                value={this.state.firstName}
                                onChange={(event) => { this.handleOnchangeInput(event, `firstName`) }} />
                        </div>
                        <div className='input-container'>
                            <label>Last Name:</label>
                            <input type="text" className=""
                                value={this.state.lastName}
                                onChange={(event) => { this.handleOnchangeInput(event, `lastName`) }} />
                        </div>
                        <div className='input-container'>
                            <label>Address:</label>
                            <input type="text" className=""
                                value={this.state.address}
                                onChange={(event) => { this.handleOnchangeInput(event, `address`) }} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3'
                        onClick={() => { this.handleAddNewUser() }}>Save</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



