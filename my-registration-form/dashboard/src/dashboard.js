let registeredUsers = [];


function populateDashboard() {
    
    document.getElementById("camper-data").innerHTML = "";
    document.getElementById("sucf-data").innerHTML = "";
    document.getElementById("pilgrim-data").innerHTML = "";

    
    registeredUsers.forEach(user => {
        const row = document.createElement("tr");

        if (user.category === "Camper") {
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.gender}</td>
                <td>${user.email}</td>
                <td>${user.address}</td>
                <td>${user.phone}</td>
                <td>${user.school || "N/A"}</td>
                <td>${user.church || "N/A"}</td>
                <td>${user.age || "N/A"}</td>
                <td>${user.class || "N/A"}</td>
                <td>${user.community || "N/A"}</td>
                <td>${user.medicalConditions || "N/A"}</td>
                <td>${user.medicalDetails || "None"}</td>
            `;
            document.getElementById("camper-data").appendChild(row);
        } else if (user.category === "SUCF") {
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.gender}</td>
                <td>${user.email}</td>
                <td>${user.address}</td>
                <td>${user.phone}</td>
                <td>${user.church || "N/A"}</td>
            `;
            document.getElementById("sucf-data").appendChild(row);
        } else if (user.category === "Pilgrim") {
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.gender}</td>
                <td>${user.email}</td>
                <td>${user.address}</td>
                <td>${user.phone}</td>
                <td>${user.church || "N/A"}</td>
            `;
            document.getElementById("pilgrim-data").appendChild(row);
        }
    });
}

// Function to handle form submission and add a new user
function handleRegistration(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect user details from the form
    const userDetails = {
        name: document.getElementById("name").value,
        gender: document.getElementById("gender").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        category: document.getElementById("category").value,
        school: document.getElementById("school") ? document.getElementById("school").value : "N/A",
        church: document.getElementById("church") ? document.getElementById("church").value : "N/A",
        age: document.getElementById("age") ? document.getElementById("age").value : "N/A",
        class: document.getElementById("class") ? document.getElementById("class").value : "N/A",
        community: document.getElementById("group") ? document.getElementById("group").value : "N/A",
        medicalConditions: document.getElementById("medical-conditions") ? document.getElementById("medical-conditions").value : "N/A",
        medicalDetails: document.getElementById("medical-details") ? document.getElementById("medical-details").value : "None"
    };

    // Add the new user to the registeredUsers array
    registeredUsers.push(userDetails);

    // Refresh the dashboard
    populateDashboard();

    // Display a success message
    alert("Registration successful!");
}

// Attach the registration handler to the form
document.getElementById("registration-form").addEventListener("submit", handleRegistration);

// Populate the dashboard on page load (if there are existing users)
document.addEventListener("DOMContentLoaded", populateDashboard);