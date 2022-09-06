const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const access = require('./access');

const Admin = require("../models/adminSchema");
const Doctor = require("../models/doctorSchema");
const Patient = require("../models/patientSchema");

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromExtractors([
		ExtractJwt.fromAuthHeaderWithScheme('JWT'),
		ExtractJwt.fromUrlQueryParameter('token'),
	]),
	secretOrKey: process.env.SECRET_KEY,
	// passReqToCallback: true,
};

const adminOption = {
	usernameField: 'username',
	passwordField: 'password',
};

const userOption = {
	emailField : 'email',
	passwordField : 'password'
};


const adminLogin = new LocalStrategy(adminOption, async function (username, password, done) {
	const admin = await Admin.findOne({ username });
	if (!admin) {
		return done(null, false);
	}
	// console.log(username, password);
	bcrypt.compare(password, admin.password, function (err, isMatch) {
		if (err) return done(err, false);
		if (!isMatch) return done(null, false);
		let user = admin._doc;
		if (user.accessRole === "superadmin") {
			user.access = access.superadmin;
			return done(null, { ...user, role: "superadmin" });
		}
		user.access = access.admin;
		return done(null, { ...user, role: "admin" });
	});
});


const doctorLogin = new LocalStrategy(userOption, async function (email, password, done) {
	const doctor = await Doctor.findOne({ email });
	if (!doctor) {
		return done(null, false);
	}else if(doctor.isVerified === false){
		return done(null, false);
	}
	bcrypt.compare(password, doctor.password, function (err, isMatch) {
		if (err) return done(err, false);
		if (!isMatch) return done(null, false);
		let user = doctor._doc;
		user.access = access.doctor;
		return done(null, { ...user, role: "doctor" });
	});
});


const patientLogin = new LocalStrategy(userOption, async function (email, password, done) {
	const patient = await Patient.findOne({ email });
	if (!patient) {
		return done(null, false);
	}else if(patient.isVerified === false){
		return done(null, false);
	}
	bcrypt.compare(password, patient.password, function (err, isMatch) {
		if (err) return done(err, false);
		if (!isMatch) return done(null, false);
		let user = patient._doc;
		user.access = access.patient;
		return done(null, { ...user, role: "patient" });
	});
});

const tokenVerification = new jwtStrategy(jwtOptions, async function (
	// req,
	payload,
	done,
) {
	// console.log(payload);
	if (payload.role === "superadmin") {
		var user = await Admin.findById(payload.id);
		var user_access = access.superadmin;
	} else if (payload.role === "admin") {
		var user = await Admin.findById(payload.id);
		var user_access = access.admin;
	} else if (payload.role === "doctor") {
		var user = await Doctor.findById(payload.id);
		if (user.isVerified == false) return done(null, false);
		var user_access = access.doctor;
	} else if (payload.role === "patient") {
		var user = await Patient.findById(payload.id);
		var user_access = access.patient;
	} else {
		return done(null, 'ROLE_INVALID');
	}
	if (!user) {
		return done(null, false);
	}
	let userDetails = user._doc;
	userDetails.access = user_access;
	userDetails.role = payload.role;
	return done(null, { ...userDetails });
});

passport.use('verifyToken', tokenVerification);
passport.use('adminLogin', adminLogin);
passport.use('doctorLogin', doctorLogin);
passport.use('patientLogin', patientLogin);
