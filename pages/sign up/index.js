import { createUser } from "../../scripts/api.js";
import { sendInputData, checkEmptyInputs } from "../../scripts/inputs.js";

checkEmptyInputs();

await sendInputData(createUser);