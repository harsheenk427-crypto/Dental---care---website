/* =========================
   LOGIN
========================= */

function login(event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    if (username === "admin" && password === "1234") {

        localStorage.setItem("loggedIn", "true");

        window.location.href = "dashboard.html";

    } else {

        alert(
            "Invalid login!\n\nDemo:\nUsername: admin\nPassword: 1234"
        );

    }
}


/* =========================
   LOGOUT
========================= */

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "index.html";
}


/* =========================
   PATIENT DATA
========================= */

let patients =
    JSON.parse(
        localStorage.getItem("patients")
    ) || [

        {
            id: 1,
            name: "Rahul Sharma",
            age: 22,
            phone: "9876543210",
            email: "rahul@example.com",
            gender: "Male",
            history: "Regular checkup"
        },

        {
            id: 2,
            name: "Simran Kaur",
            age: 24,
            phone: "9876501234",
            email: "simran@example.com",
            gender: "Female",
            history: "Sensitive teeth"
        }

    ];


/* =========================
   DISPLAY PATIENTS
========================= */

function displayPatients() {

    const table =
        document.getElementById("patientTable");

    if (!table) return;

    const search =
        document.getElementById("patientSearch")
            .value
            .toLowerCase();

    table.innerHTML = "";

    patients
        .filter(patient =>
            patient.name
                .toLowerCase()
                .includes(search)
        )
        .forEach(patient => {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>P${patient.id}</td>

                <td>
                    <strong>${patient.name}</strong>
                </td>

                <td>${patient.age}</td>

                <td>${patient.phone}</td>

                <td>${patient.gender}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deletePatient(${patient.id})"
                    >
                        Delete
                    </button>

                </td>

            `;

            table.appendChild(row);

        });

    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );
}


/* =========================
   PATIENT FORM
========================= */

function openPatientForm() {

    document
        .getElementById("patientForm")
        .classList
        .remove("hidden");
}


function closePatientForm() {

    document
        .getElementById("patientForm")
        .classList
        .add("hidden");
}


/* =========================
   ADD PATIENT
========================= */

function addPatient() {

    const name =
        document.getElementById("patientName").value;

    const age =
        document.getElementById("patientAge").value;

    const phone =
        document.getElementById("patientPhone").value;

    const email =
        document.getElementById("patientEmail").value;

    const gender =
        document.getElementById("patientGender").value;

    const history =
        document.getElementById("patientHistory").value;


    if (!name || !age || !phone || !gender) {

        alert("Please fill all required fields.");

        return;
    }


    const patient = {

        id:
            patients.length
                ? patients[patients.length - 1].id + 1
                : 1,

        name,
        age,
        phone,
        email,
        gender,
        history

    };


    patients.push(patient);


    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );


    alert("Patient added successfully!");


    closePatientForm();


    document
        .querySelectorAll("#patientForm input")
        .forEach(input => input.value = "");


    document
        .getElementById("patientHistory")
        .value = "";


    displayPatients();
}


/* =========================
   DELETE PATIENT
========================= */

function deletePatient(id) {

    if (!confirm("Delete this patient?")) return;

    patients =
        patients.filter(
            patient => patient.id !== id
        );

    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );

    displayPatients();
}


/* =========================
   APPOINTMENTS
========================= */

let appointments =
    JSON.parse(
        localStorage.getItem("appointments")
    ) || [];


/* OPEN FORM */

function openAppointmentForm() {

    document
        .getElementById("appointmentForm")
        .classList
        .remove("hidden");
}


function closeAppointmentForm() {

    document
        .getElementById("appointmentForm")
        .classList
        .add("hidden");
}


/* ADD APPOINTMENT */

function addAppointment() {

    const patient =
        document.getElementById(
            "appointmentPatient"
        ).value;

    const dentist =
        document.getElementById(
            "dentist"
        ).value;

    const date =
        document.getElementById(
            "appointmentDate"
        ).value;

    const time =
        document.getElementById(
            "appointmentTime"
        ).value;

    const status =
        document.getElementById(
            "appointmentStatus"
        ).value;

    const reason =
        document.getElementById(
            "appointmentReason"
        ).value;


    if (!patient || !dentist || !date || !time) {

        alert("Please complete the appointment details.");

        return;
    }


    appointments.push({

        id: Date.now(),

        patient,

        dentist,

        date,

        time,

        status,

        reason

    });


    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );


    alert("Appointment booked successfully!");


    closeAppointmentForm();

    displayAppointments();
}


/* DISPLAY APPOINTMENTS */

function displayAppointments() {

    const list =
        document.getElementById(
            "appointmentList"
        );

    if (!list) return;


    list.innerHTML = "";


    if (appointments.length === 0) {

        list.innerHTML =
            "<p>No appointments available.</p>";

        return;
    }


    appointments.forEach(appointment => {

        const card =
            document.createElement("div");

        card.className =
            "appointment-card";


        card.innerHTML = `

            <h3>
                👤 ${appointment.patient}
            </h3>

            <p>
                🧑‍⚕️ Dentist:
                ${appointment.dentist}
            </p>

            <p>
                📅 ${appointment.date}
            </p>

            <p>
                ⏰ ${appointment.time}
            </p>

            <p>
                Reason:
                ${appointment.reason || "Not specified"}
            </p>

            <span class="status">
                ${appointment.status}
            </span>

            <br><br>

            <button
                class="delete-btn"
                onclick="deleteAppointment(${appointment.id})"
            >
                Delete
            </button>

        `;


        list.appendChild(card);

    });

}


/* DELETE APPOINTMENT */

function deleteAppointment(id) {

    appointments =
        appointments.filter(
            appointment =>
                appointment.id !== id
        );


    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );


    displayAppointments();
}


/* =========================
   TREATMENTS
========================= */

let treatments =
    JSON.parse(
        localStorage.getItem("treatments")
    ) || [

        {
            id: 1,

            patient: "Rahul Sharma",

            treatment: "Dental Cleaning",

            status: "Completed",

            date: "2026-09-20",

            notes: "Regular cleaning completed."
        },

        {
            id: 2,

            patient: "Simran Kaur",

            treatment: "Root Canal",

            status: "In Progress",

            date: "2026-09-25",

            notes: "Second session completed."
        }

    ];


/* OPEN FORM */

function openTreatmentForm() {

    document
        .getElementById("treatmentForm")
        .classList
        .remove("hidden");
}


function closeTreatmentForm() {

    document
        .getElementById("treatmentForm")
        .classList
        .add("hidden");
}


/* ADD TREATMENT */

function addTreatment() {

    const patient =
        document.getElementById(
            "treatmentPatient"
        ).value;

    const treatment =
        document.getElementById(
            "treatmentName"
        ).value;

    const status =
        document.getElementById(
            "treatmentStatus"
        ).value;

    const date =
        document.getElementById(
            "treatmentDate"
        ).value;

    const notes =
        document.getElementById(
            "treatmentNotes"
        ).value;


    if (!patient || !treatment || !date) {

        alert("Please fill the required fields.");

        return;
    }


    treatments.push({

        id: Date.now(),

        patient,

        treatment,

        status,

        date,

        notes

    });


    localStorage.setItem(
        "treatments",
        JSON.stringify(treatments)
    );


    alert("Treatment added successfully!");


    closeTreatmentForm();


    displayTreatments();
}


/* DISPLAY TREATMENTS */

function displayTreatments() {

    const list =
        document.getElementById(
            "treatmentList"
        );

    if (!list) return;


    list.innerHTML = "";


    treatments.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            "treatment-card";


        card.innerHTML = `

            <h3>🦷 ${item.treatment}</h3>

            <p>
                <strong>Patient:</strong>
                ${item.patient}
            </p>

            <p>
                <strong>Date:</strong>
                ${item.date}
            </p>

            <p>
                <strong>Status:</strong>
                ${item.status}
            </p>

            <p>
                <strong>Notes:</strong>
                ${item.notes || "No notes"}
            </p>

            <br>

            <button
                class="delete-btn"
                onclick="deleteTreatment(${item.id})"
            >
                Delete
            </button>

        `;


        list.appendChild(card);

    });

}


/* DELETE TREATMENT */

function deleteTreatment(id) {

    treatments =
        treatments.filter(
            item => item.id !== id
        );


    localStorage.setItem(
        "treatments",
        JSON.stringify(treatments)
    );


    displayTreatments();
}


/* =========================
   DASHBOARD COUNTS
========================= */

function updateDashboard() {

    const patientCount =
        document.getElementById(
            "patientCount"
        );

    const appointmentCount =
        document.getElementById(
            "appointmentCount"
        );

    const treatmentCount =
        document.getElementById(
            "treatmentCount"
        );

    const completedCount =
        document.getElementById(
            "completedCount"
        );


    if (patientCount) {

        patientCount.innerText =
            patients.length;
    }


    if (appointmentCount) {

        appointmentCount.innerText =
            appointments.length;
    }


    if (treatmentCount) {

        treatmentCount.innerText =

            treatments.filter(
                item =>
                    item.status !== "Completed"
            ).length;
    }


    if (completedCount) {

        completedCount.innerText =

            treatments.filter(
                item =>
                    item.status === "Completed"
            ).length;
    }

}


/* =========================
   PAGE INITIALIZATION
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayPatients();

        displayAppointments();

        displayTreatments();

        updateDashboard();

    }
);