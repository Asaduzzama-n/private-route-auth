import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();

const UserContext = ({children}) => {

    const auth = getAuth(app);
    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);

    const provider = new GoogleAuthProvider();


    const createNewUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }


    const signIn = (email,password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
       const unsubscribe =  onAuthStateChanged(auth, (user) =>{
            setUser(user);
            setLoading(false);
            // console.log(user);
        })

        return (()=>{
            unsubscribe();
        })
    },[])



    const googleSignIn = () =>{
        return signInWithPopup(auth,provider);
    }



    const logOut = () =>{
        return signOut(auth);

    }


    const authInfo = {user,createNewUser,signIn,logOut,googleSignIn,loading}

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;