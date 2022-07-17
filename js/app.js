console.log("Welcome to the Notes app!App.js");
showNotes();

// If user adds a note, add it to a local storage
let addBtn = document.getElementById('add_btn');
addBtn.addEventListener('click',function (e) {
    let notesObj;
    let addTxt = document.getElementById('add_txt');
    let notes = localStorage.getItem('note');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("note",JSON.stringify(notesObj));
    addTxt.value="";
    // console.log(notesObj);
    showNotes();
});


// To display tasks
function showNotes() {
    let notes=localStorage.getItem('note');
    let notesObj;
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj=JSON.parse(notes);
    }

    let html="";
    notesObj.forEach(function(element,index) {
        html+=`<div class="noteCard my-2 mx-2 card" style="width: 20rem;">
        <div class="card-body">
            <h5 class="card-title">Task ${index+1}</h5>
            <p class="card-text">${element}</p>
            <button href="#" id=${index} onclick="deleteTask(this.id)" class="btn btn-primary">Complete Task</button>
        </div>
    </div>`;
    });

    let notesElem = document.getElementById('notes_store');

    if(notesObj.length!=0){
        notesElem.innerHTML=html;
    }
    else{
        notesElem.innerHTML=`No incomplete task! Good going!!`
    }
}

// completing task

function deleteTask(index) {
    let notes=localStorage.getItem('note');
    let notesObj;
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj=JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem('note',JSON.stringify(notesObj));
    showNotes();

    // console.log("Deleting node");
}


// to search an item
let search=document.getElementById('search_txt');
search.addEventListener('input',function (e) {
    let inputVal = search.value;
    // console.log("Input event fired "+inputVal);

    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }
    });
});