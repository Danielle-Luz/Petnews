import { sendInputData } from "./inputs.js";
import { createPost, editPost, deletePost } from "./api.js";

export function openPost (data) {
    const modalWrapper = document.createElement("div");
    const modal = document.createElement("article");
    const closeButton = document.createElement("button");
    const modalHeader = document.createElement("header");
    const postInfo = document.createElement("article");
    const postAuthor = document.createElement("div");
    const userImg = document.createElement("img");
    const username = document.createElement("h3");
    const postDate = document.createElement("p");
    const contentWrapper = document.createElement("article");
    const postTitle = document.createElement("h2");
    const postText = document.createElement("p");

    modalWrapper.classList = "align-center d-flex modal-wrapper full-height full-width justify-center pd-inline position-fixed";
    modal.classList = "container modal bg-grey-9 d-flex flex-column modal gap-2";
    modalHeader.classList = "d-flex full-width justify-between";
    postInfo.classList = "align-center d-flex gap-7 post-info";
    postAuthor.classList = "align-center d-flex gap-8 post-author";
    userImg.classList = "round-img";
    username.classList = "text-2";
    postDate.classList = "color-grey-4 text-2";
    closeButton.classList = "button close-button pd-button-2 text-2";
    contentWrapper.classList = "d-flex flex-column gap-5";
    postTitle.classList = "title-2";
    postText.classList = "text-1 color-grey-3";

    userImg.src = data.user.avatar;
    username.innerText = data.user.username;
    postDate.innerText = /*data.date*/ "Outubro de 2022";
    closeButton.innerText = "X";
    postTitle.innerText = data.title;
    postText.innerText = data.content;

    closeButton.addEventListener("click",
    () => {
        hideModal (modal, modalWrapper);
    });

    postAuthor.append(userImg, username);
    postInfo.append(postAuthor, postDate);
    modalHeader.append(postInfo, closeButton);
    contentWrapper.append(postTitle, postText);
    modal.append(modalHeader, contentWrapper);
    modalWrapper.appendChild(modal);

    document.body.insertAdjacentElement("afterbegin", modalWrapper);
}

export function openFormModal (type, postId) {
    const modalWrapper = document.createElement("div");
    const modal = document.createElement("article");
    const modalHeader = document.createElement("header");
    const postTitle = document.createElement("h2");
    const closeButton = document.createElement("button");
    const form = document.createElement("form");
    const inputWrapper = document.createElement("div");
    const inputLabel = document.createElement("label");
    const input = document.createElement("input");
    const textareaWrapper = document.createElement("div");
    const textareaLabel = document.createElement("label");
    const textarea = document.createElement("textarea");
    const buttonGroup = document.createElement("div");
    const cancelButton = document.createElement("button");
    const saveButton = document.createElement("button");

    modalWrapper.classList = "align-center d-flex modal-wrapper full-height full-width justify-center pd-inline position-fixed";
    modal.classList = "container modal bg-grey-9 d-flex flex-column modal gap-2";
    modalHeader.classList = "d-flex full-width justify-between";
    closeButton.classList = "button close-button pd-button-2 text-2";
    postTitle.classList = "title-3";
    form.classList = "d-flex flex-column full-width gap-2";
    inputWrapper.classList = "d-flex flex-column gap-7";
    inputLabel.classList = "label-1 text-1";
    input.classList = "input-1";
    textareaWrapper.classList = "d-flex flex-column gap-7";
    textareaLabel.classList = "label-1 text-1";
    textarea.classList = "input-1";
    buttonGroup.classList = "d-flex fit-width gap-6 self-end";
    cancelButton.classList = "button button-gray pd-button-1";
    saveButton.classList = "button button-brand pd-button-1";

    input.setAttribute("placeholder", "Digite o título aqui...");
    input.setAttribute("name", "title");
    input.setAttribute("required", "true");
    input.setAttribute("autocomplete", "off");

    textarea.setAttribute("placeholder", "Desenvolva o conteúdo do post aqui...");
    textarea.setAttribute("name", "content");
    textarea.setAttribute("required", "true");
    textarea.setAttribute("autocomplete", "off");
    
    if (type == "create") {
        postTitle.innerText = "Criando novo post";
        saveButton.innerText = "Publicar";

        sendInputData(createPost, form)
    } else {
        postTitle.innerText = "Edição";
        saveButton.innerText = "Salvar alterações";

        sendInputData(editPost, form, postId)
    }
    
    cancelButton.innerText = "Cancelar";
    closeButton.innerText = "X";
    inputLabel.innerText = "Título do post";
    textareaLabel.innerText = "Conteúdo do post";

    cancelButton.addEventListener("click", () => {
        hideModal (modal, modalWrapper);
    });

    closeButton.addEventListener("click", () => {
        hideModal (modal, modalWrapper);
    });

    modalHeader.append(postTitle, closeButton);
    inputWrapper.append(inputLabel, input);
    textareaWrapper.append(textareaLabel, textarea);
    buttonGroup.append(cancelButton, saveButton);
    form.append(inputWrapper, textareaWrapper, buttonGroup);
    modal.append(modalHeader, form);
    modalWrapper.appendChild(modal);

    document.body.insertAdjacentElement("afterbegin", modalWrapper);

    return [input.value, textarea.value];
}

export function deleteModal (userId, deletedElement) {
    const modalWrapper = document.createElement("div");
    const modal = document.createElement("article");
    const modalHeader = document.createElement("header");
    const closeButton = document.createElement("button");
    const contentWrapper = document.createElement("article");
    const title_1 = document.createElement("h2");
    const title_2 = document.createElement("h2");
    const text = document.createElement("p");
    const buttonGroup = document.createElement("div");
    const cancelButton = document.createElement("button");
    const confirmButton = document.createElement("button");

    modalWrapper.classList = "align-center d-flex modal-wrapper full-height full-width justify-center pd-inline position-fixed";
    modal.classList = "container modal bg-grey-9 d-flex flex-column modal gap-2";
    modalHeader.classList = "d-flex full-width justify-between";
    closeButton.classList = "button close-button pd-button-2 text-2";
    contentWrapper.classList = "d-flex flex-column gap-6";
    title_1.classList = "title-3";
    title_2.classList = "title-2";
    text.classList = "color-grey-3 text-1";
    buttonGroup.classList = "d-flex fit-width gap-6";
    cancelButton.classList = "button button-gray pd-button-1";
    confirmButton.classList = "button button-alert pd-button-1";

    closeButton.innerText = "X";
    title_1.innerText = "Confirmação de exclusão";
    title_2.innerText = "Tem certeza que deseja excluir este post?";
    text.innerText = "Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir";
    cancelButton.innerText = "Cancelar";
    confirmButton.innerText = "Sim, excluir este post";

    closeButton.addEventListener("click",
    () => {
        hideModal (modal, modalWrapper);
    });

    cancelButton.addEventListener("click",
    () => {
        hideModal (modal, modalWrapper);
    });

    confirmButton.addEventListener("click",
    () => {
        deletePost(userId);

        deletedElement.remove();
    });

    modalHeader.append(title_1, closeButton);
    contentWrapper.append(title_2, text);
    buttonGroup.append(cancelButton, confirmButton);
    modal.append(modalHeader, contentWrapper, buttonGroup);
    modalWrapper.appendChild(modal);

    document.body.appendChild(modalWrapper);
}

function hideModal (modal, modalWrapper) {
    modal.style.animationName = "hide-modal";
    modalWrapper.style.animationName = "hide-wrapper";
    setTimeout(() => {
        modalWrapper.remove();
    }, 450);
}