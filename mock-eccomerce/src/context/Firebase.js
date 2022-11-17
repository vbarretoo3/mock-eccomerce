import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDZ0PX9Soqzlh1JAhEs3fyOX3ODxxaKwLQ",
    authDomain: "mock-eccomerce.firebaseapp.com",
    databaseURL: "https://mock-eccomerce-default-rtdb.firebaseio.com",
    projectId: "mock-eccomerce",
    storageBucket: "mock-eccomerce.appspot.com",
    messagingSenderId: "112068762895",
    appId: "1:112068762895:web:8abc084e599093d317b27a"
    };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app;