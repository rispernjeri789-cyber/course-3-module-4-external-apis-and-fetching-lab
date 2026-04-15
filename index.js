// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const searchForm = document.querySelector("#search-form");
const stateInput = document.querySelector("#state-input");
const alertsDisplay = document.querySelector("#alerts-display");
const errorMessage = document.querySelector("#error-message");
const fetchButton = document.querySelector("#fetch-alerts");

/**
 * Main handler for the search action
 */
function handleSearch(event) {
    if (event) event.preventDefault(); 
    const state = stateInput.value.trim().toUpperCase();

    if (state) {
        fetchWeatherData(state);
        // Test requires input to clear immediately
        stateInput.value = ""; 
    }
}

/**
 * Fetches data from the Weather API
 */
async function fetchWeatherData(state) {
    try {
        // Clear previous states and hide errors
        errorMessage.textContent = ""; 
        errorMessage.classList.add("hidden");
        alertsDisplay.innerHTML = "";

        const response = await fetch(`${weatherApi}${state}`);
        
        // If the response is not 200-299, throw an error for the catch block
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        // Pass the literal error message (e.g., "network failure") to the display
        displayError(error.message); 
    }
}

/**
 * Updates the DOM with fetched alerts
 */
function displayWeather(data) {
    const alerts = data.features;
    
    // The test looks for exactly this string: "Weather Alerts: X"
    const countHeader = document.createElement("h2");
    countHeader.textContent = `Weather Alerts: ${alerts.length}`;
    alertsDisplay.appendChild(countHeader);

    alerts.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline;
        alertsDisplay.appendChild(p);
    });
}

/**
 * Displays error messages in the DOM
 */
function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
    alertsDisplay.innerHTML = ""; 
}


if (searchForm) {
    searchForm.addEventListener("submit", handleSearch);
}

if (fetchButton) {
    fetchButton.addEventListener("click", handleSearch);
}