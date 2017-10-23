import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

import ProfileForm from './ProfileForm';
import { auth as authApi } from '../api';

const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => ({
    redirectTo: (redirectTo) => dispatch({ type: 'REDIRECT_TO', redirectTo })
});

class SignUpPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            profile: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(profile) {
        this.setState({ error: null });

        authApi
            .signUp(profile)
            .then((profile) => {
                toast("Profile registered with success");
                this.setState({ profile })
                this.props.redirectTo('/signin');
            })
            .catch((err) => {
                if (err.response) {
                    this.setState({ error: err.response.data });
                } else {
                    this.setState({ error: new Error('Sign up fail') });
                }
            });
    }

    render() {
        return (
            <div>
                <h1>Sign up</h1>
                {this.state.error && (
                    <Alert bsStyle="warning">{this.state.error.message}</Alert>
                )}
                <ProfileForm register onSubmit={this.handleSubmit} profile={this.state.profile} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);