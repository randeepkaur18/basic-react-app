import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                res = res.data;
                const ordersArray = [];
                for(let orderKey in res) {
                    ordersArray.push({
                        ...res[orderKey],
                        id: orderKey
                    })
                }
                this.setState({ loading: false, orders: ordersArray });
            })
            .catch(e => {
                this.setState({ loading: false });
            })
    }

    render() {
        return (
            <div style={{marginTop: '70px'}}>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
    }
}

export default Orders;