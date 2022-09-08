export const throwError = (e, status) => { throw { message: e, status: status } }

export const errorHandler = (e, res) => e.name === "CastError"
    ? res.status(404).json({ message: "Not a valid Id" })
    : res.status(e.status || 500).json({ message: e.message })

export const checkModel = (model, res, successMsg, code) => !model
    ? res.status(404).json({ message: "User not found" })
    : res.status(200 || code).json({ message: successMsg })

// CPF, NASC, ZIPCODE, EMAIL

export const onlyNum = raw => raw.replace(/\D/g, "");

export const validateBirthDate = (birthDate) => {
    let today = new Date(birthDate);
    let yyDifference = new Date().getFullYear() - today.getFullYear();
    let mmDifference = (new Date().getMonth() - today.getMonth()) + 1;

    mmDifference < 0 && (yyDifference -= 1);
    (mmDifference === 0 && (new Date().getDate() < today.getDate())) && (yyDifference -= 1);

    return yyDifference >= 18;
}