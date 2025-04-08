// Community names
const communityNames = [
    "Faith", "Hope", "Love", "Joy", "Peace", "Patience", "Kindness", "Goodness", "Gentleness", "Self-Control",
    "Righteousness", "Grace", "Mercy", "Purity", "Holiness", "Humility", "Integrity", "Courage", "Obedience",
    "Generosity", "Forgiveness", "Wisdom", "Compassion", "Perseverance", "Zeal"
];

// Communities data structure
const communities = {};
let currentCommunityIndex = 0; // Start with the first community
let juniorCount = 0;
let seniorCount = 0;

// Initialize all communities
communityNames.forEach(name => {
    communities[name] = { juniors: [], seniors: [] };
});

// Function to assign a camper to a community
function assignCommunity(classLevel) {
    // Randomly assign to the first 15 communities if they are not full
    const availableCommunities = communityNames.slice(0, 15).filter(name => {
        return communities[name].juniors.length < 15 || communities[name].seniors.length < 15;
    });

    // If the first 15 communities are full, move to the remaining communities
    if (availableCommunities.length === 0) {
        const remainingCommunities = communityNames.slice(15).filter(name => {
            return communities[name].juniors.length < 15 || communities[name].seniors.length < 15;
        });

        if (remainingCommunities.length > 0) {
            assignToSpecificCommunity(classLevel, remainingCommunities[0]);
        }
    } else {
        // Randomly pick a community from the available ones
        const randomCommunity = availableCommunities[Math.floor(Math.random() * availableCommunities.length)];
        assignToSpecificCommunity(classLevel, randomCommunity);
    }
}

// Function to assign a camper to a specific community
function assignToSpecificCommunity(classLevel, communityName) {
    if (["jss1", "jss2", "jss3"].includes(classLevel)) {
        if (communities[communityName].juniors.length < 15) {
            communities[communityName].juniors.push(classLevel);
        }
    } else if (["ss1", "ss2", "ss3"].includes(classLevel)) {
        if (communities[communityName].seniors.length < 15) {
            communities[communityName].seniors.push(classLevel);
        }
    }
}

// Event listener for category selection
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
                const assignedCommunity = findAssignedCommunity(this.value);
                communityInput.value = assignedCommunity ? assignedCommunity : "Not applicable";
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

// Function to find the community a camper was assigned to
function findAssignedCommunity(classLevel) {
    for (const [communityName, members] of Object.entries(communities)) {
        if (["jss1", "jss2", "jss3"].includes(classLevel) && members.juniors.includes(classLevel)) {
            return communityName;
        }
        if (["ss1", "ss2", "ss3"].includes(classLevel) && members.seniors.includes(classLevel)) {
            return communityName;
        }
    }
    return null;
}

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