// import React from 'react'

import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import Person from "../../components/Person";
import { toast } from "react-toastify";

const Dashboard = () => {
  // recuperer des données depuis le firestore
  const [data, setData] = useState([]);

  const getPersons = async () => {
    const personRef = collection(db, "personnes");
    try {
      const persons = await getDocs(personRef);
      // console.log(persons)

      const filterPersons = persons.docs.map((person) => ({
        idF: person.id,
        ...person.data(),
      }));
      // console.log(filterPersons)
      setData(filterPersons);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getPersons();
  }, []);

  const deletePerson = async (id) => {
    const docRef = doc(db, "personnes", id);
    try {
      await deleteDoc(docRef);
      setTimeout(() => {
        toast.success("Produit supprimé avec succès!");
        getPersons();
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="w-[90%] md:[w-80%] mx-auto">
        <h1 className="mt-10 text-2xl font-bold text-center">
          Liste des hommes de Dieu enregistrés
        </h1>
        <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-3">
          {data.map((person) => (
            <Person
              key={person.id}
              person={person}
              deletePerson={deletePerson}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
