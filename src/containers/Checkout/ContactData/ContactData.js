import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayName: 'Fastest' },
                        { value: 'cheapest', displayName: 'Cheapest' }
                    ]
                }
            }
        },
        loading: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        let customer = {};
        for(let element in this.state.orderForm) {
            customer[element] = this.state.orderForm[element].value;
        }

        let orderData = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer
        }

        axios.post('/orders.json', orderData)
            .then(response => {
                this.setState({ loading: false })
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });
    }

    render() {
        const formElementArray = [];
        for(let element in this.state.orderForm) {
            formElementArray.push({
                id: element,
                setup: this.state.orderForm[element]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(element => (
                    <Input
                        key={element.id}
                        elementType={element.setup.elementType}
                        elementConfig={element.setup.elementConfig}
                        value={element.setup.value}
                        invalid={!element.setup.valid}
                        shouldValidate={element.setup.validation}
                        changed={(event) => this.inputChangedHandler(event, element.id)} />
                ))}
                
                <Button btnType="Success">ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details :</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;