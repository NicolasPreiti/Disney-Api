const loginForm = document.getElementById('loginForm');
const nameLogin = document.getElementById('nameLogin');
const passwordLogin = document.getElementById('passwordLogin');

if (loginForm) {
    loginForm.addEventListener('click', async(evt)=>{
        if (!nameLogin.value || !passwordLogin.value) {
            evt.preventDefault();
        } else {
           
        };
    });
};


const updateForm = document.getElementById('updateForm');
const nameUpdate = document.getElementById('nameUpdate');
const ageUpdate = document.getElementById('ageUpdate');
const weightUpdate = document.getElementById('weightUpdate');
const historyUpdate = document.getElementById('historyUpdate');
const imageUpdate = document.getElementById('imageUpdate');

if (updateForm) {
    updateForm.addEventListener('click', async(evt)=>{
        if (!nameUpdate.value || !ageUpdate.value || !weightUpdate.value || !historyUpdate.value || !imageUpdate.value) {
            evt.preventDefault();
        } else {
           
        };
    });
};

const updateMovForm = document.getElementById('updateMovForm');
const titleUpdate = document.getElementById('titleUpdate');
const creationDateUpdate = document.getElementById('creationDateUpdate');
const qualificationUpdate = document.getElementById('qualificationUpdate');
const imageMovUpdate = document.getElementById('imageMovUpdate');
const genderMovUpdate = document.getElementById('genderMovUpdate');

if (updateMovForm) {
    updateMovForm.addEventListener('click', async(evt)=>{
        const optionValue = genderMovUpdate.options[genderMovUpdate.selectedIndex].value;
        if (!titleUpdate.value || !creationDateUpdate.value || !qualificationUpdate.value || !imageMovUpdate.value || !optionValue) {
            evt.preventDefault();
        } else {
           
        };
    });
};