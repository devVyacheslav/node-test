import User from "./../models/user";

export const signup = async(req, res, next) => {
    const credentials = req.body;
    let user;

    try {
        user = await User.create(credentials);
    } catch ({message}) {
        return next({
            status: 400,
            message
        });
    }
    res.json(user);

    // res.json('signin');

    // User.create(credentials, (err, user) => {
    //     if(err) return next(err);
    //
    //     ...user
    // })
};

export const signin = async(req, res, next) => {
    const {login, password } = req.body;

    const user = await User.findOne({login});

    if(!user) {
        return next({
            status: 400,
            message: "User not found"
        })
    }

    try {
        const result =  await user.comparePasswords(password)
    } catch(e) {
        return next({
            status: 400,
            message: "Bad credentials"
        })
    }
//    Если пароли совпадают то делаем сессию и возвращаем пользователя

    req.session.userId = user._id;
    res.json(user);
};
