import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService'
import ModalUser from './ModalUser';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
        }
    }

    componentDidMount = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
            // }, () => {
            //     console.log('check state user', this.state.arrUsers); callback 
            // })
            // console.log('check state user', this.state.arrUsers);
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
        // alert('handleAddNewUser')
    }

    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
        // alert('toggleModalUser')
    }

    // life cycle
    // run component
    //     1. run constructor -> init state
    //     2. did Mount (set state)
    //     3. render

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="Users-container" >
                <ModalUser
                    isOpen={this.state.isOpenModalUser} //con=cha
                    toggleModalUser={this.toggleModalUser}
                />
                <div className='title text-center'>Helo UserManage</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}>Add new user</button>
                </div>
                <div className='users-table'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <a className='btn-edit'>Edit</a>
                                        <span>|</span>
                                        <a className='btn-delete'>Delete</a>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </table>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
