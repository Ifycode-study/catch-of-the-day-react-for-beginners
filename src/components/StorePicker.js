import React, { Fragment } from 'react';
import { getFunName } from '../helpers'; //Already prepared helper/utility function

class StorePicker extends React.Component {
    render() {
        return (
            <Fragment>
                <form className="store-selector">
                    <h2>Please enter a store</h2>
                    <input type="text" placeholder="Store Name" defaultValue={getFunName()} required/>
                    <button type="submit">Visit Store ➡ </button>
                </form>
            </Fragment>
        )
    }
}

export default StorePicker;