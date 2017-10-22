import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

export const FieldGroup = ({ id, label, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
};

export const FieldGroupSelect = ({ id, label, options, placeholder, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl componentClass="select" {...props}>
        <option value=''>{placeholder || 'Select an option...'}</option>
        {options.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </FormControl>
    </FormGroup>
  );
}

export const FieldGroupText = ({ id, label, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl componentClass="textarea" {...props} />
    </FormGroup>
  );
}

export const FieldGroupAutoComplete = ({ id, label, labelKey, options, value, placeholder, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <Typeahead
        ref={(c) => {
          if (c) {
            c.componentNode.getElementsByTagName('input')[0].required = true;
          }
        }}
        labelKey={option => option[labelKey]}
        selected={value && [value]}
        options={options}
        placeholder={placeholder} {...props} />
    </FormGroup>
  );
}
