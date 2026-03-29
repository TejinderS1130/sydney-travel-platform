// SWAP FROM <--> TO
function swapLocations() {
    const fromInput = document.getElementById("from");
    const toInput = document.getElementById("to");

    if (!fromInput || !toInput) return; // safety

    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
}

// TRAVELLERS DROPDOWN
let travellers = 1;

function toggleTravellers() {
    const dropdown = document.getElementById("travellerDropdown");
    if (!dropdown) return;

    dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
}

function updateTravellerDisplay() {
    const text = document.getElementById("travellerDisplay");
    if (!text) return;

    text.innerText = travellers;
}

function changeTravellers(action) {
    if (action === "increase") travellers++;
    if (action === "decrease" && travellers > 1) travellers--;

    const display = document.getElementById("travellerCount");
    if (display) {
        display.innerText = travellers;
    }

    updateTravellerDisplay(); // ✅ updates main field
}

// SEARCH FORM VALIDATION
function handleSearchSubmit() {
    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const date = document.getElementById("date").value;
    const returnDate = document.getElementById("returnDate")?.value;

    if (!from || !to || !date) {
        alert("Please fill all fields");
        return false;
    }

    if (!from || !to || !date) {
    openSignup(); // instead of alert
    return false;
}

    if (tripType === "return" && !returnDate) {
        alert("Please select return date");
        return false;
    }

    return true;
}

// CLOSE DROPDOWN ON OUTSIDE CLICK
document.addEventListener("click", function (e) {
    const dropdown = document.getElementById("travellerDropdown");
    const trigger = document.querySelector(".travellers-field");

    if (!dropdown || !trigger) return;

    if (!trigger.contains(e.target)) {
        dropdown.style.display = "none";
    }
});

// OPEN REAL FLIGHT PRICES
function openRealFlight(from, to, date) {
    if (!from || !to || !date) return;

    const url = `https://www.google.com/travel/flights?q=Flights from ${encodeURIComponent(from)} to ${encodeURIComponent(to)} on ${date}`;
    
    window.open(url, "_blank");
}

// TRIP TYPE SWITCH (RETURN / ONE-WAY)
let tripType = "return";

function selectTrip(type) {
    tripType = type;

    // update active tab
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    event.target.classList.add("active");

    const returnField = document.getElementById("returnDateField");

    if (type === "oneway") {
        returnField.style.display = "none";
    } else {
        returnField.style.display = "flex";
    }
}

// OPEN SIGNUP MODAL
function openSignup() {
    const modal = document.getElementById("signupModal");
    const container = document.querySelector(".contact-container");

    modal.classList.add("show");

    // trigger animation AFTER modal shows
    setTimeout(() => {
        container.classList.add("change");
    }, 100);
}

// CLOSE SIGNUP
document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.getElementById("closeModalBtn");

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            const modal = document.getElementById("signupModal");
            const container = document.querySelector(".contact-container");

            container.classList.remove("change");

            setTimeout(() => {
                modal.classList.remove("show");
            }, 300);
        });
    }
});