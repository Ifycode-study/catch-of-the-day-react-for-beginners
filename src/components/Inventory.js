import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishform';
import EditFishForm from './EditFishForm';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object, //use shape if you like
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }
    render() {
        return (
            <div className="inventory">
                <h3>Inventory</h3>
                {Object.keys(this.props.fishes).map(fishkey => (
                    <EditFishForm key={fishkey} 
                        index={fishkey} 
                        fish={this.props.fishes[fishkey]} 
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;