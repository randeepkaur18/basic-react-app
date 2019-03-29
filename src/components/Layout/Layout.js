import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    sideDrawerClosedhandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedhandler} />
                <main className={classes.Content}><BurgerBuilder /></main>
            </Aux>
        );
    }

}

export default Layout;