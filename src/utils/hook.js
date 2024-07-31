import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const isAdmin = async () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
            toast.warning("Please sign in first")
            setTimeout(() => {
                // rediriger vers la page login mais pas de navigate car nous n'avons pas de JSX
                window.location.href = "/";
            }, 300);
        } else {
            getRole(user.uid)
        }
    });

    const getRole = async (id) => {
        // récupérer le rôle du user
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef)
        const role = docSnap.data().role;
        if (role !== "admin") {
            toast.error("Page reserved for admin")
            setTimeout(() => {
                // rediriger vers la page login mais pas de navigate car nous n'avons pas de JSX
                window.location.href = "/";
            }, 500);
        }
        unsubscribe()
    }
    return null;

}