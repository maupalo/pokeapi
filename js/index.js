
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

import { elementos } from "./html.js"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4qkJ-ooA3EpKQTWPjjuo_MDI3gjrD78k",
  authDomain: "se-i-90f68.firebaseapp.com",
  projectId: "se-i-90f68",
  storageBucket: "se-i-90f68.appspot.com",
  messagingSenderId: "14510212614",
  appId: "1:14510212614:web:8d434cbac0bf4331a0a587",
  measurementId: "G-GD68X2D7PZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const providerGoogle = new GoogleAuthProvider();
const providerGitHub = new GithubAuthProvider();

document.addEventListener("load", () => {
  elementos.resultados.setAttribute("hidden", "hidden");
})

elementos.btnCrear.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, elementos.email.value, elementos.password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log(user)
      alert("El usuario " + user.email + " se registró correctamente")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Hubo un error \n" + errorMessage)
      // ..
    });
});
elementos.btnIniciar.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, elementos.email.value, elementos.password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("El usuario " + user.email + " inició sesión")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
})


elementos.btnCerrar.addEventListener("click", () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    alert("Ha cerrado sesión");
  }).catch((error) => {
    // An error happened.
    console.log(error)

  });
})
elementos.btnGoogle.addEventListener("click", () => {

  signInWithPopup(auth, providerGoogle)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert(errorMessage)
    });
})
elementos.btnGitHub.addEventListener("click", () => {

  signInWithPopup(auth, providerGitHub)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
})

elementos.btnFb.addEventListener("click", () => {

  const providerFb = new FacebookAuthProvider();
  signInWithPopup(auth, providerFb)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
})

elementos.btnBuscar.addEventListener("click", () => {
  //query=elementos.textNombre
  if (elementos.textID.value != "") {
    var query = elementos.textID.value;
  }
  else {
    var query = elementos.textNombre.value.toLowerCase();
  }

  console.log(query)
  fetch(`https://pokeapi.co/api/v2/pokemon/${query}/`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      resultName.innerHTML = `<h2>${data.name.toUpperCase()}</h2>`
      resultID.innerHTML = `<li><b>ID:</b> ${data.id}</li>`
      resultPeso.innerHTML = `<li><b>WEIGHT:</b> ${data.weight}</li>`
      resultAltura.innerHTML = `<li><b>HEIGHT:</b> ${data.height}</li>`
      var estadisticas = "<li><b>STATS:</b></li><ul>";
      data.stats.forEach((elemento) => {
        console.log(elemento.stat.base_stat)
        estadisticas = estadisticas.concat(`<li>${elemento.stat.name.toUpperCase()}: ${elemento.base_stat}</li>\n
      <ul><li>EFFORT: ${elemento.effort}</li></ul>`)
        console.log(estadisticas)
      })
      estadisticas.concat("</ul>")
      resultStats.innerHTML = `${estadisticas}`
      var tipo = "";
      data.types.forEach((elemento) => {
        tipo = tipo.concat(`<li><b>TYPE</b>: ${elemento.type.name.toUpperCase()}</li>\n`)
      })
      tipo.concat("</ul>")
      resultTipo.innerHTML = tipo
      resultImgNormal.src = data.sprites.front_default
      resultImgShiny.src = data.sprites.front_shiny
      elementos.resultados.removeAttribute("hidden");
      elementos.textID.value = ""
      elementos.textNombre.value = ""
    })
    .catch(() => {
      alert("No se encontró ese pokemon")
    });


})

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(user);

    elementos.btnCerrar.removeAttribute("hidden");
    elementos.buscador.removeAttribute("hidden");
    elementos.containerLog.setAttribute("hidden", "hidden");
    //elementos.crud.removeAttribute("hidden");
    // ...
  } else {
    // User is signed out
    // ...
    elementos.resultados.setAttribute("hidden", "hidden");
    elementos.btnCerrar.setAttribute("hidden", "hidden");
    elementos.buscador.setAttribute("hidden", "hidden");
    //elementos.crud.setAttribute("hidden", "hidden");
    elementos.containerLog.removeAttribute("hidden");

    console.log(user);
  }
});
elementos.btnGuardar.addEventListener("click", async () => {
  try {
    const docRef = doc(db, "pokemon", elementos.textAbreviatura.value);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      alert("Ese pokemon ya existe")
    } else {
      // doc.data() will be undefined in this case
      await setDoc(doc(collection(db, "pokemon"), elementos.textAbreviatura.value), {
        nombre: elementos.textNombre.value,
        tipo: elementos.textTipo.value,
        image: elementos.textImage.value
      });
      console.log("Document written with ID: ");
      alert("Se ha creado su pokemon personalizado")
    }

  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Error adding document: ", e)
  }

})
elementos.btnActualizar.addEventListener("click", async () => {
  try {
    const docRef = doc(db, "pokemon", elementos.textAbreviatura.value);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      alert("Ese pokemon no existe. Revise el ID")
    } else {
      // doc.data() will be undefined in this case
      await setDoc(doc(collection(db, "pokemon"), elementos.textAbreviatura.value), {
        nombre: elementos.textNombre.value,
        tipo: elementos.textTipo.value,
        image: elementos.textImage.value
      });
      console.log("Document written with ID: ");
      alert("Pokemon actualizado ")
    }

  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Error adding document: ", e)
  }

})
elementos.btnBorrar.addEventListener("click", async () => {
  try {
    await deleteDoc(doc(db, "pokemon", elementos.textAbreviatura.value));
  } catch (e) {

  }

})

elementos.btnVer.addEventListener("click", async () => {
  try {
    var htmlDatos = ""
    const querySnapshot = await getDocs(collection(db, "pokemon"));
    querySnapshot.forEach((doc) => {
      htmlDatos = `${htmlDatos} <li><b>Nombre:</b> ${doc.data().nombre}, <b>Tipo:</b> ${doc.data().tipo} <img class="img-poke" src="${doc.data().image}" onclick="document.getElementById('abreviatura').value = '${doc.id}'"></li>`
    }
    );
    elementos.datos.innerHTML = htmlDatos
  } catch (e) {
    console.error("Error reading document: ", e);
    alert("Error adding document: ", e)
  }

})
elementos.btnBuscarPers.addEventListener("click", async () => {
  var docRef = doc(db, "pokemon", elementos.textAbreviatura.value);
  var docSnap = await getDoc(docRef);
  var htmlDatos = ""
  if (docSnap.exists()) {
    htmlDatos = `${htmlDatos} <li><b>Nombre:</b>${docSnap.data().nombre}, <b>Tipo:</b> ${docSnap.data().tipo} <img class="img-poke-big" src="${docSnap.data().image}"></li>`
    elementos.datos.innerHTML = htmlDatos

    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

})
mapboxgl.accessToken = 'pk.eyJ1IjoibWF1cGFsbyIsImEiOiJjbGZzYzNhN3kwM3RpM2ZwYTl5ajlrdHNlIn0.Qzkwoc5_Mu0MLmczszqWEw';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-103.393016, 25.6160299], // starting position [lng, lat]
  zoom: 14 // starting zoom
});
// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
.setLngLat([-103.3784685, 25.6221669])
.addTo(map);
 
// Create a default Marker, colored black, rotated 45 degrees.
// const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
// .setLngLat([12.65147, 55.608166])
// .addTo(map);
