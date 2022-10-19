export function showTooltip (title, message, type = "sucess") {
    if (document.querySelector(".tooltip") == null) {
        const tooltipWrapper = document.createElement("div");
        const tooltip = document.createElement("article");
        const tooltipTitle = document.createElement("h2");
        const tooltipText = document.createElement("p");
        const progressBar = document.createElement("div");
    
        tooltipWrapper.classList = "full-width full-height position-absolute";
        tooltip.classList = "tooltip position-fixed";
        tooltipTitle.classList = "align-center d-flex gap-6 text-1";
        tooltipText.classList = "text-2 color-grey-2";
        progressBar.classList = "progress-bar";
    
        tooltipTitle.innerText = title;
        tooltipText.innerHTML = message;
    
        if (type == "warning") {
            tooltipTitle.classList.add("title-alert", "color-alert-1");
        } else {
            tooltipTitle.classList.add("title-sucess", "color-sucess-1");
        }
    
        tooltip.append(tooltipTitle, tooltipText, progressBar);
        tooltipWrapper.appendChild(tooltip);
    
        document.body.insertAdjacentElement("afterbegin", tooltipWrapper);
    
        setTimeout(() => {
            document.body.removeChild(tooltipWrapper);
        }, 10000);
    }
}

export function createErrorMessage (element, message) {
    const existingErrorMessage = document.querySelector(".color-alert-1");

    if (existingErrorMessage) {
        existingErrorMessage.remove();
    }

    const errorMessage = document.createElement("p");

    errorMessage.classList = "color-alert-1 text-2";
    errorMessage.innerText = message;

    element.insertAdjacentElement("afterend", errorMessage)

    element.addEventListener("click",
    () => errorMessage.remove());
}

export function toggleLoading (isLoading) {
    const button = document.querySelector("button[type=submit");

    if (isLoading) {
        button.innerHTML = "<img class='spinner' src='../../assets/imgs/spinner.svg'>";
    } else {
        setTimeout(() => button.innerHTML = "Acessar", 500);
    }
}

/* 
    <div class="full-width full-height position-absolute">
        <article class="tooltip position-fixed">
            <h2 class="align-center color-sucess-1 d-flex gap-6 text-1 title-sucess">
                Sua conta foi criada com sucesso!
            </h2>
            <p class="text-2 color-grey-2">
                Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a class="link" href="">Acessar página de login</a>
            </p>
            <div class="progress-bar"></div>
        </article>
    </div>
*/