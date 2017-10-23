import React from 'react';

import { Button } from 'react-bootstrap';

import { FieldGroup, FieldGroupSelect, FieldGroupText, FieldGroupAutoComplete } from './FieldGroup';
import Picture from './Picture';

import {cities as citiesApi, singleChoiceAttributes as singleChoiceAttributesApi} from '../api';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      gender: [],
      ethnicity: [],
      religion: [],
      figure: [],
      marital_status: [],
      profile: {
        displayName: '',
        realName: '',
        birthday: '',
        height: '',
        occupation: '',
        aboutMe: '',
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleInputFileChange = this.handleInputFileChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.profile);
  }

  handleLocation(selected) {
    this.changeProfileAttribute('location', selected[0]);
  }

  handleInputChange(event) {
    const target = event.target;
    this.changeProfileAttribute(target.id, target.value);
  }

  handleInputFileChange(event) {
    const target = event.target;
    this.changeProfileAttribute(target.id, target.files[0]);
  }

  changeProfileAttribute(name, value) {
    this.setState({
      profile: {
        ...this.state.profile,
        [name]: value,
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ profile: nextProps.profile });
  }

  componentWillMount() {
    citiesApi.findAll().then((cities) => this.setState({ cities }));
    singleChoiceAttributesApi.findAll().then((data) => this.setState({
      gender: data.gender,
      ethnicity: data.ethnicity,
      religion: data.religion,
      figure: data.figure,
      marital_status: data.marital_status,
    }));
  }

  render() {
    var profile = this.state.profile;

    return (
      <form onSubmit={this.handleSubmit}>

        {this.props.register && (
          <div>
            <FieldGroup id="email" label="Email *" type="email" required placeholder="Enter your email" onChange={this.handleInputChange}></FieldGroup>
            <FieldGroup id="password" label="Password *" type="password" required placeholder="Enter your password" onChange={this.handleInputChange}></FieldGroup>
          </div>
        )}

        <FieldGroup
          id="displayName"
          label="Display name *"
          type="text"
          value={profile.displayName}
          required
          placeholder="Enter your display name"
          onChange={this.handleInputChange} />

        <FieldGroup
          id="realName"
          label="Real name *"
          type="text"
          value={profile.realName}
          required
          placeholder="Enter your real name"
          onChange={this.handleInputChange} />

        <Picture file={profile.profilePicture} alt="This is my profile picture" className="img-thumbnail" />
        
        <FieldGroup
          id="profilePicture"
          label="Picture"
          type="file"
          placeholder="Choose a picture to your profile"
          accept="image/*"
          onChange={this.handleInputFileChange} />

        <FieldGroup
          id="birthday"
          label="Birthday *"
          type="date"
          value={profile.birthday && profile.birthday.substring(0, 10)}
          required
          placeholder="Enter your birthday"
          onChange={this.handleInputChange} />

        <FieldGroupSelect
          id="gender"
          label="Gender *"
          options={this.state.gender}
          value={profile.gender}
          required
          placeholder="Select your gender"
          onChange={this.handleInputChange} />
        
        <FieldGroupSelect
          id="ethnicity"
          label="Ethnicity"
          options={this.state.ethnicity}
          value={profile.ethnicity}
          placeholder="Select your ethnicity"
          onChange={this.handleInputChange} />

        <FieldGroupSelect
          id="religion"
          label="Religion"
          options={this.state.religion}
          value={profile.religion}
          placeholder="Select your religion"
          onChange={this.handleInputChange} />

        <FieldGroup
          id="height"
          label="Height"
          type="number"
          value={profile.height}
          readOnly={!this.props.register && ('readonly')}
          placeholder="Enter your height"
          onChange={this.handleInputChange} />
        
        <FieldGroupSelect
          id="figure"
          label="Figure"
          options={this.state.figure}
          value={profile.figure}
          placeholder="Select your figure"
          onChange={this.handleInputChange} />

        <FieldGroupSelect
          id="maritalStatus"
          label="Marital Status *"
          options={this.state.marital_status}
          value={profile.maritalStatus}
          required
          placeholder="Select your marital status"
          onChange={this.handleInputChange} />

        <FieldGroup
          id="occupation"
          label="Occupation"
          type="text"
          value={profile.occupation}
          placeholder="Enter your occupation"
          onChange={this.handleInputChange} />

        <FieldGroupText
          id="aboutMe"
          label="About Me"
          type="text"
          value={profile.aboutMe}
          placeholder="Write about you"
          onChange={this.handleInputChange} />

        <FieldGroupAutoComplete
          id="location"
          label="Location *"
          options={this.state.cities}
          value={profile.location}
          placeholder="Choose your location"
          labelKey="city"
          required
          onChange={this.handleLocation} />
        
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

export default ProfileForm;