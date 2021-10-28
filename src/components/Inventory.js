import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishform';
import EditFishForm from './EditFishForm';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object, //use shape if you like
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }
    state = {
       uid: null,
       owner: null 
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        })
    }
    authHandler = async (authData) => {
        //1. Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context: this });
        console.log(store);
        console.log(authData);
        //2. Claim it if there is no owner
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        //3. Set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    }
    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    }
    logout = async () => {
        await firebase.auth().signOut();
        this.setState({
            uid: null
        })
    }
    render() {
        const logout = <button onClick={this.logout}>Log Out</button>

        //1. Check if they are logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }

        //2. Check if they are NOT the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you are not the owner</p>
                    {logout}
                </div>
            );
        }

        //3. Render the inventory for owner
        return (
            <div className="inventory">
                <h3>Inventory</h3>
                {logout}
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