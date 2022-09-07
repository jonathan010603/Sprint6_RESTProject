export const throwError = (e, status) => {throw {message: e, status: status}}

export const errorHandler = (e, res) => e.name === "CastError" 
    ? res.status(404).json({ message: "Not a valid Id" })
    : res.status(e.status || 500).json({ message: e.message })

export const checkModel = (model, res, successMsg) => !model 
    ? res.status(404).json({ message: "User not found" }) 
    : res.status(200).json({ message: successMsg })