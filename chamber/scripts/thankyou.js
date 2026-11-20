// ---------- Get Form Information from URL ----------

const currentUrl = window.location.search;

const urlParams = new URLSearchParams(currentUrl);

const firstName = urlParams.get("first-name");
const lastName = urlParams.get("last-name");
const email = urlParams.get("email");
const phone = urlParams.get("phone");
const organization = urlParams.get("organization");
const timestamp = urlParams.get("timestamp");
// ---------- Display Application Information ----------

document.querySelector("#first-name").textContent = firstName;

document.querySelector("#last-name").textContent = lastName;

document.querySelector("#email").textContent = email;

document.querySelector("#phone").textContent = phone;

document.querySelector("#organization").textContent = organization;

document.querySelector("#timestamp").textContent = timestamp;