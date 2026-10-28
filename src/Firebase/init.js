import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCMZztAJH1W8XpL7psTBvXXDGK2dQPNKuc',
  authDomain: 'fit5032-7814e.firebaseapp.com',
  projectId: 'fit5032-7814e',
  storageBucket: 'fit5032-7814e.firebasestorage.app',
  messagingSenderId: '95524360036',
  appId: '1:95524360036:web:88ffe61577d91d80e53471'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db