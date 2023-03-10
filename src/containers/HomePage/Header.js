import React, { Component, lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Header.scss';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions'

class Header extends Component {

    changeLanguage = (language) => {
        // redux events: actions
        // alert(language)
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fa-solid fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>
                                    <FormattedMessage
                                        id='homeheader.speciality' /></b>
                                </div>
                                <div className='sub-title'>
                                    <FormattedMessage
                                        id='homeheader.seachdoctor' />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage
                                    id='homeheader.healthfacility' /></b>
                                </div>
                                <div className='sub-title'>
                                    <FormattedMessage
                                        id='homeheader.selectroom' />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage
                                    id='homeheader.doctor' /></b>
                                </div>
                                <div className='sub-title'>
                                    <FormattedMessage
                                        id='homeheader.selectdoctor' />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage
                                    id='homeheader.fee' /></b>
                                </div>
                                <div className='sub-title'>
                                    <FormattedMessage
                                        id='homeheader.checkhealthy' />
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fa-solid fa-circle-question">
                                </i> <FormattedMessage
                                    id='homeheader.suport' />
                            </div>
                            <div className={language === LANGUAGES.VI ?
                                'language-vi active' : 'language-vi'}
                            ><span
                                onClick={() => this.changeLanguage(LANGUAGES.VI)}
                            >VN</span></div>
                            <div className={language === LANGUAGES.EN ?
                                'language-en active' : 'language-en'}
                            ><span
                                onClick={() => this.changeLanguage(LANGUAGES.EN)}
                            >EN</span></div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>
                            <FormattedMessage
                                id='banner.title1' />
                        </div>
                        <div className='title2'>
                            <FormattedMessage
                                id='banner.title2' />
                        </div>
                        <div className='search'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" className=''
                                placeholder='T??m chuy??n khoa kh??m b???nh' />
                        </div>
                    </div>
                    <div className='content-dow'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-regular fa-hospital"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage
                                        id='banner.child1' />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-regular fa-hospital"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage
                                        id='banner.child2' />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-regular fa-hospital"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage
                                        id='banner.child3' />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-regular fa-hospital"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage
                                        id='banner.child4' />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-regular fa-hospital"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage
                                        id='banner.child5' />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fa-regular fa-hospital"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage
                                        id='banner.child6' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        //injected
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
