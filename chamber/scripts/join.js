// ---------- Select Membership Links and Dialogs ----------

const npLink = document.querySelector('a[href="#np-modal"]');
const bronzeLink = document.querySelector('a[href="#bronze-modal"]');
const silverLink = document.querySelector('a[href="#silver-modal"]');
const goldLink = document.querySelector('a[href="#gold-modal"]');

const npModal = document.querySelector("#np-modal");
const bronzeModal = document.querySelector("#bronze-modal");
const silverModal = document.querySelector("#silver-modal");
const goldModal = document.querySelector("#gold-modal");

// ---------- Open Membership Dialogs ----------

npLink.addEventListener("click", (event) => {
    event.preventDefault();
    npModal.showModal();
});

bronzeLink.addEventListener("click", (event) => {
    event.preventDefault();
    bronzeModal.showModal();
});

silverLink.addEventListener("click", (event) => {
    event.preventDefault();
    silverModal.showModal();
});

goldLink.addEventListener("click", (event) => {
    event.preventDefault();
    goldModal.showModal();
});

// ---------- Close Membership Dialogs ----------

const npClose = npModal.querySelector(".close-modal");
const bronzeClose = bronzeModal.querySelector(".close-modal");
const silverClose = silverModal.querySelector(".close-modal");
const goldClose = goldModal.querySelector(".close-modal");

npClose.addEventListener("click", () => {
    npModal.close();
});

bronzeClose.addEventListener("click", () => {
    bronzeModal.close();
});

silverClose.addEventListener("click", () => {
    silverModal.close();
});

goldClose.addEventListener("click", () => {
    goldModal.close();
});
// ---------- Set Form Timestamp ----------

const timestamp = document.querySelector("#timestamp");

timestamp.value = new Date().toLocaleString();