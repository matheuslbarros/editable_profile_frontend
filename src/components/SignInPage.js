import React from 'react';
import { connect } from 'react-redux'
import { Button, Alert } from 'react-bootstrap';

import { FieldGroup } from './FieldGroup';
import { auth as authApi } from '../api';

const mapStateToProps = state => ({ ...state.common });

const mapDispatchToProps = dispatch => ({
    onLogin: (data) => dispatch({ type: 'LOGIN', payload: data })
});

class SignInPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: null,
                password: null,
            },
            error: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.id;
        const value = event.target.value;

        this.setState({
            user: {
                ...this.state.user,
                [name]: value,
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: null });

        authApi.signIn(this.state.user)
            .then(data => {
                this.props.onLogin(data);
            })
            .catch(err => {
                if (err.response) {
                    this.setState({ error: err.response.data });
                } else {
                    this.setState({ error: new Error('Authentication fail') });
                }
            });
    }

    render() {
        return (
            <div>
                <h1>Sign in</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.state.error && (
                        <Alert bsStyle="warning">{this.state.error.message}</Alert>
                    )}
                    <FieldGroup id="email" label="Email" type="email" required placeholder="Enter your email" onChange={this.handleInputChange}></FieldGroup>
                    <FieldGroup id="password" label="Password" type="password" required placeholder="Enter your password" onChange={this.handleInputChange}></FieldGroup>
                    <Button type="submit">Sign in</Button>
                </form>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);