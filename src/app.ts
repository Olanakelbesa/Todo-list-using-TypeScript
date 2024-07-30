const inputBox = document.getElementById(
	"input-box"
) as HTMLInputElement | null;
const taskContainer = document.getElementById(
	"task-container"
) as HTMLElement | null;
let editIndex: number | null = null;

function addTask() {
	if (inputBox && taskContainer) {
		if (inputBox.value === "") {
			alert("You must write something!");
		} else {
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
			} else {
				const li = taskContainer.children[editIndex];
				li.childNodes[0].nodeValue = inputBox.value;
				editIndex = null;
			}
			inputBox.value = "";
			saveData();
		}
	}
}

taskContainer?.addEventListener(
	"click",
	function (e) {
		const target = e.target as HTMLElement;

		if (target.tagName === "LI") {
			target.classList.toggle("checked");
		} else if (target.tagName === "SPAN") {
			target.parentElement?.remove();
		} else if (target.tagName === "BUTTON") {
			if (inputBox && taskContainer) {
				const li = target.parentElement as HTMLElement;
				inputBox.value = li.childNodes[0].nodeValue || "";
				editIndex = Array.prototype.indexOf.call(taskContainer.children, li);
			}
		}
		saveData();
	},
	false
);

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
