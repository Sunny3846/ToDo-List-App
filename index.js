let itemsListEl=document.getElementById("itemsList");
let inputContainerEl=document.getElementById("inputContainer");
let addButtonEl=document.getElementById("addButton");
let itemsEl=document.getElementById("items");
let SaveAllbtn=document.getElementById("SaveAll");
let arrayItems=[];
let i=0;

let storedData=getFromLocalStorage();
loadToScreen(storedData);
console.log(localStorage); 

function getFromLocalStorage(){
    let storedData=JSON.parse(localStorage.getItem("arrayItems"));
    if (storedData===""){
        return [];
    }
    return storedData;
}

function saveToLocalStorage(arrayItems){
    localStorage.getItem("arrayItems");
    localStorage.setItem("arrayItems",JSON.stringify(arrayItems));
};

function loadToScreen(storedData){
    for (let eachItem of storedData){
        let divContainer=document.createElement("div");
        divContainer.classList.add("listitemContainer","d-flex","flex-row","justify-content-between")    
        itemsEl.appendChild(divContainer);
        
        let checkboxEl=document.createElement("input");
        checkboxEl.type="checkbox";
        checkboxEl.id=eachItem.id;
        checkboxEl.checked=eachItem.isChecked;
        divContainer.appendChild(checkboxEl);
        
        let textContentContainer=document.createElement("div");
        textContentContainer.classList.add("textContentContainer");
        divContainer.appendChild(textContentContainer);
        
        let listItem=document.createElement("li");
        listItem.id=eachItem.id;
        listItem.classList.add("listitem");
        textContentContainer.appendChild(listItem);
        inputContainerEl.value="";
        
        let labelEl=document.createElement("label");
        labelEl.htmlFor=eachItem.id;
        labelEl.id=eachItem.id;
        if (checkboxEl.checked){
            labelEl.classList.add("lineThroughText");
        }
        else{
            labelEl.classList.remove("lineThroughText");
        }
        labelEl.textContent=eachItem.text;
        listItem.appendChild(labelEl);
        
        let deleteIconContainer=document.createElement("div");
        divContainer.appendChild(deleteIconContainer);
        
        let deleteIcon=document.createElement("i");
        deleteIcon.classList.add("deleteIcon");
        deleteIcon.classList.add("fa-solid","fa-trash");
        deleteIconContainer.appendChild(deleteIcon);
        deleteIconContainer.addEventListener("click",function(){
            divContainer.remove();
        });
        checkboxEl.addEventListener("change", function () {
            if (checkboxEl.checked){
                labelEl.classList.add("lineThroughText");
            }
            else{
                labelEl.classList.remove("lineThroughText");
            }
        });
    }
}


function buttonPressed(){
    if (inputContainerEl.value===""){
        alert("Enter a Task");
    }
    else{
        let userInput=inputContainerEl.value;
        i=i+1;

        let divContainer=document.createElement("div");
        divContainer.classList.add("listitemContainer","d-flex","flex-row","justify-content-between")    
        itemsEl.appendChild(divContainer);
        
        let checkboxEl=document.createElement("input");
        checkboxEl.type="checkbox";
        checkboxEl.id="checkboxEl"+i;
        divContainer.appendChild(checkboxEl);
        
        checkboxEl.addEventListener("change", function () {
            labelEl.classList.toggle("lineThroughText", checkboxEl.checked);
            for (let item of arrayItems) {
                if (item.id === labelEl.id) {
                    item.isChecked = checkboxEl.checked;
                }
            }
        });

        let textContentContainer=document.createElement("div");
        textContentContainer.classList.add("textContentContainer");
        divContainer.appendChild(textContentContainer);
        
        let listItem=document.createElement("li");
        listItem.id="listitem"+i;
        listItem.classList.add("listitem");
        textContentContainer.appendChild(listItem);
        inputContainerEl.value="";
        
        let labelEl=document.createElement("label");
        labelEl.htmlFor=checkboxEl.id;
        labelEl.id="labelEl"+i;
        labelEl.textContent=userInput;
        listItem.appendChild(labelEl);

        let deleteIconContainer=document.createElement("div");
        divContainer.appendChild(deleteIconContainer);
        
        let deleteIcon=document.createElement("i");
        deleteIcon.classList.add("deleteIcon");
        deleteIcon.classList.add("fa-solid","fa-trash");
        deleteIconContainer.appendChild(deleteIcon);
        deleteIconContainer.addEventListener("click",function(){
            divContainer.remove();
        });
            
    createNdAppend(labelEl,checkboxEl);
    }
}

function createNdAppend(labelEl,checkboxEl){
    let taskObj={
        id:labelEl.id,
        text:labelEl.textContent,
        checkboxElId:checkboxEl.id,
        isChecked:checkboxEl.checked
    }
    arrayItems.push(taskObj);
}
SaveAllbtn.addEventListener("click",function(){
    saveToLocalStorage(arrayItems);
});

addButtonEl.addEventListener("click",function(){
    buttonPressed();
});
