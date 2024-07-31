// import React from 'react'

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
// import { GiCloudUpload } from "react-icons/gi";
import { IoCloudUploadSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { auth, db, storage } from "../firebase/firebase";
import Animation from "../assets/Animation.gif";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { add } from "../toolkit/reveilSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [infos, setInfos] = useState({
    photo: null,
    nom: "",
    bapteme: "",
    fonction: "",
    annee: "",
    eglise: "",
  });

  // console.log(infos);

  const handleChange = (e) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  // const handleImage = (e) => {
  //   setInfos({ ...infos, photo: e.target.files[0] });
  // };

  // ajouter dans firestore
  const savePerson = async (person) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const id = user.uid;
        const personRef = doc(db, "personnes", id);
        const personSnap = await getDoc(personRef);

        // verifier s'il existe
        if (personSnap.exists()) {
          toast.warning("Vous avez déjà fait un enregistrement");
          return;
        } else {
          const newPerson = { ...person, id: uuidv4() };
          await setDoc(personRef, newPerson);
          dispatch(add({ ...newPerson }));
          toast.success("Informations ajoutées avec succès 🤚😀");
          setTimeout(() => {
            navigate("/register-done");
          }, 1500);
        }
      } else {
        toast.error("Veuillez vous connecter pour effectuer cette action");
        navigate("/");
      }
    });
    //
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation des champs
    if (
      !infos.photo ||
      !infos.nom ||
      !infos.bapteme ||
      !infos.fonction ||
      !infos.annee ||
      !infos.eglise
    ) {
      toast.warning("Veuillez remplir tous les champs");
    } else if (infos.annee && infos.annee.toString().length !== 4) {
      toast.warning("La date doit etre de 4 chiffre");
    } else {
      console.log(infos);
      const person = infos;
      // envoi des données vers firebase
      savePerson(person);
    }
  };

  // function pour uploader l'image
  const uploadImage = (e) => {
    setLoading(true);
    // stocker l'image dans une variable
    const imageFile = e.target.files[0];

    // creer un reference pour le storage
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);

    // importer l'image
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    // suivre l'avancée du téléversement
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        toast.error(error.message);
        setLoading(false);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // stocker l'url de l'image dans la state
          setInfos({ ...infos, photo: downloadURL });
          // setUrlImage(downloadURL);
          const nameFile = uploadTask.snapshot.ref.name;
          toast.success(`${nameFile} uploaded successfully`);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
      }
    );
  };

  // supprimer l'image dans le storage
  const deleteImage = () => {
    const storageRef = ref(storage, `${infos.photo}`);

    deleteObject(storageRef)
      .then(() => {
        toast.warning("Image supprimée avec succès");
        setInfos({ ...infos, photo: null });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-500 to-rose-500">
      {/* part 1 */}
      <div className="w-full md:w-[30%] bg-white py-5 px-5">
        <img src="" alt="" />
        <h1 className="flex flex-col pb-1 mb-2 font-bold border-b border-black">
          <span>&rarr; Entrez vos informations !</span>
        </h1>

        <form
          className="w-full mt-5 space-y-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="w-[100px] h-[100px] rounded-full bg-slate-200 mx-auto flex items-center justify-center border-2 border-black border-dashed">
            {infos.photo === null && (
              <label htmlFor="photo" className="rounded-full">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-[9px]">Uplaod Your Photo</p>
                  <IoCloudUploadSharp size={30} />
                </div>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  value={infos.photo}
                  className="hidden w-full p-1 mt-1 border rounded-md outline-none"
                  placeholder="Enter your email address"
                  onChange={(e) => uploadImage(e)}
                />
              </label>
            )}

            {infos.photo && !loading && (
              <div className="relative w-full h-full rounded-full">
                <img
                  src={infos.photo}
                  alt="photo"
                  className="object-cover w-full h-full rounded-full"
                />
                <span
                  className="absolute flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full cursor-pointer bottom-2 right-2"
                  onClick={deleteImage}
                >
                  <MdDelete size={20} />
                </span>
              </div>
            )}

            {infos.photo && loading && (
              <img src={Animation} alt="" className="w-[100px] h-[100px]" />
            )}
          </div>

          {/* Nom Complet */}
          <div>
            <label htmlFor="nom">Nom complet à l'état civil</label>
            <input
              type="text"
              name="nom"
              id="nom"
              placeholder="Ex: Ouattara Ibrahim Yacouba"
              className="w-full p-2 border-2"
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* Nom de baptême */}
          <div>
            <label htmlFor="email">Nom de baptême</label>
            <input
              type="text"
              name="bapteme"
              id="bapteme"
              placeholder="Ex: Abraham"
              className="w-full p-2 border-2"
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* Fonction */}
          <div>
            <label htmlFor="email">Ministère</label>
            <input
              type="text"
              name="fonction"
              id="fonction"
              placeholder="Ex: Docteur"
              className="w-full p-2 border-2"
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* Année d'arrivée */}
          <div>
            <label htmlFor="email">Année d'arrivée</label>
            <input
              type="number"
              name="annee"
              id="annee"
              placeholder="Ex: 2021"
              className="w-full p-2 border-2"
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* Assemblée de service */}
          <div>
            <label htmlFor="email">Assemblée de service</label>
            <input
              type="text"
              name="eglise"
              id="eglise"
              placeholder="Ex: Bingerville"
              className="w-full p-2 border-2"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <button
            type="submit"
            className="p-1 text-white cursor-pointer bg-gradient-to-r from-pink-500 to-rose-500"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
