const api = "http://localhost:7000/todos";
export async function getApiTodos() {
    const resp = await fetch(api);
    if (resp.ok) {
        return resp.json();
    } else {
        throw new Error(`todos network error : ${resp.status}`);
    }
}

export async function updateApiTodo(todo) {
    const resp = await fetch(api + '/' + todo.id, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    if (resp.ok) {
        return resp.json();
    } else {
        throw new Error(`todos network error : ${resp.status}`);
    }
}

export async function deleteApiTodo(id) {
    const resp = await fetch(api + '/' + id, {
        method: 'DELETE',
    });
    if (! resp.ok) {
        throw new Error(`todos network error : ${resp.status}`);
    }
}

export async function addApiTodo(text) {
    const resp = await fetch(api, {
       method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text,
            done: false,
        }),
    });
    if (resp.ok) {
        return resp.json();
    } else {
        throw new Error(`todos network error : ${resp.status}`);
    }
}