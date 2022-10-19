import { showTooltip, createErrorMessage, toggleLoading } from "./render.js";

const base_url = "http://localhost:3333"

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

export async function createUser (data) {
    try {
        toggleLoading(true);

        const response = await sendData("users/create", data);
    
        if (response.status == 400) {
            showTooltip("Usuário já cadastrado", "E-mail ou username já cadastrado, insira outros dados e tente novamente.", "warning");
        } else if (response.status == 200) {
            showTooltip("Sua conta foi criada com sucesso!", "Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a class='link' href='../../pages/login/index.html'>Acessar página de login</a>");
        }

    } catch (err) {
        showTooltip("Algo deu errado", "Algo deu errado durante o processo, o usuário não foi cadastrado.", "warning");
    }

    toggleLoading(false);
}

export async function login (data) {
    try {
        toggleLoading(true);

        const response = await sendData("login", data);
        const responseJson = await response.json();

        if (response.status == 200) {
            localStorage.setItem("token", responseJson.token);
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

    } catch (err) {
        showTooltip("Algo deu errado", "Algo deu errado durante o login.", "warning");
    }
    
    toggleLoading(false);
}
