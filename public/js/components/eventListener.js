import { getUsers, postBoard, postUsers, getUserByEmail, postColumn, postTask} from "../modules/requests.js";
import { actionColumn, isModalOpen } from "./modalWindow.js";
import { createModalAddBoard, closeModal, SingInUser, SingUpUser, noneUser, checkEmail, addColumn, addTask} from "./modalWindow.js";
import { createApp } from "./app.js";
import { createBoard } from "./board.js";
import { getLocalStorageDate, setLocalStorageDate } from "../modules/localStorage.js";
import { createBtnAddColumnTask } from "./btn.js";


export function initializeEventHandlers(){
    document.addEventListener('click', event =>{
        const target = event.target
        console.dir(target)
        if (target.closest('.btnAdd')) {
            console.log("Clicked on .app-sideBar-header__add");
            if(isModalOpen === false) {
                createModalAddBoard();
                const form = document.querySelector('.add-form');
                if (form) {
                    console.log("form exixst")
                    form.addEventListener('submit', async (event) => {
                        event.preventDefault();
                        console.log("Form submitted")
                        await postBoard(form)
                        await createApp()
                        closeModal('.add-window')
                    });
                } else {
                    console.error("Form with class .add-formm not found");
                }
            }
        } 
        if( target.closest('.btnBoard')){
            let id = 0
            const title = target.innerText
            if(target.classList.contains('btnAdd-text')){
                id = +target.parentElement.dataset.id
            } else {
                id = +target.dataset.id
            }
            if(document.querySelector('.board')){
                const board = document.querySelector('.board')
                board.remove()
            }
            createBoard(id, title)
        }
        if( target.closest('.singdUp-link')){
            closeModal('.singIn-window')
            SingUpUser()
            const form = document.querySelector('.singUp-form');
            if (form) {
                console.log("form exixst")
                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    console.log("Form submitted")
                    const checkEmaill = await postUsers(form)
                    if(checkEmaill === null){
                        checkEmail()
                        form.reset()
                        setTimeout(() => {
                            closeModal('.checkEmail-window')
                        }, 3000)
                    } else{
                        closeModal('.singUp-window')
                        createApp()
                    }
                });
            } else {
                console.error("Form with class .add-formm not found");
            }
        }
        if(target.closest('.singIn-enter')){
            const form = document.querySelector('.singIn-form');
            if (form) {
                console.log("form exixst")
                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    console.log("Form submitted")
                    const userCheck = await getUserByEmail(form)
                    if(userCheck === null){
                        noneUser()
                        form.reset()
                        setTimeout(() => {
                            closeModal('.noneUser-window')
                        }, 3000)
                    } else{
                        closeModal('.singIn-window')
                        createApp()
                    }
                });
            } else {
                console.error("Form with class .add-formm not found");
            }
        }
        if(target.closest('.fa-xmark')){
            if (target.classList.contains('singUpp')){
                closeModal('.singUp-window')
            } else if(target.classList.contains('singInn')){
                closeModal('.singIn-window')
            } else if (target.classList.contains('actionColumn-icon')){
                closeModal('.actionColumn-window')
            } if (target.classList.contains('addColumn-icon')){
                closeModal('.addColumn-window')
                const board = document.querySelector('.board-content')
                const btn = createBtnAddColumnTask('Добавить колонку')
                btn.classList.add('column-btn')
                board.append(btn)

            } if (target.classList.contains('addTask-icon')){
                closeModal('.addTask-window')
            }
        }
        if(target.closest('.fa-arrow-left')){
            closeModal('.singUp-window')
            SingInUser()
        }
        if(target.closest('.column-btn')){
            closeModal('.column-btn')
            addColumn()
            const form = document.querySelector('.addColumn-form');
            if (form) {
                console.log("form exixst")
                const id = document.querySelector('.board').dataset.id
                const title = document.querySelector('.board-header').innerText
                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    console.log("Form submitted")
                    await postColumn(form, id)
                    closeModal('.addColumn-window')
                    if(document.querySelector('.board')){
                        const board = document.querySelector('.board')
                        board.remove()
                        await createBoard(id, title)
                    }
                })
            } else {
                console.error("Form with class .add-formm not found");
            }
        }
        if(target.closest('.column-action')){
            const id = target.parentElement.offsetParent.dataset.id
            actionColumn(id)
        }

        if(target.closest('.button-color')){
            const idColumn = document.querySelector('.actionColumn-window').dataset.id
            const idBoard = document.querySelector('.board').dataset.id
            const color = target.id
            const arrColumn = document.querySelectorAll('.column')
            let colorArr = getLocalStorageDate('color')
            let arrColor = []
            console.log(colorArr)
            if (+colorArr === 0){
                arrColor = []
            } else {
                arrColor = JSON.parse(colorArr)
            }
            console.log(colorArr)
            let colorInf = {}
            arrColumn.forEach(item => {
                console.log(item)
                if(+item.dataset.id === +idColumn){
                    console.dir(item)
                    item.style.backgroundColor = color
                    colorInf = {
                        "boardId": idBoard,
                        "columnId": idColumn,
                        "color": color
                    }
                    //colorArr = colorArr.filter(colorItem => !(+colorItem.columnId === +idColumn && +colorItem.boardId === +idBoard))
                    arrColor.push(colorInf)
                    console.log(arrColor)
                    setLocalStorageDate( JSON.stringify(arrColor), `color`);
                }
            })
            
        }
        if(target.closest('.task-btn')){
            closeModal('.task-btn')
            let idColumn = 0
            if (target.classList.contains('btnAddColumnTask-text')){
                idColumn = target.parentElement.dataset.id
            } else {
                idColumn = target.dataset.id
            }
            addTask(idColumn)
            const form = document.querySelector('.addTask-form');
            if (form) {
                console.log("form exixst")
                const id = document.querySelector('.board').dataset.id
                const title = document.querySelector('.board-header').innerText
                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    console.log("Form submitted")
                    await postTask(form, id, idColumn)
                    closeModal('.addTask-window')
                    if(document.querySelector('.board')){
                        const board = document.querySelector('.board')
                        board.remove()
                        await createBoard(id, title)
                    }
                })
            } else {
                console.error("Form with class .add-formm not found");
            } 
        }
    }) 
}