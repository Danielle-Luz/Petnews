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
        const modal = closeButton.closest(".modal-wrapper");

        modal.remove();
    });

    postAuthor.append(userImg, username);
    postInfo.append(postAuthor, postDate);
    modalHeader.append(postInfo, closeButton);
    contentWrapper.append(postTitle, postText);
    modal.append(modalHeader, contentWrapper);
    modalWrapper.appendChild(modal);

    document.body.insertAdjacentElement("afterbegin", modalWrapper);
}