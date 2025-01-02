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
    console.log(req.body);
    
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email and password" });
    }

    try {
        
        const user = await userService.findUserByEmail(req.body.email);
        if (!user) {
            return res.status(422).json({ error: "Invalid email" });
        }

        const isMatch = await userService.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(422).json({ error: "Invalid password" });
        }
        else{
           return res.status(200).json({
            message: "login success",
          
          });
        }

        // const token = userService.generateToken(user._id);
        // const { _id, name, email, userName } = user;
        // res.json({user: { _id, name, email, userName } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// exports.signin = async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     console.log(req.body);

//     if (!email || !password) {
//         return res.status(422).json({ message: "Please add email and password" });
//     }

//     try {
//         const findUser = await userService.findUserByEmail(email);
//         console.log(findUser);

//         if (!findUser) {
//             return res.status(422).json({ message: "User not found" });
//         }

//         const isMatch = await userService.comparePassword(password, findUser.password);
//         if (!isMatch) {
//             return res.status(422).json({ message: "Invalid password" });
//         }

//         const data = {
//             _id: findUser._id,
//             email: findUser.email,
//             userName: findUser.userName,
//             name: findUser.name,
//         };

//         const token = userService.generateToken(findUser._id);

//         res.status(200).json({
//             token,
//             user: data,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// };
