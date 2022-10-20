export function checkEmptyInputs () {
    const inputs = [...document.querySelectorAll(".input-1")];

    inputs.forEach(input => {
        input.addEventListener("input",
        () => {
            const bSubmit = document.querySelector("button[type=submit]");

            const allFulfilled =
            inputs.every(
            input => {
                return input.value != "";
            });

            if (allFulfilled) {
                bSubmit.removeAttribute("disabled");
            } else {
                bSubmit.setAttribute("disabled", "true");
            }
        });
    });
}

export async function sendInputData (callback, element, postId) {
    let form;

    if (element) {
        form = element;
    } else {
        form = document.querySelector("form");
    }

    form.addEventListener("submit",
    async event => {
        event.preventDefault();

        const inputs = form.querySelectorAll("input, textarea");
        let data = {};

        inputs.forEach( input => {
            const inputName = input.getAttribute("name");
            const value = input.value;

            data = {
                ...data,
                [inputName]: value
            }
        });

        if (!postId) {
            await callback(data);
        } else {
            await callback(data, postId);
        }
    });
}

export function setInputData (data) {
    const input = document.querySelector("input");
    const textarea = document.querySelector("textarea");

    input.value = data.title;
    textarea.value = data.content;
}