let btn = document.querySelectorAll(".submit")
function signin() {
    window.location.href = "./home.html"
}


function handleCredentialResponse(response) {
  const responsePayload = decodeJwtResponse(response.credential)
        console.log("Encoded JWT ID token: " + response.credential);
        console.log("ID: " + responsePayload.sub);
        console.log("Name: " + responsePayload.name);
        console.log("Email: " + responsePayload.email);
        console.log("Image: " + responsePayload.picture)
      }
      window.onload = function () {
        google.accounts.id.initialize({
          client_id: "168701671651-vec2hrbifctua0slnq2i98vkemu8r5at.apps.googleusercontent.com",
          callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { theme: "outline", size: "large" ,width:"100px" ,shape:"pill" }  // customization attributes
        );
        // google.accounts.id.prompt(); // also display the One Tap dialog
      }

//Decode Jwt tokens      
function decodeJwtResponse(data) {
  var tokens = data.split(".");
  return JSON.parse(atob(tokens[1]));
}




const myWorker = new Worker("worker.js");

if (crossOriginIsolated) {
  const buffer = new SharedArrayBuffer(16);
  myWorker.postMessage(buffer);
} else {
  const buffer = new ArrayBuffer(16);
  myWorker.postMessage(buffer);
}

// Set COOP headers
document.addEventListener('DOMContentLoaded', function() {
  fetch('/', { method: 'GET', mode: 'no-cors' })
    .then(function(response) {
      const headers = response.headers;
      headers.set('Cross-Origin-Opener-Policy', 'same-origin');
      headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
      headers.set('Cross-Origin-Resource-Policy', 'same-origin');
      headers.set('Cross-Origin-Policy', 'same-origin-allow-popups');
    })
    .catch(function(err) {
      console.error('Error fetching:', err);
    });
});

//Form Validation

let input = document.querySelectorAll("input")
let button = document.querySelector(".submit")
let warning = document.getElementById("warning")
let warning1 = document.getElementById("warning1")
let warning2 = document.getElementById("warning2")
let warning3 = document.getElementById("warning3")
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


function formvalidate() {
  let username = input[0].value
  let email = input[1].value 
  let password = input[2].value

  // Clear previous warnings
  warning.innerText = "";
  warning1.innerText = "";
  warning2.innerText = "";
  warning3.innerText = "";

  if(username == "" || email == "" || password ==""){
      warning.innerText = "PLEASE FILL THE REQUIRED FIELD"
      warning.style.color = "red"
      warning.style.textAlign = "center"
  }
  else if(username.length<5 || username.length>15) {
      warning1.innerText = "NAME'S CHARACTER SHOULD BE BEWTEEN 5 AND 15"
      warning1.style.color = "red"
      warning1.style.marginTop = "3px"
      warning1.style.fontSize = "10px";
  }
  else if(!emailRegex.test(email)) {
        warning2.innerText = "PLEASE ENTER THE EMAIL"
        warning2.style.color = "red"
        warning2.style.marginTop = "3px"
        warning2.style.fontSize = "10px";
  }
  else if(password.length<8 || password.length>15) {
        warning3.innerText = "PASSWORD MUST BE BETWEEN 8 TO 15 CHARACTERS!!!"
        warning3.style.color = "red"
        warning3.style.marginTop = "3px"
        warning3.style.fontSize = "10px"
  }   
  else {
        warning.innerText = "";
        warning1.innerText = "";
        warning2.innerText = " ";
        warning3.innerText = "";
  }
  console.log(...input)
}
