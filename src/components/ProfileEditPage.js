import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

import ProfileForm from './ProfileForm';
import { profile as profileApi } from '../api';

const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => ({
    redirectTo: (redirectTo) => dispatch({ type: 'REDIRECT_TO', redirectTo })
});

class ProfileEditPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            profile: {},
            error: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        profileApi
            .get()
            .then((profile) => this.setState({ profile }));
    }

    handleSubmit(profile) {
        this.setState({ error: null });
        
        profileApi
            .update(profile)
            .then((profile) => {
                toast("Profile updated with success");
                this.setState({ profile })
                this.props.redirectTo('/');
            })
            .catch((err) => {
                if (err.response) {
                    this.setState({ error: err.response.data });
                } else {
                    this.setState({ error: new Error('Update profile fail') });
                }
            });
    }

    render() {
        return (
            <div>
                <h1>Edit your profile</h1>
                {this.state.error && (
                    <Alert bsStyle="warning">{this.state.error.message}</Alert>
                )}
                <ProfileForm onSubmit={this.handleSubmit} profile={this.state.profile} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage);