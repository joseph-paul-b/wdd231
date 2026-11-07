// Lagos Business Connect Chamber
// Directory JavaScript

// ---------- Select HTML Elements ----------

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

const membersContainer = document.querySelector("#members-container");

const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");


// ---------- Mobile Navigation ----------

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";

});


// ---------- Display Current Year ----------

currentYear.textContent = new Date().getFullYear();


// ---------- Display Last Modification ----------

lastModified.textContent = document.lastModified;


// ---------- Display Business Members ----------

async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load business information.");
        }

        const data = await response.json();

        displayMembers(data);

    } catch (error) {

        console.error("Error loading members:", error);

        membersContainer.textContent =
            "Sorry, business information could not be loaded.";

    }

}


// ---------- Create Business Cards ----------

function displayMembers(members) {

    membersContainer.innerHTML = "";

    membersContainer.classList.add("grid-view");

    members.forEach((member) => {

        const card = document.createElement("section");

        card.classList.add("member-card");

        const image = document.createElement("img");

        image.src = member.image;

        image.alt = member.name + " logo";

        image.loading = "lazy";

        const heading = document.createElement("h3");

        heading.textContent = member.name;

        const address = document.createElement("p");

        address.textContent = member.address;

        const phone = document.createElement("p");

        phone.textContent = member.phone;

        const website = document.createElement("a");

        website.href = member.website;

        website.textContent = "Visit Website";

        website.target = "_blank";

        website.rel = "noopener noreferrer";

        // ---------- Membership Level ----------

        const membership = document.createElement("p");

        const levels = {
            1: "Member",
            2: "Silver",
            3: "Gold"
        };

        membership.textContent =
            "Membership Level: " + levels[member.membershipLevel];

        // ---------- Add Elements to Card ----------

        card.appendChild(image);

        card.appendChild(heading);

        card.appendChild(address);

        card.appendChild(phone);

        card.appendChild(website);

        card.appendChild(membership);

        membersContainer.appendChild(card);

    });

}


// ---------- Grid View ----------

gridButton.addEventListener("click", () => {

    membersContainer.classList.add("grid-view");

    membersContainer.classList.remove("list-view");

});


// ---------- List View ----------

listButton.addEventListener("click", () => {

    membersContainer.classList.add("list-view");

    membersContainer.classList.remove("grid-view");

});


// ---------- Load Business Information ----------

getMembers();