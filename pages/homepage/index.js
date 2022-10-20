import { redirectNotLogged } from "../../scripts/api.js";
import { openFormModal } from "../../scripts/modals.js";
import { setUserInfo, toggleLogoutTooltip, renderAllPosts } from "../../scripts/render.js";

redirectNotLogged();

setUserInfo();

toggleLogoutTooltip();

renderAllPosts ();

document.getElementById("new-post")
.addEventListener("click",
() => {
    openFormModal("create");
});