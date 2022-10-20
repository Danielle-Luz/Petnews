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

export async function sendInputData (callback) {
    const form = document.querySelector("form");

    form.addEventListener("submit",
    async event => {
        event.preventDefault();

        const inputs = form.querySelectorAll("input");
        let data = {};

        inputs.forEach( input => {
            const inputName = input.getAttribute("name");
            const value = input.value;

            data = {
                ...data,
                [inputName]: value
            }
        });

        await callback(data);
    });
}