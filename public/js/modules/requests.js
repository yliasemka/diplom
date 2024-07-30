import { getLocalStorageDate, setLocalStorageDate } from "./localStorage.js"


export async function getBoards(url){
    const test = getLocalStorageDate()
    const answ = await fetch(`${url}`)

    if (!answ.ok){
        new Error('Failed to fetch boards')
    } 
    const boards = await answ.json()
    const result = [] 
    if (+test !== 0){
        boards.forEach(item =>{
            if(+item.userId === +test[0].id){
                result.push(item)
            }
        })
    }
    return [result, boards]
}

export async function getUsers(url){
    const answ = await fetch(`${url}`)
    if (!answ.ok){
        new Error('Failed to fetch boards')
    } 
    const boards = await answ.json()
    return boards
}


export async function postBoard(form) {
    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });

    object.id = `${await getBoards('http://localhost:3000/boards').then(boards => boards[1].length + 1)}`

    object.userId = getLocalStorageDate()[0].id
    object.columns = [];

    try {
        const result = await fetch('http://localhost:3000/boards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
        });
        if (!result.ok) {
            throw new Error(`Failed to post board`);
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}

export async function postUsers(form) {
    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });

    const checkEmail = await getUserByEmail(form)
    if (checkEmail && checkEmail.ok && checkEmail !== null){
        setLocalStorageDate([], 'user')
        return null
    } 
    object.id = `${await getUsers('http://localhost:3000/users').then(boards => boards.length + 1)}`;


    try {
        const result = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
        })
        if (!result.ok) {
            throw new Error(`Failed to post board`)
        }
        const tempArr = []
        tempArr.push(object)
        setLocalStorageDate(tempArr)
        return result
    } catch (error) {
        console.error(error)
    }
}

export async function getUserByEmail(form){
    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    const emailUser = object.email
    try{
        const result = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(emailUser)}`)
        if (!result.ok){
            throw new Error(`Failed to find user`)
        }
        const user = await result.json()
        if (user.length === 0){
            return null
        }else{
            setLocalStorageDate(user)
        }
        return result
    } catch(error){
        console.error(error)
    }

}


export async function getColumn(url, id){
    const answ = await fetch(`${url}`)

    if (!answ.ok){
       throw new Error('Failed to fetch boards')
    } 
    const boards = await answ.json()
    const result = boards.find(item => +item.id === +id)
    return result.columns
}

export async function postColumn(form, id){
    const response = await fetch(`http://localhost:3000/boards?id=${encodeURIComponent(id)}`)
    const boardResult = await response.json()
    const board = boardResult[0]
    
    if (!board) {
        throw new Error('Board not found')
    }
    const formData = new FormData(form)
    const newColumn = {}
    formData.forEach((value, key) => {
        newColumn[key] = value
    });
    newColumn.tasks = []
    let idArr = []
    if (board.columns.length === 0){
        idArr = [0]
    } else {
        board.columns.forEach(item => {
            idArr.push(+item.id)
        })
    }
    newColumn.id = Math.max(...idArr) + 1
    board.columns.push(newColumn)


    const url = `http://localhost:3000/boards/${id}`
    const updateResponse = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(board)
    })

    if (!updateResponse.ok) {
        throw new Error('Failed to update board')
    }

    return updateResponse.json()
}

export async function postTask(form, id, columnId){
    const response = await fetch(`http://localhost:3000/boards?id=${encodeURIComponent(id)}`)
    const boardResult = await response.json()
    const board = boardResult[0]
    
    if (!board) {
        throw new Error('Board not found')
    }
    const formData = new FormData(form)
    const newTask = {}
    formData.forEach((value, key) => {
        newTask[key] = value
    });
    const testboard = board.columns.find(item => +item.id === +columnId)
    let idArr = []
    if (testboard.tasks.length === 0){
        idArr = [0]
    } else {
        testboard.tasks.forEach(item => {
            idArr.push(+item.id)
        })
    }
    newTask.id = Math.max(...idArr) + 1
    testboard.tasks.push(newTask)


    const url = `http://localhost:3000/boards/${id}`
    const updateResponse = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(board)
    })

    if (!updateResponse.ok) {
        throw new Error('Failed to update board')
    }

    return updateResponse.json()
}

export async function deleteColumn(columnId, boardId){
    const answ = await getBoards('http://localhost:3000/boards')
    const board = answ[0]
    let idArr = []
    const enterBoard = board.find(item => +item.id === +boardId)
    enterBoard.columns.forEach(item => {
        idArr.push(+item.id)
    })
    const checkId = idArr.indexOf(+columnId)
    enterBoard.columns.splice(checkId, 1)
    const url = `http://localhost:3000/boards/${encodeURIComponent(boardId)}`;
    const answUpdate = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(enterBoard)
    });

    return answUpdate.json()
}

export async function changeTask(boardId, taskId, columnId, form){
    const response = await fetch(`http://localhost:3000/boards?id=${encodeURIComponent(boardId)}`)
    const boardResult = await response.json()
    const board = boardResult[0]
    const formData = new FormData(form)
    const title = formData.get('title')
    const selectValue = formData.get('select')
    if(selectValue !== null){
        const newColumn = board.columns.find(item => `${item.name}` === `${selectValue}`)
        const newColumnId = newColumn.id
        const lastColumn = board.columns.find(item => +item.id === +columnId)
        const idTaskArr = [] 
        lastColumn.tasks.forEach(item => {
            idTaskArr.push(+item.id)
        })
        const checkId = idTaskArr.indexOf(+taskId)
        lastColumn.tasks.splice(checkId, 1)
        const idNewTaskArr = [] 
        newColumn.tasks.forEach(item => {
            idNewTaskArr.push(+item.id)
        })
        const newkId = Math.max(...idTaskArr) + 1 
        const newTask = {
            "title": title,
            "id": newkId
        }
        newColumn.tasks.push(newTask)
        const url = `http://localhost:3000/boards/${boardId}`
        const updateResponse = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(board)
        })
    
        if (!updateResponse.ok) {
            throw new Error('Failed to update board')
        }
    
        return updateResponse.json()
    } else {
        const lastColumn = board.columns.find(item => +item.id === +columnId)
        const lastTask = lastColumn.tasks.find(item => +item.id === +taskId)
        lastTask.title = title
        const url = `http://localhost:3000/boards/${boardId}`
        const updateResponse = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(board)
        })
    
        if (!updateResponse.ok) {
            throw new Error('Failed to update board')
        }
    
        return updateResponse.json()
    }
   
}

export async function deleteTask(boardId, taskId, columnId){
    const response = await fetch(`http://localhost:3000/boards?id=${encodeURIComponent(boardId)}`)
    const boardResult = await response.json()
    const board = boardResult[0]
    const lastColumn = board.columns.find(item => +item.id === +columnId)
    let idArr = []
    lastColumn.tasks.forEach(item => {
        idArr.push(+item.id)
    })
    const checkId = idArr.indexOf(+taskId)
    lastColumn.tasks.splice(checkId, 1)
    const url = `http://localhost:3000/boards/${boardId}`
        const updateResponse = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(board)
        })
    
        if (!updateResponse.ok) {
            throw new Error('Failed to update board')
        }
    
        return updateResponse.json()
}
