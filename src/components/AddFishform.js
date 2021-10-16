import React from 'react';

class AddFishForm extends React.Component {
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();
    createFish = (event) => {
        event.preventDefault();

        // Get texts from input
        const fish = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value), //make it number, not a string
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value
        }

        // Pass fish inputs into props (from App and inventory components)
        this.props.addFish(fish);

        // Reset the form after add fish button is clicked on
        event.currentTarget.reset();

    };
    render() {
        return (
            <form className="fish-edit" onSubmit={this.createFish}>
                <input name="name" ref={this.nameRef} type="text" placeholder="Name"/>
                <input name="price" ref={this.priceRef} type="text" placeholder="Price"/>
                <select name="status" ref={this.statusRef}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" ref={this.descRef} placeholder="Desc"></textarea>
                <input name="image" ref={this.imageRef} type="text" placeholder="Image"/>
                <button type="submit"> + Add Fish</button>
            </form>
        );
    }
}

export default AddFishForm;