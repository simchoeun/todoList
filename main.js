//1. 할 일 list 추가하기
let userInput = document.querySelector('.input-area input');
let plusBtn = document.querySelector('.input-area button');
let taskList = [];

plusBtn.addEventListener('click', addTask);
function addTask() {
    //객체로 넣는 이유는 complete로 값을 구분하기 위해
    let task = {
        id: randomIDGenerate(),
        taskContent: userInput.value,
        isComplete: false,
    }
    taskList.push(task);
    console.log(taskList);
    render();
}
function render() {
    //4. 탭 별 기능 활성화
    let list = [];

    if (mode == "all") {
        list = taskList;
    } else if (mode == "ongoing" || mode == "done") {
        list = filterList;
    }

    //1. 할 일 list 추가하기
    let todoList = '';

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            todoList += `<div class="task">
                        <div class="txt txt-done">${list[i].taskContent}</div>
                        <div>
                            <button class="btn-chk" onclick="toggleComplete('${list[i].id}');">
                                <i class="fas fa-solid fa-reply" style="color: #94a0b8;"></i>
                            </button>
                            <button class="btn-delete" onclick="deleteTask('${list[i].id}')">
                                <i class="fas fa-solid fa-trash" style="color: #f82a2a;"></i>
                            </button>
                        </div>
                    </div>`;
        } else {
            todoList += `<div class="task">
                        <div class="txt">${list[i].taskContent}</div>
                        <div>
                            <button class="btn-chk" onclick="toggleComplete('${list[i].id}');">
                                <i class="fas fa-check" style="color: #3cc845;"></i>
                            </button>
                            <button class="btn-delete" onclick="deleteTask('${list[i].id}')">
                                <i class="fas fa-solid fa-trash" style="color: #f82a2a;"></i>
                            </button>
                        </div>
                    </div>`;
        }
    }
    document.querySelector('.task-list').innerHTML = todoList;
}
//랜덤 id값 만들기 함수
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}


//2. check 버튼 클릭하면 끝남으로 변경
function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

//3. delete 버튼 클릭하면 삭제
function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}


//4. 탭 별 기능 활성화
let tabs = document.querySelectorAll('.task-tabs > div');
let mode = 'all';
let filterList = [];

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (event) {
        filter(event);
    });
}

function filter(event) {
    mode = event.target.id;

    if (mode == 'all') {
        render();
    } else if (mode == 'ongoing') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        taskList = filterList;
        render();
    } else if (mode == 'done') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
        taskList = filterList;
        render();
    }
    console.log(filterList);
}