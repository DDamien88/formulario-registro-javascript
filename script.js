
const firebaseConfig = {
    apiKey: "AIzaSyBUv4xi5aYO8pgKvnix_ZJMeXYKDrpurU4",
    authDomain: "datos-formulario-dabcb.firebaseapp.com",
    projectId: "datos-formulario-dabcb",
    storageBucket: "datos-formulario-dabcb.appspot.com",
    messagingSenderId: "1049400400596",
    appId: "1:1049400400596:web:7e28ff2d65b9d47dce3941",
    measurementId: "G-F04XLM9LB7"
  };
  
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()

    //validar campo nombre
    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');
    
    if (entradaNombre.value.trim() === '') {
      errorNombre.textContent = 'Por favor, introducí tu nombre';
      errorNombre.classList.add('error-message');
    } else {
      errorNombre.textContent = '';
      errorNombre.classList.remove('error-message');
    }
    //validar correo electrónico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico

    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introducí en mail válido'
        emailError.classList.add('error-message')
    }else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }


    //validar contraseña
    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    
    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
      contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales';
      contrasenaError.classList.add('error-message');
    } else {
      contrasenaError.textContent = '';
      contrasenaError.classList.remove('error-message');
    }
    //Si todos los campor son válidos, enviar formulario

    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
        db.collection("users").add({
          nombre: entradaNombre.value,
          email: emailEntrada.value,
          password: contrasenaEntrada.value
        })
        .then((docRef) => {
          alert('El formulario se ha enviado con éxito', docRef.id);
          document.getElementById('formulario').reset();
        })
        .catch((error) => {
          alert(error);
        });
    }
});