const userService = require("../services/userService");

exports.signup = async (req, res) => {
    const { name, userName, email, password } = req.body;
    if (!name || !email || !userName || !password) {
        return res.status(422).json({ error: "Please add all the fields" });
    }

    try {
        const existingUser = await userService.findUserByEmailOrUserName(email, userName);
        if (existingUser) {
            return res.status(422).json({ error: "User already exists with that email or userName" });
        }

        const hashedPassword = await userService.hashPassword(password);
        await userService.createUser({ name, userName, email, password: hashedPassword });
        res.json({ message: "Registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email and password" });
    }

    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(422).json({ error: "Invalid email" });
        }

        const isMatch = await userService.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(422).json({ error: "Invalid password" });
        }

        const token = userService.generateToken(user._id);
        const { _id, name, email, userName } = user;
        res.json({ token, user: { _id, name, email, userName } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};