const Person = ({ person, deletePerson }) => {
  const handleDelete = () => {
    if (window.confirm("êtes-vous sur de vouloir supprimer cet individu?")) {
      deletePerson(person.idF);
    }
  };

  return (
    <div className="p-5 shadow">
      <div className="flex items-center gap-5">
        <div className="h-[200px] w-[200px] border-8 border-slate-200">
          <img
            src={person.photo}
            alt="photo"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Nom complet : {person.nom}</p>
          <p className="text-sm font-medium">
            Nom de baptême : {person.bapteme}
          </p>
          <p className="text-sm font-medium">Fonction : {person.fonction}</p>
          <p className="text-sm font-medium">Annee : {person.annee}</p>
          <p className="text-sm font-medium">Eglise : {person.eglise}</p>
        </div>
      </div>
      <button
        className="w-full py-1 mt-3 text-white bg-purple-500 rounded-md hover:bg-black"
        onClick={handleDelete}
      >
        Supprimer
      </button>
    </div>
  );
};

export default Person;
