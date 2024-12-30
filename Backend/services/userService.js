const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const USER = require("../models/userModel");


exports.findUserByEmailOrUserName = async (email, userName) => {
    return USER.findOne({ $or: [{ email }, { userName }] });
};

exports.findUserByEmail = async (email) => {
    return USER.findOne({ email });
};

exports.hashPassword = async (password) => {
    return bcrypt.hash(password, 12);
};

exports.comparePassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

exports.createUser = async (userData) => {
    const user = new USER(userData);
    return user.save();
};

exports.generateToken = (userId) => {
    return jwt.sign({ _id: userId }, Jwt_secret);
};