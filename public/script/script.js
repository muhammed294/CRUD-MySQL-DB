//event handler for displaying pannels
const insert = document.querySelector("#insert");
const insertPatientInfo = document.querySelector(".insert__patient-info");
const select = document.querySelector("#select");
const patientInfo = document.querySelector(".patient__info");
const update = document.querySelector("#update");
const UpdatePatientInfo = document.querySelector(".Update__patient-info");
const deleteInfo = document.querySelector("#delete");
const deletePatientInfo = document.querySelector(".delete__patient-info");

function eventHandler() {
    insertPatientInfo.classList.add("hidden");
    patientInfo.classList.add("hidden");
    UpdatePatientInfo.classList.add("hidden");
    deletePatientInfo.classList.add("hidden");    
}

insert.addEventListener("click", () => {
    eventHandler();
    insertPatientInfo.classList.remove("hidden");
});
select.addEventListener("click", () => {
    eventHandler();
    patientInfo.classList.remove("hidden");
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
