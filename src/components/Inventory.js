import React from 'react';
import AddFishForm from './AddFishform';

class Inventory extends React.Component {
    render() {
        return (
            <div className="inventory">
                <h3>Inventory</h3>
                <AddFishForm addFish={this.props.addFish}/>
            </div>
        );
    }
}

export default Inventory;