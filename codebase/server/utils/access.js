const superadmin = {
    createAdmin : true,
    listAdmins : true,
    getAdmin : true,
    updateAdmin : true, 
    deleteAdmin : true,
    
    createDoctor : true,
    listDoctors : true, 
    getDoctor : true,
    updateDoctor : true, 
    deleteDoctor : true,
    verifyDoctor : true, 
    removeDoctor : true,

    createPatient : false,
    listPatients : true, 
    getPatient : true, 
    updatePatient : false, 
    deletePatient : false,

    createAppointment : false,
    listAppointments : true,
    getAppointment : true,
    updateAppointment : false, 
    deleteAppointment : false,
};

const admin = {
    createAdmin : false,
    listAdmins : true,
    getAdmin : false,
    updateAdmin : false, 
    deleteAdmin : false,
    
    createDoctor : true,
    listDoctors : true, 
    getDoctor : true,
    updateDoctor : true, 
    deleteDoctor : true,
    verifyDoctor : true, 
    removeDoctor : true,

    createPatient : false,
    listPatients : true, 
    getPatient : true, 
    updatePatient : false, 
    deletePatient : false,

    createAppointment : false,
    listAppointments : true,
    getAppointment : true,
    updateAppointment : false, 
    deleteAppointment : false,
};


const doctor  = {
    createAdmin : false,
    listAdmins : false,
    getAdmin : false,
    updateAdmin : false, 
    deleteAdmin : false,
    
    createDoctor : false,
    listDoctors : true, 
    getDoctor : false,
    updateDoctor : false, 
    deleteDoctor : false,
    verifyDoctor : false, 
    removeDoctor : false,

    createPatient : false,
    listPatients : true, 
    getPatient : true, 
    updatePatient : true, 
    deletePatient : false,

    createAppointment : true,
    listAppointments : true,
    getAppointment : true,
    updateAppointment : true, 
    deleteAppointment : false,
};

const patient = {
    createAdmin : false,
    listAdmins : false,
    getAdmin : false,
    updateAdmin : false, 
    deleteAdmin : false,
    
    createDoctor : false,
    listDoctors : true, 
    getDoctor : false,
    updateDoctor : false, 
    deleteDoctor : false,
    verifyDoctor : false, 
    removeDoctor : false,

    createPatient : true,
    listPatients : false, 
    getPatient : false, 
    updatePatient : false, 
    deletePatient : false,

    createAppointment : true,
    listAppointments : true,
    getAppointment : true,
    updateAppointment : false, 
    deleteAppointment : true,
};

module.exports = {
    superadmin,
    admin,
    doctor,
    patient
};