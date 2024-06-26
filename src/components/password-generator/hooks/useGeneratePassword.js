import { useState } from "react";

const usePasswordGenerate = ({ checkboxData }) => {
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const generatePassword = (charLength) => {
        let charset = "",
            generatedPassword = "";
        const selectedOption = checkboxData.filter((checkbox) => checkbox.state);

        if (selectedOption.length === 0) {
            setErrorMsg("Select at least one option.");
            setPassword("");
            return;
        }
        selectedOption.forEach((option) => {
            switch (option.title) {
                case "Include Uppercase Letters":
                    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    break;
                case "Include Lowercase Letters":
                    charset += "abcdefghijklmnopqrstuvwxyz";
                    break;
                case "Include Numbers":
                    charset += "0123456789";
                    break;
                case "Include Symbols":
                    charset += "!@#$%^&*()";
                    break;
                default:
                    break;
            }
        });

        for (let i = 0; i < charLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            generatedPassword += charset[randomIndex];
        }
        setPassword(generatedPassword);
        setErrorMsg("");
    };

    return {
        password,
        errorMsg,
        generatePassword,
    };
};

export default usePasswordGenerate;
