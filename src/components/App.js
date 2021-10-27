import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

    static propTypes = {
        match: PropTypes.object
    };

    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const { params } = this.props.match;

        //First reinstate our localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        console.log(localStorageRef);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    addFish = fish => {
        //1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        //2. Add our new fish to the fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //3. Set the new fish object to state
        this.setState({ fishes });
    };
    updateFish = (key, updatedFish) => {
        //1. Take a copy of the current (fish) state
        const fishes = {...this.state.fishes};
        //2. Update that state
        fishes[key] = updatedFish;
        //3. Set that to state
        this.setState({ fishes });
    };
    deleteFish = key => {
        //1. Take a copy of state
        const fishes = {...this.state.fishes};
        //2. Update the state
        fishes[key] = null;
        //3. Set it to state
        this.setState({ fishes });
    };
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes});
    };
    addToOrder = key => {
        //1. Take a copy of state
        const order = {...this.state.order};
        //2. Either add to the order or update (increment) the number in our order
        order[key] = order[key] + 1 || 1;
        //3. Call setstate to update our state object
        this.setState({ order })
    };
    removeFromOrder = key => {
        //1. Take a copy of state
        const order = {...this.state.order};
        //2. delete from the order
        delete order[key];
        //3. Call setstate to update our state object
        this.setState({ order });
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(fishkey => ( 
                            <Fish key={fishkey}
                                index={fishkey}
                                details={this.state.fishes[fishkey]}
                                addToOrder={this.addToOrder}
                            />
                        ))} 
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
                <Inventory 
                    addFish={this.addFish} 
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes} 
                    fishes={this.state.fishes}
                />
            </div>
        )
    }
}

export default App;