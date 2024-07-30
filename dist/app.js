"use strict";
const inputBox = document.getElementById("input-box");
const taskContainer = document.getElementById("task-container");
let editIndex = null;
function addTask() {
    if (inputBox && taskContainer) {
        if (inputBox.value === "") {
            alert("You must write something!");
        }
        else {
            if (editIndex === null) {
                let li = document.createElement("li");
                li.textContent = inputBox.value;
                taskContainer.appendChild(li);
                let editBtn = document.createElement("button");
                editBtn.innerHTML = "Edit";
                li.appendChild(editBtn);
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);
            }
            else {
                const li = taskContainer.children[editIndex];
                li.childNodes[0].nodeValue = inputBox.value;
                editIndex = null;
            }
            inputBox.value = "";
            saveData();
        }
    }
}
taskContainer === null || taskContainer === void 0 ? void 0 : taskContainer.addEventListener("click", function (e) {
    var _a;
    const target = e.target;
    if (target.tagName === "LI") {
        target.classList.toggle("checked");
    }
    else if (target.tagName === "SPAN") {
        (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    }
    else if (target.tagName === "BUTTON") {
        if (inputBox && taskContainer) {
            const li = target.parentElement;
            inputBox.value = li.childNodes[0].nodeValue || "";
            editIndex = Array.prototype.indexOf.call(taskContainer.children, li);
        }
    }
    saveData();
}, false);
function saveData() {
    if (taskContainer) {
        localStorage.setItem("data", taskContainer.innerHTML);
    }
}
function showTask() {
    const data = localStorage.getItem("data");
    if (taskContainer && data) {
        taskContainer.innerHTML = data;
    }
}
showTask();
//# sourceMappingURL=app.js.map