// Get DOM elements
const containerWeightEntry = document.getElementById("containerWeightEntry");
const containerWeightDisplay = document.getElementById("containerWeightDisplay");
const btnRecord = document.getElementById("btnRecord");
const outputDate = document.getElementById("outputDate");
const btnSave = document.getElementById("btnSave");
const newWeight = document.getElementById("newWeight");
const weightHistory = document.getElementById("weightHistory");
const mainWeight = document.getElementById("mainWeight");

// Initialize weight data array
let weightData = [];

// Event handler for the "RECORD YOUR WEIGHT" button
btnRecord.onclick = () => {
    containerWeightDisplay.style.display = "none";
    containerWeightEntry.style.display = "block";
    newWeight.value = "";
}

// Event handler for the "SAVE" button
btnSave.onclick = () => {
    containerWeightDisplay.style.display = "block";
    containerWeightEntry.style.display = "none";

    // Get the entered weight
    const theWeight = newWeight.value;

    // Create a new weight object
    const weight = {
        newWeight: theWeight,
        date: getDate(),
    };

    // Add the weight to the data array
    weightData.push(weight);

    // Save the data to localStorage
    localStorage.setItem("weightHistory", JSON.stringify(weightData));

    // Reset the weight history display
    weightHistory.innerHTML = "<h2>WEIGHT HISTORY</h2>";

    // Display the updated weight history
    displayWeightHistory();
}

// Function to get the current date in MM.DD.YYYY format
const getDate = () => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    return `${month}.${day}.${year}`;
}

// Function to display the weight history
const displayWeightHistory = () => {
    let theWeights = localStorage.getItem("weightHistory");
    
    if (theWeights !== null) {
        weightData = JSON.parse(theWeights);

        let x = 0;
        let lastWeight = 0;

        while (x < weightData.length) {
            const date = weightData[x].date;
            const weight = weightData[x].newWeight;
            lastWeight = weight;

            const out = `<div class='weightHistoryCell'><span class='left'>${date}</span> <span class='right'>${weight}</span></div>`;
            weightHistory.innerHTML += out;

            x++;
        }

        mainWeight.innerHTML = lastWeight;
    } else {
        let lastWeight = "---";
        mainWeight.innerHTML = lastWeight;
    }
}

// Initial setup
containerWeightEntry.style.display = "none";
outputDate.innerHTML = getDate();
displayWeightHistory();
