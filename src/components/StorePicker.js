import React, { Fragment } from 'react';
import { getFunName } from '../helpers'; //Already prepared helper/utility function

class StorePicker extends React.Component {

    myInput = React.createRef();

    goToStore = event => {
        //1. Prevent form from submitting (page reload)
        event.preventDefault();
        console.log('go to store...');
        //2. Get text from input
        console.log(this);
        console.log(this.myInput);
    }
    render() {
        return (
            <Fragment>
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>Please enter a store</h2>
                    <input
                     type="text"
                     ref={this.myInput}
                     placeholder="Store Name" 
                     defaultValue={getFunName()} 
                     required
                    />
                    <button type="submit">Visit Store ➡ </button>
                </form>
            </Fragment>
        )
    }
}

export default StorePicker;