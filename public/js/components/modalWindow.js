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

export { isModalOpen }