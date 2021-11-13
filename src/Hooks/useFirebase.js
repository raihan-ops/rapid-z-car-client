import { useState, useEffect } from "react";
import {
    getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, GoogleAuthProvider,
    signInWithPopup, updateProfile,getIdToken
} from "firebase/auth";
import initializeAuthentication from "../FireBase/FirebaseInitialize";



initializeAuthentication();

const useFirebase = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [user, setUser] = useState({});
    const auth = getAuth();
    const Googleprovider = new GoogleAuthProvider();
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');

    // create new user
    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                //setUser(user);
                setAuthError('');
                // update user
                const newUser = { email, displayName: name };
                setUser(newUser);

                // send name to firebase after creation

                // ----------------------------------------------
                 saveUser(email, name, 'POST');
                
                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                history.replace('/');
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                setAuthError(errorMessage);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    // email sign in
    const signInUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // setUser(user);
                // ...
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                setAuthError(errorMessage);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    // google sign in

    const googleSignIn = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, Googleprovider)
            .then((result) => {
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT');
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');

               
                // ...
            }).catch((error) => {
                const errorMessage = error.message;
                setAuthError(errorMessage);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    // observe user.................
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {

                // const uid = user.uid;
                setUser(user)
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken);
                    })
            } else {
                setUser({})
            }

            setIsLoading(false);
        });

        return () => unsubscribe;
    }, [])

    // get admin database and set admin for clientsite ......
    useEffect(() => {
        fetch(`https://fast-sea-90623.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => {
                setIsLoading(false);
            });
    }

    // save information for mongodb
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://fast-sea-90623.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }



    return {
        user,
        registerUser,
        logout,
        signInUser,
        isLoading,
        authError,
        googleSignIn,
        token,
        admin
    }
}

export default useFirebase;