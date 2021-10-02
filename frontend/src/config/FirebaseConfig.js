import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAZCTYk0aTKjj0d8ihntd_GuzdodUT4RVQ",
    authDomain: "poised-cathode-325720.firebaseapp.com",
    projectId: "poised-cathode-325720",
    storageBucket: "poised-cathode-325720.appspot.com",
    messagingSenderId: "286350985232",
    appId: "1:286350985232:web:bbd8c1efc44e336bd06295",
    measurementId: "G-LHMQMJVMPJ"
};

const firebaseApp = initializeApp(firebaseConfig);
// const storage = getStorage(firebaseApp);
// export {storage, firebaseApp as default};
export default firebaseApp;