export const throwError = (e, status) => { throw { message: e, status: status } }

export const errorHandler = (e, res) => e.name === "CastError"
    ? res.status(404).json({ message: "Not a valid Id" })
    : res.status(e.status || 500).json({ message: e.message })

export const checkModel = (model, res, successMsg, code) => !model
    ? res.status(404).json({ message: "User not found" })
    : res.status(200 || code).json({ message: successMsg })

export const onlyNum = raw => raw.replace(/\D/g, "");

export const nameLike = queryName => new RegExp(queryName, 'i');

export const validateBirthDate = (birth) => {
    let birthDate = new Date(birth);
    let today = new Date();
    let diff = today-birthDate;
    let age = Math.floor(diff/31557600000);
    return age > 17;
}