const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const access = require('./access');

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromExtractors([
		ExtractJwt.fromAuthHeaderWithScheme('JWT'),
		ExtractJwt.fromUrlQueryParameter('token'),
	]),
	secretOrKey: process.env.SECRET_KEY,
	// passReqToCallback: true,
};