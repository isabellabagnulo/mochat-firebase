
import './styles/main.scss';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAy3cjQqbdd18AK8vaQ3yIbsuV00ED3pzU",
    authDomain: "mochat-web1a-isa.firebaseapp.com",
    projectId: "mochat-web1a-isa",
    storageBucket: "mochat-web1a-isa.appspot.com",
    messagingSenderId: "268641889877",
    appId: "1:268641889877:web:788aa3aed8c02fc4e0eedc"
  };

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const collection = db.collection('chat');
    const ul = document.querySelector('ul');
    const form = document.querySelector('form');

    collection.orderBy('timestamp').onSnapshot((snapshot) => {
        const json = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        });
        const elements = json.map( doc => `<li><b>${doc.user}:</b> ${doc.text}</li>` );
        ul.innerHTML = elements.join('');
    });

    form.addEventListener( 'submit', (event) => {
        event.preventDefault();

        const obj = {
            timestamp: new Date().toISOString(),
            user: document.querySelector('#username').value,
            text: event.target.new.value
        }

        collection.doc().set(obj);

        event.target.reset();
    })
});