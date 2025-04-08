// List of communities for junior and senior categories
const juniorCommunities = ["Junior Community A", "Junior Community B", "Junior Community C"];
const seniorCommunities = ["Senior Community A", "Senior Community B", "Senior Community C"];

// Function to assign a random community
function assignRandomCommunity(communities) {
    const randomIndex = Math.floor(Math.random() * communities.length);
    return communities[randomIndex];
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
            if (["jss1", "jss2", "jss3"].includes(this.value)) {
                // Assign a junior community
                communityInput.value = assignRandomCommunity(juniorCommunities);
            } else if (["ss1", "ss2", "ss3", "school-leaver"].includes(this.value)) {
                // Assign a senior community
                communityInput.value = assignRandomCommunity(seniorCommunities);
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

// Event listener for medical conditions
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