import { getBoards } from "../modules/requests.js"
import { ROOT } from "../constans.js"


export function createSideBarApp(arrBoard){
    const sideBar = document.createElement('div')
    sideBar.classList.add('app-sideBar')
    sideBar.append(createBtnAdd())
    arrBoard.forEach(item => {
        console.log(item.id, item.name)
        sideBar.append(createBtnBoard(item.id, item.name))
    })
    console.log(sideBar)
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

export async function createApp(){
    ROOT.innerHTML = ""
    createNavigation()
    const arrBoard = await getBoards('http://localhost:3000/boards')
    const appWrapper = document.createElement('div')
    appWrapper.classList.add('app-wrapper')
    const sideBar = createSideBarApp(arrBoard[0])
    console.log(sideBar)
    appWrapper.append(sideBar)
    appWrapper.append(createMainApp())
    ROOT.append(appWrapper)
    return ROOT
}

export function createNavigation(){
    const header = document.createElement('header')
    header.classList.add('app-header')
    const headerApp = document.createElement('div')
    headerApp.classList.add('app-header-text')
    const text = document.createElement('p')
    text.innerText = 'TRELLO'
    const headerLogIn = document.createElement('div')
    headerLogIn.classList.add('app-header-log')
    headerApp.append(text)
    header.append(headerApp)
    header.append(headerLogIn)
    ROOT.append(header)
    return ROOT

}