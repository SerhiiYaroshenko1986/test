let id = 1

function addTask() {
    let newTask = document.getElementById('taskValue').value
    let titleContainer = document.querySelector('.allTasks')
    titleContainer.insertAdjacentHTML('afterbegin',
        `<div data-status=false  class='task' > <div class="todoText">${newTask}</div> <div class="closeBtn">
        <input id=${id++} onchange=changeStatus(this) type="checkbox">
        <span id=${newTask}  onclick=remove(this)>X</span></div></div>`);
    document.getElementById('taskValue').value = ""

}

function remove(e) {
    let parent = document.getElementById(e.id).parentElement.parentElement;
    parent.remove()
}

function changeStatus(e) {
    let input = document.querySelectorAll('input')
    console.log(input);
    let parent = document.getElementById(e.id).parentElement.parentElement
    let closest = document.getElementById(e.id).parentElement.previousElementSibling
    if (e.checked) {
        closest.classList.add("status");
        parent.setAttribute("data-status", true);
    } else {
        closest.classList.remove("status");
        parent.setAttribute("data-status", false);
    }
    let allTasks = document.querySelectorAll('.task')
    let titleContainer = document.querySelector('.allTasks')
    console.log(allTasks);
    titleContainer.innerHTML = ''
    let arr = []
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];
        let checkStatus = element.getAttribute('data-status')
        console.log(checkStatus);
        if (checkStatus) {
            arr.push(element)
        } else {
            arr.unshift(element)
        }
    }
    console.log(arr);
    arr.forEach(item => {
        titleContainer.insertAdjacentHTML('beforeend', item.outerHTML)
    })

}