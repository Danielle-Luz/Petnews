import { getUserInfo, getAllPosts } from "./api.js";

export function showTooltip (title, message, type = "sucess") {
    if (document.querySelector(".tooltip") == null) {
        const tooltipWrapper = document.createElement("div");
        const tooltip = document.createElement("article");
        const tooltipTitle = document.createElement("h2");
        const tooltipText = document.createElement("p");
        const progressBar = document.createElement("div");
    
        tooltipWrapper.classList = "full-width full-height position-absolute";
        tooltip.classList = "tooltip position-fixed";
        tooltipTitle.classList = "align-center d-flex gap-7 text-1";
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

export function setUserInfo () {
    const userInfo = getUserInfo();

    userInfo
    .then(data => {
        const headerImg = document.getElementById("header-img");
        const headerUsername = document.getElementById("header-username");

        headerImg.src = data.avatar;
        headerUsername.innerText = `@${data.username}`;
    });
}

export function toggleLogoutTooltip () {
    const headerOptions = document.querySelector(".options");
    const tooltipLogout = document.querySelector(".tooltip-logout");

    headerOptions.addEventListener
    ("mouseover",
    () => {
        tooltipLogout.style.animationName = "showLogout";
        
        tooltipLogout.classList.remove("d-none");
    });
    
    headerOptions.addEventListener
    ("mouseleave",
    () => {
        tooltipLogout.style.animationName = "hideLogout";
        
        setTimeout(
        () => {
            tooltipLogout.classList.add("d-none");
        }, 300);
    });
}

export function renderAllPosts () {
    const response = getAllPosts();

    response
    .then(
    posts => {
        const postContainer = document.querySelector(".posts");

        posts.forEach(
            post => {
                createPostFromData(post)
                .then(postElement => {
                    postContainer.appendChild(postElement);
                });
            }
        )
    });
}

async function createPostFromData (data) {
    const isPostAuthor = await checkPostAuthor(data.user.id);
    
    const post = document.createElement("article");
    const postHeader = document.createElement("header");
    const postInfo = document.createElement("article");
    const postAuthor = document.createElement("div");
    const userImg = document.createElement("img");
    const username = document.createElement("h3");
    const postDate = document.createElement("p");
    const postTitle = document.createElement("h2");
    const postContent = document.createElement("p");
    const openPostButton = document.createElement("button");

    post.classList = "d-flex flex-column gap-5";
    postHeader.classList = "d-flex full-width gap-5 justify-between";
    postInfo.classList = "align-center d-flex gap-7 post-info";
    postAuthor.classList = "align-center d-flex gap-8 post-author";
    userImg.classList = "round-img";
    username.classList = "text-2";
    postDate.classList = "color-grey-4 text-2";
    postTitle.classList = "title-2";
    postContent.classList = "color-grey-3 text-1 post-text";
    openPostButton.classList = "button fit-width link";

    userImg.src = data.user.avatar;
    username.innerText = data.user.username;
    postDate.innerText = /*data.date*/ "Outubro de 2022";
    postTitle.innerText = data.title;
    postContent.innerText = data.content;
    openPostButton.innerText = "Acessar publicação";

    postAuthor.append(userImg, username);
    postInfo.append(postAuthor, postDate);
    postHeader.appendChild(postInfo);
        
    if (isPostAuthor) {
        const buttonGroup = document.createElement("div");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        
        buttonGroup.classList = "d-flex gap-5";
        editButton.classList = "button button-outline pd-button-2 text-2";
        deleteButton.classList = "button button-gray pd-button-2 text-2";

        editButton.innerText = "Editar";
        deleteButton.innerText = "Excluir";

        buttonGroup.append(editButton, deleteButton);
        postHeader.insertAdjacentElement("beforeend", buttonGroup);
    }

    post.append(postHeader, postTitle, postContent, openPostButton);

    return post;
}

async function checkPostAuthor (userId) {
    const data = await getUserInfo();
    console.log(data.id == userId)
    if (data.id == userId) {
        return true;
    }
    return false;
}