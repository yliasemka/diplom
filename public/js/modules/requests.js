
export async function getBoards(url){
    const answ = await fetch(`${url}`)
    if (!answ.ok){
        new Error('Failed to fetch boards')
    } 
    const boards = await answ.json()
    console.log(boards)
    return boards
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

    object.id = `${await getBoards('http://localhost:3000/boards').then(boards => boards.length + 1)}`;
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

    object.id = `${await getBoards('http://localhost:3000/users').then(boards => boards.length + 1)}`;

    console.log(object);

    try {
        const result = await fetch('http://localhost:3000/users', {
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