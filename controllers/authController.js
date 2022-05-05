const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10
const {models} = require('../database/db')
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 30 * 60 * 1000
    });
};

const createSendToken = (user, req, res) => {
    const token = signToken(user.idUser);

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + 30 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    res.status(200).json({
        success: true,
        token,
        data: {
            user
        }
    });
};

async function generatePassword(plainPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err)
                reject(err)
            bcrypt.hash(plainPassword, salt, (err, hash) => {
                if (err)
                    reject(err)
                resolve(hash)
            });
        });
    })

}

async function comparePassword(plainPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
            if (err)
                reject(err)
            resolve(result)
        });
    })
}

async function checkUser(userEmail, userPassword) {
    const user = await models.users.findOne({
        where: {
            userEmail
        }
    })
    if (!user) {
        return
    }
    const userData = user.dataValues
    if (await comparePassword(userPassword, user.userPassword) == false) {
        return false
    }
    user.userPassword = null
    return user
}

exports.login = async (req, res, next) => {
    const userEmail = req.body.userEmail
    const userPassword = req.body.userPassword
    if (!userEmail || !userPassword)
        return next(new Error('No email or password provided.'))
    const user = await checkUser(userEmail, userPassword)
    if (!user)
        return next(new Error('Email or password is incorrect.'))
    return createSendToken(user, req, res)
}

exports.signup = async (req, res, next) => {
    try {
        userPassword = await generatePassword(req.body.userPassword)
        const newUser = await models.users.create({ userEmail: req.body.userEmail, userPassword});
        if (!newUser)
            return
        return createSendToken(newUser, req, res)
    } catch (e) {
        return next(e)
    }
};

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(new Error('Not logged in'));
    }

    const idUser = jwt.verify(token, process.env.JWT_SECRET)

    const user = models.users.findOne({
        idUser
    })

    if (!user) {
        return next(new Error('User not found.'));
    }

    req.user = user;
    next();
}