import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }
    componentDidMount() {
        let user = this.props.userEdit
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'qweasd',// khoong nen tra ve
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
        console.log('check componentDidMount: ', this.props.userEdit)
    }

    toggle = () => {//cong tat dong mo
        this.props.toggleModalEditUser()
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

    handleSaveUser = () => {
        let isValide = this.checkValideInput()
        if (isValide === true) {
            // call apis
            this.props.editUser(this.state)
            // console.log('data modal', this.state);
        }
    }

    render() {
        console.log('render', this.props)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={`modal-user-container`}
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email:</label>
                            <input type="email" className=""
                                value={this.state.email}
                                disabled
                                onChange={(event) => { this.handleOnchangeInput(event, `email`) }} />
                        </div>
                        <div className='input-container'>
                            <label>Password:</label>
                            <input type="password" className=""
                                disabled
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
                        onClick={() => { this.handleSaveUser() }}>Save</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



