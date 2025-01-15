function showModal(message) {
    const modal = document.getElementById("customModal");
    const modalMessage = document.getElementById("modalMessage");

    modalMessage.textContent = message;
    modal.style.display = "block";

    document.getElementById("modalOkButton").onclick = closeModal;

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
}

function closeModal() {
    document.getElementById("customModal").style.display = "none";
}

function customAlert() {
    showModal("You must write something!")
}

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function AddTask() {
    if(inputBox.value === "") {
        customAlert();
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

listContainer.addEventListener("dblclick", function(e) {
    if (e.target.tagName === "LI") {
        editTask(e.target);
    }
}, false);

function editTask(taskElement) {
    const originalText = taskElement.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = originalText;

    taskElement.innerHTML = "";
    taskElement.appendChild(input);
    input.focus();

    input.addEventListener("blur", function() {
        const newText = input.value.trim();
        if (newText !== "") {
            taskElement.innerHTML = newText;
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            taskElement.appendChild(span);
            saveData();
        } else {
            taskElement.innerHTML = originalText;
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            taskElement.appendChild(span);
        }
    });

    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            input.blur();
        }
    });
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();