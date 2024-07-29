// import React from 'react'

import { signInWithPopup, signOut } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, db, providerGoogle } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logIn, logOut, reset } from "../toolkit/reveilSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.reveil);
  console.log(userInfo);

  const loginGoogle = async () => {
    // e.preventDefault();
    await signInWithPopup(auth, providerGoogle)
      .then(async (result) => {
        // stocker le resulta dans une variable USER
        const user = result.user;

        // Faire une reference
        const docRef = doc(db, "users", user.uid);
        // Ecrire les données dans la base de données
        const docSnap = await getDoc(docRef);
        // console.log("DOCSNAP--------------------", docSnap)

        // verifier s'il existe
        if (docSnap.exists()) {
          const userInDb = { ...docSnap.data(), id: docSnap.id };
          dispatch(logIn(userInDb));
          toast.success("Welcom back 👏");
          return;
        } else {
          const newUser = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            role: "client",
          };
          dispatch(logIn({ ...newUser, id: user.uid }));
          await setDoc(docRef, newUser);
          toast.success("Connexion reussie 🤚😀");
          //   setTimeout(() => {
          //     navigate("/register");
          //   }, 1500);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  async function logoutGoogle() {
    await signOut(auth)
      .then(() => {
        toast.success("Deconnexion reussie");
        dispatch(logOut());
        dispatch(reset());
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-rose-500">
      {userInfo && (
        <div className="absolute right-[35%] md:right-[47%] top-5 md:top-10 rounded-full flex flex-col items-center">
          <img
            src={userInfo.photoURL}
            alt="Google logo"
            className="w-16 h-16 rounded-full"
          />
          <p className="text-white"> {userInfo.name} </p>
        </div>
      )}

      {/* part 1 */}
      <div className="w-full md:w-[30%] bg-white p-5">
        <img src="" alt="" />
        <h1 className="flex flex-col pb-1 mb-2 font-bold border-b border-black ">
          <span className="text-xl">Shalom Serviteur de</span>
          <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
            JESUS-CHRIST
          </span>
        </h1>
        <p>
          Dans l'optique d'établir à chaque ministre de Dieu un badge, nous
          avons concu cette plateforme afin d'enregister les informations
          relatives à la conception du badge <br /> <br />
          <span>
            {" "}
            <strong>
              NB: Toutes informations resteront confidentielles
            </strong>{" "}
          </span>
        </p>
        {userInfo ? (
          <p className="flex flex-col pb-3 mt-2 italic text-red-500 animate-bounce">
            <Link to="/register">&rarr; Enregister mes informations</Link>
          </p>
        ) : (
          <p className="flex flex-col pb-3 mt-2 italic">
            <span>&rarr; Merci de vous connecter !</span>
          </p>
        )}

        {userInfo ? (
          <button
            className="flex items-center justify-center w-full gap-2 p-2 mt-2 text-white bg-gradient-to-r from-pink-500 to-rose-500"
            onClick={logoutGoogle}
          >
            <span>Se deconnecter</span>
          </button>
        ) : (
          <button
            className="flex items-center justify-center w-full gap-2 p-2 mt-2 text-white bg-gradient-to-r from-pink-500 to-rose-500"
            onClick={loginGoogle}
          >
            <span className="p-1 bg-white rounded-full">
              <FcGoogle />
            </span>
            <span>Se connecter avec Google</span>
          </button>
        )}
      </div>
    </main>
  );
};

export default Home;
