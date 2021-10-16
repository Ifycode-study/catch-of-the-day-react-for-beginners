import React, { Fragment } from 'react';
import { getFunName } from '../helpers'; //Already prepared helper/utility function

class StorePicker extends React.Component {

    myInput = React.createRef();

    goToStore = event => {
        //1. Prevent form from submitting (page reload)
        event.preventDefault();
        console.log('go to store...');
        //2. Get text from input
        const storeName = this.myInput.current.value;
        //3. Route or change the page to /store/input-from-user-or-helper-function
        this.props.history.push(`/store/${storeName}`);
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