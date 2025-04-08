// Communities data structure
const communities = {};
let currentCommunity = "A"; // Start with Community A
let juniorCount = 0;
let seniorCount = 0;

// Function to assign a camper to a community
function assignCommunity(classLevel) {
    // Initialize the current community if not already done
    if (!communities[currentCommunity]) {
        communities[currentCommunity] = { juniors: [], seniors: [] };
    }

    // Assign to the appropriate group (junior or senior)
    if (["jss1", "jss2", "jss3"].includes(classLevel)) {
        if (juniorCount <= 15) {
            communities[currentCommunity].juniors.push(classLevel);
            juniorCount++;
        } else {
            moveToNextCommunity();
            assignCommunity(classLevel); // Recurse to assign to the new community
        }
    } else if (["ss1", "ss2", "ss3"].includes(classLevel)) {
        if (seniorCount <= 15) {
            communities[currentCommunity].seniors.push(classLevel);
            seniorCount++;
        } else {
            moveToNextCommunity();
            assignCommunity(classLevel); // Recurse to assign to the new community
        }
    }
}

// Function to move to the next community
function moveToNextCommunity() {
    juniorCount = 0;
    seniorCount = 0;
    currentCommunity = String.fromCharCode(currentCommunity.charCodeAt(0) + 1); // Move to the next letter
    communities[currentCommunity] = { juniors: [], seniors: [] }; // Initialize the new community
}

// Category selection
document.getElementById("category").addEventListener("change", function () {
    const schoolInput = document.getElementById("school");
    const ageInput = document.getElementById("age");
    const classInput = document.getElementById("class");
    const communityInput = document.getElementById("community");

    if (this.value === "camper") {
        // Enable fields for "Camper"
        schoolInput.disabled = false;
        ageInput.disabled = false;
        classInput.disabled = false;

        // Assign community based on class
        classInput.addEventListener("change", function () {
            if (["jss1", "jss2", "jss3", "ss1", "ss2", "ss3"].includes(this.value)) {
                assignCommunity(this.value);
                communityInput.value = `Community ${currentCommunity}`;
            } else if (this.value === "school-leaver") {
                // Do not assign school leavers to any community
                communityInput.value = "Not applicable";
            } else {
                // Clear the community field if no valid class is selected
                communityInput.value = "";
            }
        });
    } else {
        // Disable fields for other categories
        schoolInput.disabled = true;
        ageInput.disabled = true;
        classInput.disabled = true;

        // Clear the values of the disabled fields
        schoolInput.value = "";
        ageInput.value = "";
        classInput.value = "";
        communityInput.value = "Not applicable";
    }
});

// Ensure fields are disabled by default if no category is selected
document.addEventListener("DOMContentLoaded", () => {
    const category = document.getElementById("category").value;
    const schoolInput = document.getElementById("school");
    const ageInput = document.getElementById("age");
    const classInput = document.getElementById("class");
    const communityInput = document.getElementById("community");

    if (category !== "camper") {
        schoolInput.disabled = true;
        ageInput.disabled = true;
        classInput.disabled = true;
        communityInput.value = "Not applicable";
    }
});

// Medical conditions
document.getElementById("medical-conditions").addEventListener("change", function () {
    const medicalDetailsContainer = document.getElementById("medical-details-container");
    if (this.value === "yes") {
        medicalDetailsContainer.style.display = "block";
        document.getElementById("medical-details").setAttribute("required", "required");
    } else {
        medicalDetailsContainer.style.display = "none";
        document.getElementById("medical-details").removeAttribute("required");
    }
});

// Log the communities for debugging (optional)
console.log("Communities:", communities);