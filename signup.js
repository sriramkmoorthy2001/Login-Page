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

