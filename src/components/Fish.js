import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
    static propTypes = {
        details: PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            image: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string
        }),
        addToOrder: PropTypes.func
    };
    handleClick = () => {
        const orderKey = this.props.index;
        this.props.addToOrder(orderKey);
    };
    render() {
        const details = this.props.details;
        const isAvailable = details.status === 'available';
        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick}>{isAvailable? 'Add to Order': 'Sold Out'}</button>
            </li>
        );
    }
}

export default Fish;