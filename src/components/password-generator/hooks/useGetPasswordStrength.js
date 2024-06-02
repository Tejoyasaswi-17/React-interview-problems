const useGetPasswordStrength = (password) => {
    const passwordLength = password.length;
    if (passwordLength <= 6) {
        return "Very weak";
    } else if (passwordLength <= 8) {
        return "Weak";
    } else if (passwordLength <= 10) {
        return "Medium";
    } else if (passwordLength <= 15) {
        return "Strong";
    }
    return "Very Strong";
};

export default useGetPasswordStrength;
