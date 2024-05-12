function handleCredentialResponse(response) {
     // decodeJwtResponse() is a custom function defined by you
     // to decode the credential response.
     const responsePayload = decodeJwtResponse(response.credential);

     console.log("ID: " + responsePayload.sub);
     console.log('Full Name: ' + responsePayload.name);
     console.log("Email: " + responsePayload.email);
  }

let btn = document.querySelectorAll(".submit")

function signin() {
    window.location.href = "./home.html"
}