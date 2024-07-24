import { getUsers, postBoard, postUsers } from "../modules/requests.js";
import { isModalOpen } from "./modalWindow.js";
import { createModalAddBoard, closeModal, SingInUser, SingUpUser } from "./modalWindow.js";
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
                        createApp()
                        closeModal('.add-window')
                    });
                } else {
                    console.error("Form with class .add-formm not found");
                }
            }
        } 
        if( target.closest('.btnBoard')){
            console.dir('tap')
            let id = 0
            const title = target.innerText
            if(target.classList.contains('btnAdd-text')){
                id = +target.parentElement.dataset.id
            } else {
                id = +target.dataset.id
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
                    await postUsers(form)
                    setLocalStorageDate(await getUsers('http://localhost:3000/users'), 'user')
                    closeModal('.singUp-window')
                });
            } else {
                console.error("Form with class .add-formm not found");
            }
        }
        
       
    }) 
}