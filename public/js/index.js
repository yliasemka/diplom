import { initializeEventHandlers } from "./components/eventListener.js";
import { createApp} from "./components/app.js";
import { getLocalStorageDate, setLocalStorageDate } from "./modules/localStorage.js";
import { SingInUser } from "./components/modalWindow.js";



document.addEventListener('DOMContentLoaded', () => {
    const user = getLocalStorageDate()
    if(+user === 0){
        SingInUser()
        createApp()
    } else {
        createApp('app-header-logOut', `Hi, ${user[0].name}`, 'Log Out')
    }
    initializeEventHandlers()
   
})