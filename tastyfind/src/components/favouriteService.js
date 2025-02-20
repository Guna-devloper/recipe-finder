import { db, auth } from "../firebase";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

export const addToFavorites = async (recipe) => {
  if (!auth.currentUser) return alert("Please log in to save favorites!");

  try {
    await addDoc(collection(db, "favorites"), {
      userId: auth.currentUser.uid,
      recipeId: recipe.id,
      title: recipe.title,
      image: recipe.image,
    });
    alert("Recipe added to favorites!");
  } catch (error) {
    console.error("Error saving favorite:", error);
  }
};

export const getFavorites = async () => {
  if (!auth.currentUser) return [];

  try {
    const q = query(collection(db, "favorites"), where("userId", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching favorites:", error);
  }
};

export const removeFavorite = async (favoriteId) => {
  try {
    await deleteDoc(doc(db, "favorites", favoriteId));
    alert("Recipe removed from favorites!");
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};
