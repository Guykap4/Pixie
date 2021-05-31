import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/img/logo2.png';

export class _AppHeader extends React.Component {
    state = {
        isNavOpen: false
    }

    onToggleNav = () => {
        const { isNavOpen } = this.state;
        this.setState({ isNavOpen: !isNavOpen });
    }


    render() {
        const { isNavOpen } = this.state;
        const { user } = this.props

        return (
            <>
                <header className="main-header">
                    <div className="container flex space-between align-center">
                        <span><Link to="/"><img src={logo} className="logo" alt="Logo" /></Link></span>

                        <span>
                            <span className="fas pointer hamburger-icn" onClick={this.onToggleNav}></span>
                            <ul className={"clean-list navlinks-container" + (isNavOpen ? "" : " hider")}>
                                <li><NavLink to="/editor" activeClassName="active" onClick={this.onToggleNav}>Editor</NavLink></li>
                                <li><NavLink to="/templates" onClick={this.onToggleNav}>Templates</NavLink></li>
                                <li><NavLink to="/about" onClick={this.onToggleNav}>About</NavLink></li>

                                {user &&
                                    <>
                                        <li><NavLink to="/profile/aaa/websites" onClick={this.onToggleNav}>Profile</NavLink></li>
                                        <li>Logout</li>
                                    </>
                                }

                                {(!user) &&
                                    <li><NavLink to="/profile/login" onClick={this.onToggleNav}>Login</NavLink></li>}
                            </ul>
                        </span>
                    </div>
                </header>
                <div className="pseudo-header"></div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}

export const AppHeader = connect(mapStateToProps, null)(_AppHeader)