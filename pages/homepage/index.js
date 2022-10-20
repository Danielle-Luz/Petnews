import { redirectNotLogged } from "../../scripts/api.js";
import { setUserInfo, toggleLogoutTooltip, renderAllPosts } from "../../scripts/render.js";

redirectNotLogged();

setUserInfo();

toggleLogoutTooltip();

renderAllPosts ();