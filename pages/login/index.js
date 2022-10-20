import { login, deleteToken } from "../../scripts/api.js";
import { sendInputData, checkEmptyInputs } from "../../scripts/inputs.js";

deleteToken();

checkEmptyInputs();

await sendInputData(login);