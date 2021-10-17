import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCyLgVSoIWtyasYQoy2eO8jDD84ZGKNCGM",
    authDomain: "catch-of-the-day-obiagba.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-obiagba-default-rtdb.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

//default export
export default base;