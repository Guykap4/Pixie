import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { loadUser } from '../store/actions/user-actions';
import { UserMsg } from '../cmps/UserMsg.jsx';


class _Login extends React.Component {
    state = {
        email: '',
        password: '',
        isUserMsg: false,
        msg: '',
    }

    handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({ ...prevState, [name]: value }));

    }

    userMsgShow = (msg) => {
        this.setState(prevState => ({ ...prevState, isUserMsg: true, msg: msg }));
        setTimeout(() => {
            this.setState(prevState => ({ ...prevState, isUserMsg: false, msg: '' }))
        }, 2000);
    }


    onSubmit = async (ev) => {
        ev.preventDefault();
        const { loadUser } = this.props;
        const { email, password } = this.state;
        if (!email || !password) {
            this.userMsgShow('Email address and password required');
            return;
        }

        const regexEmail = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
        if (!regexEmail.test(email)) {
            this.userMsgShow('Invalid Email');
            return;
        }

        const credentials = {
            email,
            password,
        }
        try {
            await loadUser(credentials)
            this.props.history.push('/profile/testy/websites');
        } catch (err) {
            this.userMsgShow('Invalid Email or Password');
        }
    }


    render() {
        const { isUserMsg, msg } = this.state;

        return (
            <>
                <div className="flex column align-center login-page-container">
                    <div className="title">
                        Login
                    </div>

                    <form>
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            id="email"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleChange}
                        />

                        <TextField
                            type="password"
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            id="password"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleChange}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            className="send-btn"
                            variant="contained"
                            margin="normal"
                            onClick={this.onSubmit}
                        >
                            Login
                            </Button>

                        <div className="text-center flex column align-center toggle-sign-link">
                            <span>
                                Don't have an account?
                                </span>
                            <Link to="signup">
                                SignUp
                            </Link>
                        </div>
                    </form>
                </div>

                {isUserMsg && < UserMsg msg={msg} />}
            </>
        );
    }
}



const mapDispatchToProps = {
    loadUser,
}


export const Login = connect(null, mapDispatchToProps)(_Login)