import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);
  const [logUserInfo, setLogUserInfo] = useState({ name: null, photo: null });
  const googleProvider = new GoogleAuthProvider();
  const [quizPackage, setQuizPackage] = useState({
    price: null,
    category: null,
  });

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photo) => {
    setLogUserInfo({ name, photo });
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      setAdminLoading(true);

      if (currentUser) {
        axiosPublic
          .post("/jwt", loggedUser, {
            withCredentials: true,
            credentials: "include",
          })
          .then(() => {
            // console.log("token response: ", res.data);
            setAdminLoading(false);
          });
      } else {
        axios
          .post(
            "https://job-seeker-server-omega.vercel.app/logout",
            loggedUser,
            {
              withCredentials: true,
            }
          )
          .then(() => {
            // console.log(res.data);
          });
      }
      console.log("current user in auth Provider", currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [user?.email, axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    logUserInfo,
    updateUserProfile,
    setQuizPackage,
    quizPackage,
    adminLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
