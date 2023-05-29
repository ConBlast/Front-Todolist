import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

const completeRegistrationButton = document.querySelector(".buttons-container .button");

completeRegistrationButton.addEventListener("click", () => {
  const emailInput = document.querySelector("#email-input");
  const usernameInput = document.querySelector("#username-input");
  const passwordInput = document.querySelector("#pass-input");

  const email = emailInput.value;
  const password = passwordInput.value;
  const username = usernameInput.value;

  // Crea la cuenta en Firebase Authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Obtiene el ID del usuario creado
      const userId = userCredential.user.uid;

      // Guarda el nombre de usuario en Firestore
      const userRef = doc(db, "users", userId);
      setDoc(userRef, {
        username: username,
      })
        .then(() => {
          // Redirige a index.html
          window.location.href = "/index.html";
        })
        .catch((error) => {
          console.error("Error al guardar los datos en Firestore:", error);
        });
    })
    .catch((error) => {
      console.error("Error al crear la cuenta:", error);
    });
});