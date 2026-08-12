
//event handler for displaying pannels
const insert = document.querySelector("#insert");
const insertPatientInfo = document.querySelector(".insert__patient-info");
const select = document.querySelector("#select");
const patientinfo = document.querySelector(".patient__info");
const update = document.querySelector("#update");
const UpdatePatientInfo = document.querySelector(".Update__patient-info");
const deleteInfo = document.querySelector("#delete");
const deletePatientInfo = document.querySelector(".delete__patient-info");

function eventHandler() {
    insertPatientInfo.classList.add("hidden");
    patientinfo.classList.add("hidden");
    UpdatePatientInfo.classList.add("hidden");
    deletePatientInfo.classList.add("hidden");    
}

insert.addEventListener("click", () => {
    eventHandler();
    insertPatientInfo.classList.remove("hidden");
});
select.addEventListener("click", () => {
    eventHandler();
    patientinfo.classList.remove("hidden");
});
update.addEventListener("click", () => {
    eventHandler();
    UpdatePatientInfo.classList.remove("hidden");
});
deleteInfo.addEventListener("click", () => {
    eventHandler();
    deletePatientInfo.classList.remove("hidden");
});

//data submit
const cardForm = document.querySelector("#cardForm");

cardForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const formData = new FormData(cardForm);

    const response = await fetch("/card", {
        method: "POST",
        body: new URLSearchParams(formData)
    });
    console.log(formData);
});

//patient Info
const patientInfo = document.querySelector("#patientInfo");

patientInfo.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cardNo = document.querySelector("#cardNo1").value;
    

    const response = await fetch(`/patient/info?Card_id=${cardNo}`);
    
    const data = await response.json();

    console.log(data);
    dispPatientInfo(data);
    patientInfo.classList.add("hidden");
});

const patientInfoWrapper = document.querySelector(".patient__info-wrapper");

function dispPatientInfo(data) {
    const CardId = document.createElement("p");
    CardId.textContent = `Card No: ${data.patient.Card_id}`;
    const PatientName = document.createElement("p");
    PatientName.textContent = `Patient Name: ${data.patient.Patient_name}`;
    const Age = document.createElement("p");
    Age.textContent = `Age: ${data.patient.Age}`;
    const PhoneNo = document.createElement("p");
    PhoneNo.textContent = `Phone No: ${data.patient.Phone_number}`;
    const Address = document.createElement("p");
    Address.textContent = `Address: ${data.patient.Address}`;
    const button = document.createElement("button");
    button.textContent = "clear";
    button.classList.add("reset");

    patientInfoWrapper.appendChild(CardId);
    patientInfoWrapper.appendChild(PatientName);
    patientInfoWrapper.appendChild(Age);
    patientInfoWrapper.appendChild(PhoneNo);
    patientInfoWrapper.appendChild(Address);
    patientInfoWrapper.appendChild(button);

const reset = document.querySelector(".reset");

    reset.addEventListener("click", () => {
        patientInfoWrapper.innerHTML="";
        patientInfo.classList.remove("hidden");
    });
}

//update info
const updateForm = document.querySelector("#updateForm");

console.log(updateForm);

updateForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    console.log("Update form submitted");

    const formData = new FormData(updateForm);

    console.log("Form data:");

    for (const [key, value] of formData) {
        console.log(key, value);
    }

    const response = await fetch("/update/info", {
        method: "PUT",
        body: new URLSearchParams(formData)
    });

    console.log("Response status:", response.status);

    const data = await response.json();

    console.log("Server response:", data);
});

//remove info
const patientInfoWrapper2 = document.querySelector(".patient__info-wrapper2");

const patientInfo2 = document.querySelector("#patientInfo2");

patientInfo2.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cardNo3 = document.querySelector("#cardNo3").value;
    

    const response = await fetch(`/patient/info?Card_id=${cardNo3}`);
    
    const data = await response.json();

    console.log(data);
    dispPatientInfo2(data);
});

let selectedId;
function dispPatientInfo2(data) {
    selectedId = data.patient.Card_id;
    const CardId = document.createElement("p");
    CardId.textContent = `Card No: ${data.patient.Card_id}`;
    const PatientName = document.createElement("p");
    PatientName.textContent = `Patient Name: ${data.patient.Patient_name}`;
    const Age = document.createElement("p");
    Age.textContent = `Age: ${data.patient.Age}`;
    const PhoneNo = document.createElement("p");
    PhoneNo.textContent = `Phone No: ${data.patient.Phone_number}`;
    const Address = document.createElement("p");
    Address.textContent = `Address: ${data.patient.Address}`;
    

    patientInfoWrapper2.appendChild(CardId);
    patientInfoWrapper2.appendChild(PatientName);
    patientInfoWrapper2.appendChild(Age);
    patientInfoWrapper2.appendChild(PhoneNo);
    patientInfoWrapper2.appendChild(Address);


    
}

const removeBtn = document.querySelector("#removeBtn");
removeBtn.addEventListener("click", async () => {
    const respons = await fetch(`/patient/${selectedId}`,
        {
            method: "DELETE"
        }
    );
        patientInfoWrapper2.classList.add("hidden");
});