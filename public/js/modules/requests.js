import { getLocalStorageDate, setLocalStorageDate } from "./localStorage.js"
import { noneUser, SingInUser, closeModal } from "../components/modalWindow.js"



export async function getBoards(url){
    const test = getLocalStorageDate()
    console.log(test)
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
    console.log(result)
    console.log(boards)
    return [result, boards]
}

export async function getUsers(url){
    const answ = await fetch(`${url}`)
    if (!answ.ok){
        new Error('Failed to fetch boards')
    } 
    const boards = await answ.json()
    console.log(boards)
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
    console.log(object.userId)
    object.columns = [];

    console.log(object);

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
        console.log(await result.json());
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
    console.log(checkEmail)
    if (checkEmail.ok){
        setLocalStorageDate([], 'user')
        return null
    }
    object.id = `${await getUsers('http://localhost:3000/users').then(boards => boards.length + 1)}`;

    console.log(object);

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
        console.log(await result.json())
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
    console.log(emailUser)
    try{
        const result = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(emailUser)}`)
        if (!result.ok){
            throw new Error(`Failed to find user`)
        }
        const user = await result.json()
        console.log(user)
        if (user.length === 0){
            console.log("ia tut")
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
        new Error('Failed to fetch boards')
    } 
    const boards = await answ.json()
    const result = boards.find(item => +item.id === +id)
    return result.columns
}