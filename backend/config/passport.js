const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Student = require("../models/studentModel");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
