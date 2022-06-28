  // // Import the functions you need from the SDKs you need
  // import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
  // import { getDatabase } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
  // import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
  // // TODO: Add SDKs for Firebase products that you want to use
  // // https://firebase.google.com/docs/web/setup#available-libraries

  // // Your web app's Firebase configuration
  // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = {
  //   apiKey: "AIzaSyCx5TQ8S6OpFGJmHwWofv8lTKTwYw118_Y",
  //   authDomain: "knock-knock-56faa.firebaseapp.com",
  //   databaseURL: "https://knock-knock-56faa-default-rtdb.firebaseio.com",
  //   projectId: "knock-knock-56faa",
  //   storageBucket: "knock-knock-56faa.appspot.com",
  //   messagingSenderId: "146120721095",
  //   appId: "1:146120721095:web:bfffe5578b8acb408134e2",
  //   measurementId: "G-DXHE9PVQ3D"
  // };

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const database = getDatabase(app);
  // const auth = getAuth();

  // SignUp.addEventListener('click',(e) => {

  //   var email = document.getElementById('email').value;
  //   var password = document.getElementById('password').value;
  //   var username = document.getElementById('username').value;
  
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //      // Signed in 
  //       const user = userCredential.user;
  
  //       set(ref(database, 'users/' + user.uid),{
  //           username: username,
  //           email: email
  //       })
  
  //       alert('user created!');
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  
  //       alert(errorMessage);
  //     // ..
  //     });
  
  // });

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword,  createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCx5TQ8S6OpFGJmHwWofv8lTKTwYw118_Y",
    authDomain: "knock-knock-56faa.firebaseapp.com",
    databaseURL: "https://knock-knock-56faa-default-rtdb.firebaseio.com",
    projectId: "knock-knock-56faa",
    storageBucket: "knock-knock-56faa.appspot.com",
    messagingSenderId: "146120721095",
    appId: "1:146120721095:web:bfffe5578b8acb408134e2",
    measurementId: "G-DXHE9PVQ3D"
  };
  
  // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);
   const database = getDatabase(app);
  
  
    document.getElementById("reg-btn").addEventListener('click', function(){
      document.getElementById("register-div").style.display="inline";
     document.getElementById("login-div").style.display="none";
  });
  
  document.getElementById("log-btn").addEventListener('click', function(){
   document.getElementById("register-div").style.display="none";
    document.getElementById("login-div").style.display="inline";
  
  });
  
    document.getElementById("login-btn").addEventListener('click', function(){
      
     const loginEmail= document.getElementById("loginemail").value;
     const loginPassword =document.getElementById("loginpassword").value;
  
  //    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  //   .then((userCredential) => {
  //     const user = userCredential.user;
  //      document.getElementById("result-box").style.display="inline";
  //      document.getElementById("login-div").style.display="none";
  
  //      //      let button = document.getElementById("login-btn");
  
  // // button.onclick = function(e) {
  // //     e.preventDefault();
  
  // //     // Replace localhost and the folder name
  // //     // based on your setup
  // //     location.href = 'http://www.pakainfo.com';
  // // }
  //     //  document.getElementById("result").innerHTML="Welcome Back<br>"+loginEmail+" was Login Successfully";
  //      const dt = new Date();
  //          update(ref(database, 'users/' + user.uid),{
  //           last_login: dt,
  //         })
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //    alert("Please enter correct email or password");
  
  //   });
  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  .then(function(){
  
    //Succesful, do whatever you want in your page
    console.log("redirect");
    window.location.href = 'login.html';
    
  
  })
  .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
  
          if (errorCode === 'auth/user-not-found') {
             alert('Email or password incorrect!');
          } else if (errorCode === 'auth/wrong-password') {
             alert('Password incorrect!');
          }     
          else {
            alert('Write correct email')
          }
  
  });
  
  
  });
  
  
    document.getElementById("register-btn").addEventListener('click', function(){
  
      const firstName = document.getElementById("firstname").value;
      const lastName = document.getElementById("lastname").value;
      const registerEmail= document.getElementById("registeremail").value;
     const registerPassword =document.getElementById("registerpassword").value;
  
     createUserWithEmailAndPassword(auth,registerEmail, registerPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("result-box").style.display="inline";
       document.getElementById("register-div").style.display="none";
       document.getElementById("result").innerHTML="Welcome <br>"+registerEmail+" was Registered Successfully";
       set(ref(database, 'users/' + user.uid),{
        firstName:firstName,
        lastName:lastName, 
        registerEmail: registerEmail
        })
       
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Please enter new email");
  
    });
  });
  
  
  document.getElementById("log-out-btn").addEventListener('click', function(){
    signOut(auth).then(() => {
       document.getElementById("result-box").style.display="none";
         document.getElementById("login-div").style.display="inline";
    }).catch((error) => {
       document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;
    });
  
  });
  