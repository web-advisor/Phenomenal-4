const { isEmail } = require("validator");
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    clinic: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, 'INVALID_EMAIL']
    },
    profilePic: {
        data: Buffer,
        contentType: String,
    },
    // address: {
    //     firstLine: {
    //         type: String,
    //         required: true
    //     },
    //     secondLine: {
    //         type: String,
    //     },
    //     city: {
    //         type: String,
    //         required: true,
    //     },
    //     state: {
    //         type: String,
    //         required: true
    //     },
    //     pin: {
    //         type: String,
    //         required: true
    //     },
    //     country: {
    //         type: String,
    //     },
    // },
    address: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true   
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    clinicTime: {
        openTime: {
            type: String,
            required: true,
        },
        closeTime: {
            type: String,
            required: true,
        }
    },
    degree: {
        type: String,
        required: true,
    },
    spec: {
        type: String,
    },
    status: {
        type: Boolean,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    fees:{
        type:Number,
        required: true
    },
    lastAppointment: {
        type: String,
        required: true,
    },
    tokenNo : {
        type: Number,
        default : 0
    },
    password: {
        type: String,
        required: true
    },
    jwtToken: {
        type: String,
    }
}, {
    timestamps: true
});
doctorSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Doctor", doctorSchema);