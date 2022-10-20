import { showTooltip, createErrorMessage, toggleLoading, createPostFromData, showEmptyMessage } from "./render.js";

const base_url = "http://localhost:3333"
const token = `Bearer ${localStorage.getItem("token")}`;

async function sendData (endpoint, data) {
    try {
        const response = await fetch(`${base_url}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        return response;
    } catch (err) {
        throw err;
    }
}

export async function editPost (data, postId) {
    try {
        const response = await fetch(`${base_url}/posts/${postId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(data)
        });

        showTooltip("Post atualizado com sucesso", "Post editado, recarregue a página para ver as alterações.");
    } catch {
        showTooltip("Algo deu errado", "Não foi possível enviar os dados para o servidor.", "warning");
    }
}

export async function createPost (data) {
    try {
        const response = await fetch(`${base_url}/posts/create`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(data)
        });
        const postData = await response.json();
    
        const post = await createPostFromData(postData);
    
        document.querySelector(".posts").appendChild(post);
    
        showEmptyMessage();
    
        showTooltip("Post criado com sucesso", "Post adicionado ao feed.");
        document.querySelector(".posts").appendChild(post);
    } catch {
        showTooltip("Algo deu errado", "Não foi possível enviar os dados para o servidor.", "warning");
    }
}

export async function createUser (data) {
    try {
        toggleLoading(true);

        const response = await sendData("users/create", data);
        if (response.status == 400) {
            showTooltip("Usuário já cadastrado", "E-mail ou username já cadastrado, insira outros dados e tente novamente.", "warning");
        } else if (response.status == 200) {
            showTooltip("Sua conta foi criada com sucesso!", "Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a class='link' href='../../pages/login/index.html'>Acessar página de login</a>");
            setTimeout(
            () => {
                window.location.replace("../login/index.html");
            }, 5000);
        }

    } catch (err) {
        showTooltip("Algo deu errado", "Algo deu errado durante o processo, o usuário não foi cadastrado.", "warning");
    }

    toggleLoading(false, "Cadastrar");
}

export async function login (data) {
    toggleLoading(true);

    const response = await sendData("login", data);
    const responseJson = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", responseJson.token);
        window.location.replace("../homepage/index.html");
    }

    if (response.status == 401) {
        if (responseJson.message == 'O email está incorreto') {
            const email = document.getElementById("email");

            createErrorMessage(email, "O email está incorreto");
        } else if (responseJson.message == "A senha está incorreta") {
            const password = document.getElementById("password");

            createErrorMessage(password, "A senha está incorreta");
        }
    }
    try {

    } catch (err) {
        showTooltip("Algo deu errado", "Algo deu errado durante o login.", "warning");
    }
    
    toggleLoading(false, "Acessar");
}

export async function getUserInfo () {
    try {
        const response = await fetch(`${base_url}/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
    
        const responseJson = await response.json();
    
        return responseJson;
    } catch {
        window.location.replace("../login/index.html");
    }
}

export async function getAllPosts () {
    try {
        const response = await fetch(`${base_url}/posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
    
        const posts = await response.json();

        return posts;
    } catch {
        return [];
    }
}

export async function deletePost (postId) {
    const response = await fetch(`${base_url}/posts/${postId}`,
    {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });

    showEmptyMessage();

    showTooltip("Post deletado com sucesso!", "O post selecionado para exclusão foi deletado, a partir de agora não aparecerá no seu feed ");

}

export function redirectNotLogged () {
    if (localStorage.getItem("token") == null) {
        window.location.replace("../login/index.html");
    }
}

export function deleteToken () {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
    }
}