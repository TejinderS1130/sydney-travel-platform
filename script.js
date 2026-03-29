function searchFlights() {
    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const date = document.getElementById("date").value;

    // validation
    if (!from || !to || !date) {
        alert("Please fill all fields");
        return;
    }

    // better Google Flights query
    const url = `https://www.google.com/travel/flights?q=Flights from ${encodeURIComponent(from)} to ${encodeURIComponent(to)} on ${date}`;

    window.open(url, "_blank");
}
