// Lagos Business Connect Chamber
// Discover Page JavaScript

import { discoverItems } from "../data/discover.mjs";


// Select HTML Elements

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const discoverContainer = document.querySelector("#discover-container");
const visitMessage = document.querySelector("#visit-message");

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");


// Mobile Navigation

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


// Display Current Year

currentYear.textContent = new Date().getFullYear();


// Display Last Modification

lastModified.textContent = document.lastModified;


// Display Discover Cards

function displayDiscoverItems(items) {

    discoverContainer.innerHTML = "";

    items.forEach((item, index) => {

        const card = document.createElement("article");

        card.classList.add("discover-card");
        card.classList.add("area-" + (index + 1));

        const heading = document.createElement("h2");

        heading.textContent = item.name;

        const figure = document.createElement("figure");

        const image = document.createElement("img");

        image.src = item.image;
        image.alt = item.name;
        image.loading = "lazy";

        figure.appendChild(image);

        const address = document.createElement("address");

        address.textContent = item.address;

        const description = document.createElement("p");

        description.textContent = item.description;

        const button = document.createElement("button");

        button.type = "button";
        button.textContent = "Learn More";

        card.appendChild(heading);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        discoverContainer.appendChild(card);

    });

}


// Visitor Message

function displayVisitMessage() {

    const lastVisit = localStorage.getItem("lastVisit");

    const currentDate = Date.now();

    if (lastVisit === null) {

        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";

    } else {

        const timeDifference = currentDate - Number(lastVisit);

        const days = Math.floor(
            timeDifference / (1000 * 60 * 60 * 24)
        );

        if (days < 1) {

            visitMessage.textContent =
                "Back so soon! Awesome!";

        } else if (days === 1) {

            visitMessage.textContent =
                "You last visited 1 day ago.";

        } else {

            visitMessage.textContent =
                "You last visited " + days + " days ago.";

        }

    }

    localStorage.setItem("lastVisit", currentDate);

}


// Run Discover Page Functions

displayDiscoverItems(discoverItems);

displayVisitMessage();