
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
elementos.btnYahoo.addEventListener("click", () => {

  alert("No sea mentiroso, nadie usa Yahoo")
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
    var lat;
    var lon;
    const querySnapshot = await getDocs(collection(db, "pokemon"));
    querySnapshot.forEach((doc) => {
      lat = (Math.random()*0.15)+25.5;
      lon= 0-((Math.random()*0.45)+103.2);
      htmlDatos = `${htmlDatos} <li><b>Nombre:</b> ${doc.data().nombre}, <b>Tipo:</b> ${doc.data().tipo} <img class="img-poke" src="${doc.data().image}" onclick="document.getElementById('abreviatura').value = '${doc.id}'"><a href="mapa.html?lat=${lat}&lon=${lon}&name=${doc.data().nombre}"><b>Mapa</b> </a></li>`
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
  center: [-103.425, 25.575], // starting position [lng, lat]
  zoom: 10.5 // starting zoom
});
// Create a default Marker and add it to the map.

const params = new URLSearchParams(window.location.search);

// Get the value of the "name" parameter
var latitud = params.get('lat'); // "John"

// Get the value of the "age" parameter
var longitud = params.get('lon'); // "30"

var nombremapa= params.get('name')

const marker1 = new mapboxgl.Marker()
  .setLngLat([longitud, latitud])
  .setPopup(new mapboxgl.Popup().setHTML(`Aquí se ha encontrado un ${nombremapa} <img class="img-poke-big" src="/img/${nombremapa.toLocaleLowerCase()}.jpeg">`)) // add popup
  .addTo(map);

  

// map.on('load', () => {
//   map.addSource('places', {
//     'type': 'geojson',
//     'data': {
//       'type': 'FeatureCollection',
//       'features': [
//         {
//           'type': 'Feature',
//           'properties': {
//             'description':
//               '<strong>Universidad Autónoma de La Laguna</strong><p>La Universidad Autónoma de La Laguna (UAL) es una universidad privada mexicana ubicada en la ciudad de Torreón, Coahuila. Fue fundada el 4 de diciembre de 1988.</p>'
//           },
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [-103.43348, 25.5768379]
//           }
//         },
//         {
//           'type': 'Feature',
//           'properties': {
//             'description':
//               '<strong>Casa del Cerro</strong><p>La Casa del cerro o Chalet Wulff es un edificio ubicado en la calzada industria sin número, al oeste del centro histórico de la ciudad de Torreón, en el estado de Coahuila, México y fue construida a principios del siglo XX en estilo ecléctico por el arquitecto Federico Wulff. Es una de las construcciones más antiguas y emblemáticas de la ciudad de Torreón y desde 1994 alberga al Museo Histórico de la Ciudad.</p>'
//           },
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [-103.4703945, 25.5339065]
//           }
//         },
//         {
//           'type': 'Feature',
//           'properties': {
//             'description':
//               '<strong>Museo Arocena</strong><p>El Museo Arocena es un museo de Torreón, México, inaugurado en 2006. Cuenta con salas de arte contemporáneo, arte europeo, arte de la Nueva España e historia regional. Tiene como base una colección de más de 3000 obras de arte virreinal, europeo y mexicano que fueron adquiridas durante los últimos cien años por la familia Arocena y sus descendientes. Sobre una superficie de cinco mil metros cuadrados, el museo se estableció en el antiguo edificio del Casino de La Laguna, construido en 1910 por el arquitecto francés Louis Channel. </p>'
//           },
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [-103.4646307, 25.537999]
//           }
//         },
//         {
//           'type': 'Feature',
//           'properties': {
//             'description':
//               '<strong>Cristo de las Noas</strong><p>El Cristo de las Noas es una escultura de Jesús de Nazaret ubicada en el Cerro de las Noas, en la ciudad de Torreón, Coahuila, México, al noreste de México. Es obra de la artista Vladimir Alvarado, quien quiso inmortalizar el gesto de un Cristo protector.</p>'
//           },
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [-103.4560951, 25.525331]
//           }
//         },
//         {
//           'type': 'Feature',
//           'properties': {
//             'description':
//               "<strong>Puente Plateado</strong><p>El Puente Plateado entre las ciudades mexicanas Torreón y Gómez Palacio es uno de los símbolos de la Comarca Lagunera. Fue inaugurado el 20 de diciembre de 1931, por los gobernadores de Coahuila y Durango, Nazario Ortiz Garza y Pastor Rouaix respectivamente.</p>"
//           },
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [-103.4725349, 25.5461068]
//           }
//         },
//         {
//           'type': 'Feature',
//           'properties': {
//             'description':
//               '<strong>Capital Pride Parade</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>'
//           },
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [-77.043444, 38.909664]
//           }
//         },
//         {
//           'type': 'Feature',
//           'properties': {
//             'description':
//               '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>'
//           },
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [-77.031706, 38.914581]
//           }
//         },
//         {
//           'type': 'Feature',
//           'properties': {
//             'description':
//               "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>"
//           },
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [-77.020945, 38.878241]
//           }
//         },
//         {
//           'type': 'Feature',
//           'properties': {
//             'description':
//               '<strong>Truckeroo</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>'
//           },
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [-77.007481, 38.876516]
//           }
//         }
//       ]
//     }
//   });
//   // Add a layer showing the places.
//   map.addLayer({
//     'id': 'places',
//     'type': 'circle',
//     'source': 'places',
//     'paint': {
//       'circle-color': '#4264fb',
//       'circle-radius': 6,
//       'circle-stroke-width': 2,
//       'circle-stroke-color': '#ffffff'
//     }
//   });

//   // Create a popup, but don't add it to the map yet.
//   const popup = new mapboxgl.Popup({
//     closeButton: false,
//     closeOnClick: false
//   });
//   map.on('mouseenter', 'places', (e) => {
//     // Change the cursor style as a UI indicator.
//     map.getCanvas().style.cursor = 'pointer';

//     // Copy coordinates array.
//     const coordinates = e.features[0].geometry.coordinates.slice();
//     const description = e.features[0].properties.description;

//     // Ensure that if the map is zoomed out such that multiple
//     // copies of the feature are visible, the popup appears
//     // over the copy being pointed to.
//     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//     }

//     // Populate the popup and set its coordinates
//     // based on the feature found.
//     popup.setLngLat(coordinates).setHTML(description).addTo(map);
//   });

//   map.on('mouseleave', 'places', () => {
//     map.getCanvas().style.cursor = '';
//     popup.remove();
//   });
// });
