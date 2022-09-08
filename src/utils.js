export const onlyNum = raw => raw.replace(/\D/g, "");

export const nameLike = queryName => new RegExp(queryName, 'i');

export const throwError = (e, status) => { throw { message: e, status: status } }

export const errorHandler = (e, res) => e.name === "CastError"
    ? res.status(404).json({ message: "Not a valid Id" })
    : res.status(e.status || 500).json({ message: e.message })

export const checkModel = (model, res, successMsg, code) => !model
    ? res.status(404).json({ message: "User not found" })
    : res.status(code || 200).json({ message: successMsg })

export const formatDate = birth => {
    const yyyy = birth.getFullYear();
    let mm = birth.getMonth() + 1;
    let dd = birth.getDate();

    dd < 10 && (dd = `0${dd}`);
    mm < 10 && (mm = `0${mm}`);

    return (`${mm}/${dd}/${yyyy}`);
}

export const validateBirthDate = birthDate => {
    let birth = new Date(birthDate);
    let today = new Date();
    let diff = today - birth;
    let age = Math.floor(diff / 31557600000);
    return age > 17;
}

export const getPagination = async (res, users, page = 1) => {
    const limit = 3;
    const total = Math.ceil(users.length / 3);

    const start = (page - 1) * limit;
    const end = page * limit;

    const result = users.slice(start, end);
    if (result.length === 0) return throwError("Page not found", 404);

    return res.status(200).json({ result, totalPages: total, currentPage: parseInt(page) })
}