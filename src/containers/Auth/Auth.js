import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email or Username'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity = (value, rules) => {
        if(!rules) {
            return true;
        }

        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    render() {
        const formElementArray = [];
        for(let element in this.state.controls) {
            formElementArray.push({
                id: element,
                setup: this.state.controls[element]
            });
        }

        const form = (
            <form>
                {formElementArray.map(element => (
                    <Input
                        key={element.id}
                        elementType={element.setup.elementType}
                        elementConfig={element.setup.elementConfig}
                        value={element.setup.value}
                        invalid={!element.setup.valid}
                        shouldValidate={element.setup.validation}
                        touched={element.setup.touched}
                        changed={(event) => this.inputChangedHandler(event, element.id)} />
                ))}
            </form>
        );

        return (
            <div className={classes.Auth}>
                {form}
                <Button btnType="Success">LOGIN</Button>
            </div>
        )
    }
}

export default Auth;