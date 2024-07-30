import { getBoards } from "../modules/requests.js"
import { ROOT } from "../constans.js"


export function createSideBarApp(arrBoard){
    const sideBar = document.createElement('div')
    sideBar.classList.add('app-sideBar')
    sideBar.append(createBtnAdd())
    arrBoard.forEach(item => {
        sideBar.append(createBtnBoard(item.id, item.name))
    })
    return sideBar
}

export function createBtnAdd(){
    const btnAdd = document.createElement('button')
    btnAdd.classList.add('btnAdd')
    const btnAddText = document.createElement('span')
    btnAddText.classList.add('btnAdd-text')
    btnAddText.innerText = 'Добавить доску'
    const btnAddIcon = document.createElement('span')
    btnAddIcon.classList.add('btnAdd-icon')
    const icon = document.createElement('i')
    icon.classList.add('fa-solid', 'fa-plus')
    btnAddIcon.append(icon)
    btnAdd.append(btnAddText)
    btnAdd.append(btnAddIcon)
    return btnAdd
}

export function createBtnBoard(id, name){
    const btnBoard = document.createElement('button')
    btnBoard.classList.add('btnBoard')
    const btnBoardText = document.createElement('span')
    btnBoardText.classList.add('btnAdd-text')
    btnBoardText.innerText = `${name}`
    btnBoard.dataset.id = id
    btnBoard.append(btnBoardText)
    return btnBoard
}

export function createMainApp(){
    const appMain = document.createElement('div')
    appMain.classList.add('app-main')
    const appMainContent = document.createElement('div')
    appMainContent.classList.add('app-main-content')
    const header = document.createElement('h2')
    header.classList.add('board-header')
    appMain.append(header)
    appMain.append(appMainContent)
    return appMain
}

export async function createApp(logInClass, logIn, SingUp){
    ROOT.innerHTML = ""
    createNavigation(logInClass, logIn, SingUp)
    const arrBoard = await getBoards('http://localhost:3000/boards')
    const appWrapper = document.createElement('div')
    appWrapper.classList.add('app-wrapper')
    const sideBar = createSideBarApp(arrBoard[0])
    appWrapper.append(sideBar)
    appWrapper.append(createMainApp())
    ROOT.append(appWrapper)
    return ROOT
}

export function createNavigation(logInClass = 'app-header-sing', logIn = 'Sing In', SingUp = 'Sing Up'){
    const header = document.createElement('header')
    header.classList.add('app-header')
    const headerApp = document.createElement('div')
    headerApp.classList.add('app-header-text')
    const text = document.createElement('p')
    text.innerText = 'TRELLO'
    const headerAction = document.createElement('div')
    headerAction.classList.add('app-header-action')
    const headerLogIn = document.createElement('div')
    headerLogIn.classList.add('app-header-log')
    const logInText = document.createElement('p')
    logInText.classList.add('app-header-logIn')
    logInText.innerText = `${logIn}`
    const headerLogUp = document.createElement('div')
    headerLogUp.classList.add(`${logInClass}`)
    const logUpText = document.createElement('p')
    logUpText.classList.add('app-header-singUp')
    logUpText.innerText = `${SingUp}`
    headerLogIn.append(logInText)
    headerLogUp.append(logUpText)
    headerApp.append(text)
    headerAction.append(headerLogIn)
    headerAction.append(headerLogUp)
    header.append(headerApp)
    header.append(headerAction)
    ROOT.append(header)
    return ROOT

}