import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { addField, FieldTitle } from 'ra-core';

import sanitizeRestProps from './sanitizeRestProps';

export class LongTextInput extends Component {
    handleKeyPress = event => {
        if (event.key === 'Enter') {
            event.stopPropagation();
        }
    };

    render() {
        const {
            className,
            input,
            meta,
            isRequired,
            label,
            options,
            source,
            resource,
            ...rest
        } = this.props;
        if (typeof meta === 'undefined') {
            throw new Error(
                "The LongTextInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details."
            );
        }
        const { touched, error } = meta;
        return (
            <TextField
                {...input}
                className={className}
                multiline
                margin="normal"
                label={
                    <FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired}
                    />
                }
                error={!!(touched && error)}
                helperText={touched && error}
                onKeyPress={this.handleKeyPress}
                {...sanitizeRestProps(rest)}
                {...options}
            />
        );
    }
}

LongTextInput.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    fullWidth: PropTypes.bool,
    meta: PropTypes.object,
    name: PropTypes.string,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    validate: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func),
    ]),
};

const EnhancedLongTextInput = addField(LongTextInput);
EnhancedLongTextInput.defaultProps = {
    options: {},
    fullWidth: true,
};

export default EnhancedLongTextInput;
