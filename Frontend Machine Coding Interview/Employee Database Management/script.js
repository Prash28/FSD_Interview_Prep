(async function(){
    const data = await fetch("./src/data.json");
    const result = await data.json();
    console.log(result);

let employees = result;
let selectedEmployeeId = employees[0].id;
let selectedEmployee = employees[0];

const employeeList = document.getElementById("employee-list-el");
const employeeInfo = document.getElementById("employee-details-el");

const createEmployee = document.querySelector(".add-employee-btn");
const addEmployeeModal = document.querySelector(".add-employee-container");
const addEmployeeForm = document.querySelector(".addEmployee_create");

createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });

  addEmployeeModal.addEventListener('click', (e) => {
    if(e.target.className==="add-employee-container"){
        addEmployeeModal.style.display = "none";
    }
    
})

const dobInput = document.querySelector(".addEmployee_create--dob");
dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`;

addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    let empData = {};
    values.forEach((val) => {
        empData[val[0]] = val[1];
    })
    empData.id = employees[employees.length - 1].id + 1;
    empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0,4), 10);
    empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employees.push(empData);
    console.log(employees);
    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
})

employeeList.addEventListener("click", (e) =>{
    if(e.target.tagName === "SPAN" && e.target.id !== selectedEmployeeId){
        
        
        for(let i=0;i<employees.length;i++){
            if(parseInt(employees[i].id) === parseInt(selectedEmployeeId)){
                selectedEmployee = employees[i];
                break;
            }
        }
        renderEmployees();
        renderEmployeeDetails();
    }

    if(e.target.tagName ==="I"){
        employees = employees.filter(emp => String(emp.id) !== e.target.parentNode.id);

        if(e.target.parentNode.id === String(selectedEmployeeId)){
            selectedEmployeeId = employees[0].id || -1;
            selectedEmployee = employees[0] || {};
            renderEmployeeDetails();
        }
        renderEmployees();
    }

})

const renderEmployees = () => {
    employeeList.innerHTML = "";
    employees.forEach(emp => {
    const currEmpEl = document.createElement("span");
    currEmpEl.classList.add("employee-list-item");
    
    if(emp.id === parseInt(selectedEmployeeId)){
        currEmpEl.classList.add("selected-item");
    }

    currEmpEl.setAttribute("id",emp.id);
    currEmpEl.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;
    employeeList.append(currEmpEl);
});
}

const renderEmployeeDetails = () => {

    if(selectedEmployeeId === -1){
        employeeInfo.innerHTML = "";
        return;
    }
    employeeInfo.innerHTML="";
    let imageEl = document.createElement("img");
    imageEl.classList.add("profile-image");
    imageEl.setAttribute("src",selectedEmployee.imageUrl);
    imageEl.setAttribute("alt","profile-pic");
    employeeInfo.append(imageEl);

    let nameEl = document.createElement("h1");
    const nameElContent = selectedEmployee.firstName+" "+selectedEmployee.lastName+" "+"("+ selectedEmployee.age+")";
    nameEl.innerHTML = nameElContent;
    employeeInfo.append(nameEl);

    let addressEl = document.createElement("p");
    addressEl.innerHTML = selectedEmployee.address;
    employeeInfo.append(addressEl);

    let mobileEl = document.createElement("p");
    const mobileElContent = "Mobile - " + selectedEmployee.contactNumber;
    mobileEl.innerHTML = mobileElContent;
    employeeInfo.append(mobileEl);

    let dobEl = document.createElement("p");
    const dobElContent = "DOB - " + selectedEmployee.dob;
    dobEl.innerHTML = dobElContent;
    employeeInfo.append(dobEl);
}

renderEmployees();
renderEmployeeDetails();
console.log(employeeList);
})();