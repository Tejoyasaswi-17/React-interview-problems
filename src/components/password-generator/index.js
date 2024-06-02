import { useState } from "react";
import usePasswordGenerate from "./hooks/useGeneratePassword";
import useGetPasswordStrength from "./hooks/useGetPasswordStrength";
import styles from "./styles.css";

function PasswordGenerator() {
    const [charLength, setCharLength] = useState(8);
    const [copied, setCopied] = useState(false);
    const [checkboxData, setCheckboxData] = useState([
        { title: "Include Uppercase Letters", state: false },
        { title: "Include Lowercase Letters", state: false },
        { title: "Include Numbers", state: false },
        { title: "Include Symbols", state: false },
    ]);
    const { password, errorMsg, generatePassword } = usePasswordGenerate({
        checkboxData,
        charLength,
    });

    const strength = useGetPasswordStrength(password);

    const handleCopyPassword = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    const handleChangeCheckboxData = (index) => {
        const updatedCheckboxData = [...checkboxData];
        updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
        setCheckboxData(updatedCheckboxData);
    };

    return (
        <div className="container">
            <h1 className="heading">Password generator</h1>
            {password && (
                <div className="header">
                    <div className="title">{password}</div>
                    <button className="copy_button" onClick={handleCopyPassword}>
                        {copied ? "copied" : "copy"}
                    </button>
                </div>
            )}

            <div className="character_count">
                <span>
                    <label>Character count</label>
                    <label>{charLength}</label>
                </span>
                <input
                    type="range"
                    min={4}
                    max={20}
                    onChange={(e) => setCharLength(e.target.value)}
                    value={charLength}
                />
            </div>

            <div className="checkboxes">
                {checkboxData?.map((checkbox, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            checked={checkbox.state}
                            onChange={() => handleChangeCheckboxData(index)}
                            value={checkboxData[index].state}
                        />
                        <label>{checkbox.title}</label>
                    </div>
                ))}
            </div>

            {password && (
                <div className="password_strength">
                    <span>Strength: </span>
                    <span>{strength}</span>
                </div>
            )}

            <button
                className="generate_button"
                onClick={() => generatePassword(charLength)}
            >
                Generate password
            </button>

            {copied && <div className="success_toast">Copied successfully</div>}
            {errorMsg && <div className="failure_toast">{errorMsg}</div>}
        </div>
    );
}

export default PasswordGenerator;
