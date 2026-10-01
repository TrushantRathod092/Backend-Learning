const Auth = (req, res, next) => {
    // Add item into food menu
    // Authentication if the admin is real or not
    // dummy code

    const token = "ABCDEF"
    const Access = token === "ABCDEF" ? 1 : 0;

    if(!Access){
        res.status(403).send("Item Can't be Added")
    }

    next();
}

module.exports = {
    Auth,
}