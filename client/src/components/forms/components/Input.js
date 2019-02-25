import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import { Error } from '../../';

export default class Input extends PureComponent {

  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
  };

  static defaultProps = {
    placeholder: '',
  }

  render() {
    const { label, name, id, placeholder, type, value, onChange, error } = this.props;
    return (
        <div style={{ margin: '1em 0' }}>
            <Form.Field>
                <label htmlFor={id}>{label}</label>
                <input
                    id={id}
                    placeholder={placeholder}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                />
            </Form.Field>
            {error && <Error error={error} />}
        </div>);
    }
}
