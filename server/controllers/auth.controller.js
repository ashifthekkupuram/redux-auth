export const login = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Login API"
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

export const register = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Register API"
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}