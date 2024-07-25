let isModalOpen = false


export function closeModal(modalClass){
    const modal = document.querySelector(modalClass);
    console.log(modal)
    isModalOpen = false
    modal.remove(); 
}

export function createModalAddBoard(){
    const addModal = document.createElement('div')
    addModal.classList.add('add-window')
    addModal.innerHTML = `
        <div class="add-dialog">
            <div class="add-content">
                <form class="add-form">
                    <div class="input-fields">
                        <input type="text" class="add-board" placeholder="Заголовок доски" name="name">
                    </div>
                    <div class="window-button">
                        <button aria-label="Отмена" type="button" aria-disabled="false" class="button-otm">
                            <span class="text-otm">Отмена</span>
                        </button>
                        <input value="Добавить" type="submit" class="button-add">
                    </div>
                </form>
            </div>
        </div>`
    document.body.append(addModal);
    let inputTask = document.querySelector('.add-board')
    inputTask.focus()
    isModalOpen = true
    return addModal
}

export function SingInUser(){
    const addModal = document.createElement('div')
    addModal.classList.add('singIn-window')
    addModal.innerHTML = `
        <div class="singIn-dialog">
            <div class="singIn-content">
                <div class="singIn-header">
                    <span class="singIn-header-icon">
                        <i class="fa-solid fa-xmark  singInn" ></i>
                    </span>
                </div>
                <div class="singIn-title">
                    <h2 class="singIn-title-header">Добро пожаловать в TRELLO!</h2>
                    <p class="singIn-title-subHeader">Чтобы начать работу нужно войти или зарегистрироваться</p>
                </div>
                <form class="singIn-form">
                    <div class="input-fields">
                        <input type="email" class="singIn-email" placeholder="Введите ваш emael" name="email">
                    </div>
                    <div class="input-fields">
                        <input type="password" class="singIn-password" placeholder="Введите ваш пароль" name="password">
                    </div>
                    <div class="singIn-window-button">
                        <input value="Войти" type="submit" class="singIn-enter">
                    </div>
                </form>
                <div class="singIn-title">
                    <p class="singIn-title-button">Ещё нет аккаунта? <span><a class="singdUp-link" href="#">Зарегистрируйтесь</a></span>, чтобы начать использовать TRELLO по максимуму!</p>
                </div>
            </div>
        </div>`
    document.body.append(addModal);
    let inputTask = document.querySelector('.singIn-email')
    inputTask.focus()
    isModalOpen = true
    return addModal
}

export function SingUpUser(){
    const addModal = document.createElement('div')
    addModal.classList.add('singUp-window')
    addModal.innerHTML = `
        <div class="singUp-dialog">
            <div class="singUp-content">
                <div class="singUp-header">
                    <span class="singUp-header-icon">
                        <i class="fa-solid fa-arrow-left singUpp"></i>
                    </span>
                    <span class="singUp-header-icon">
                        <i class="fa-solid fa-xmark singUpp"></i>
                    </span>
                </div>
                <div class="singUp-title">
                    <h2 class="singUp-title-header">Добро пожаловать в TRELLO!</h2>
                </div>
                <form class="singUp-form">
                    <div class="input-fields">
                        <input type="text" class="singUp-email" placeholder="Введите ваш имя" name="name">
                    </div>
                    <div class="input-fields">
                        <input type="email" class="singUp-email" placeholder="Введите ваш emael" name="email">
                    </div>
                    <div class="input-fields">
                        <input type="password" class="singUp-password" placeholder="Введите ваш пароль" name="password">
                    </div>
                    <div class="singUp-window-button">
                        <input value="Зарегистрироваться" type="submit" class="singUp-enter">
                    </div>
                </form>
            </div>
        </div>`
    document.body.append(addModal);
    let inputTask = document.querySelector('.singUp-email')
    inputTask.focus()
    isModalOpen = true
    return addModal
}

export function noneUser(){
    const addModal = document.createElement('div')
    addModal.classList.add('noneUser-window')
    addModal.innerHTML = `
        <div class="noneUser-dialog">
            <div class="noneUser-content">
                <div class="noneUser-title">
                    <h2 class="noneUser-title-header">Пользователя с таким email не сущетсвует</h2>
                    <p class="noneUser-title-subHeader">Попробуйте ещё раз!</p>
                </div>
            </div>
        </div>`
    document.body.append(addModal);
    isModalOpen = true
    return addModal
}

export function checkEmail(){
    const addModal = document.createElement('div')
    addModal.classList.add('checkEmail-window')
    addModal.innerHTML = `
        <div class="checkEmail-dialog">
            <div class="checkEmail-content">
                <div class="checkEmail-title">
                    <h2 class="checkEmail-title-header">Упс! Этот Email уже занят</h2>
                    <p class="checkEmail-title-subHeader">Попробуйте ещё раз!</p>
                </div>
            </div>
        </div>`
    document.body.append(addModal);
    isModalOpen = true
    return addModal
}

export function addColumn(){
    const btnColumn = document.querySelector('.board')
    const addModal = document.createElement('div')
    addModal.classList.add('addColumn-window')
    addModal.innerHTML = `
        <div class="addColumn-dialog">
            <div class="addColumn-content">
                <form class="addColumn-form">
                    <div class="addColumn-input">
                        <input type="text" class="addColumn-name" placeholder="Введите заголовок" name="name">
                    </div>
                    <div class="addColumn-footer">
                        <div class="addColumn-window-button">
                        <input value="Добавить колонку" type="submit" class="addColumn-enter">
                        </div>
                        <span class="addColumn-header-icon">
                            <i class="fa-solid fa-xmark addColumn-icon"></i>
                        </span>
                    </div>
                </form>
            </div>
        </div>`
    btnColumn.append(addModal);
    isModalOpen = true
    return addModal
}

export function addTask(id){
    const column = document.querySelectorAll('.column')
    column.forEach(item => {
        if(+item.dataset.id === +id){
            const addModal = document.createElement('div')
            addModal.classList.add('addTask-window')
            addModal.innerHTML = `
                <div class="addTask-dialog">
                    <div class="addTask-content">
                        <form class="addTask-form">
                            <div class="addTask-input">
                                <input type="text" class="addTask-name" placeholder="Введите заголовок" name="title">
                            </div>
                            <div class="addTask-footer">
                                <div class="addTask-window-button">
                                <input value="Добавить задачу" type="submit" class="addTask-enter">
                                </div>
                                <span class="addTask-header-icon">
                                    <i class="fa-solid fa-xmark addTask-icon"></i>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>`
            item.append(addModal);
            isModalOpen = true
            return addModal
        }
    })
}

export function actionColumn(id){
    const column = document.querySelectorAll('.column')
    column.forEach(item => {
        if(+item.dataset.id === +id){
            const addModal = document.createElement('div')
            addModal.classList.add('actionColumn-window')
            addModal.dataset.id = id
            addModal.innerHTML = `
                <div class="actionColumn-dialog">
                    <div class="actionColumn-content">
                        <div class="actionColumn-header">
                            <p class="actionColumn-header-text">Действия с колонкой</p>
                             <span class="actionColumn-header-icon">
                                <i class="fa-solid fa-xmark actionColumn-icon"></i>
                            </span>
                        </div>
                        <div class="actionColumn-changeColorr">
                            <p class="actionColumn-changeColorr-text">Изменить цвет колонки</p>
                            <button type="button" aria-disabled="false" class="button-color" id="crimson"></button>
                            <button type="button" aria-disabled="false" class="button-color" id="deepskyblue"></button>
                            <button type="button" aria-disabled="false" class="button-color" id="pink"></button>
                            <button type="button" aria-disabled="false" class="button-color" id="gold"></button>
                            <button type="button" aria-disabled="false" class="button-color" id="orange"></button>
                            <button type="button" aria-disabled="false" class="button-color" id="springgreen"></button>
                            <button type="button" aria-disabled="false" class="button-color" id="none"></button>
                        </div>
                        <div class="actionColumn-footer">
                            <button aria-label="Удалить колонку" type="submit" aria-disabled="false" class="actionColumn-delete">
                                <span class="actionColumn-delete-text">Удалить колонку</span>
                            </button>
                        </div>
                    </div>
                </div>`
            item.after(addModal);
            isModalOpen = true
            return addModal
        }
    })
}

export { isModalOpen }