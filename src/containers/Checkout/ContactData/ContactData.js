import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {

    state = {
        name: '',
        address: {
            street: '',
            zipcode: ''
        },
        email: '',
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        let orderData = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Randeep1',
                address: {
                    street: 'Electronic City',
                    zipcode: '564321'
                },
                email: 'randeep@test.com'
            }
        }
        axios.post('/orders.json', orderData)
            .then(response => {
                this.setState({ loading: false })
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    render() {
        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="zipcode" placeholder="Zipcode" />
                    <input className={classes.Input} type="text" name="email" placeholder="Your Email" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if(this.state.loading) {
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