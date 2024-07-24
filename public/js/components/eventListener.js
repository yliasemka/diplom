import { getUsers, postBoard, postUsers, getUserByEmail} from "../modules/requests.js";
import { isModalOpen } from "./modalWindow.js";
import { createModalAddBoard, closeModal, SingInUser, SingUpUser, noneUser, checkEmail} from "./modalWindow.js";
import { createApp } from "./app.js";
import { createBoard } from "./board.js";
import { setLocalStorageDate } from "../modules/localStorage.js";


export function initializeEventHandlers(){
    document.addEventListener('click', event =>{
        const target = event.target
        console.log(target)
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
    }) 
}