/* ================================================
   PRIMECARE — db.js
   Mock Database using localStorage
   Acts as a real database for the demo
   ================================================ */

var PrimeCareDB = {

  /* ── USERS ──────────────────────────────────── */

  // Get all users
  getUsers: function() {
    var users = localStorage.getItem('pc_users');
    return users ? JSON.parse(users) : [];
  },

  // Save all users
  saveUsers: function(users) {
    localStorage.setItem('pc_users', JSON.stringify(users));
  },

  // Register a new user
  registerUser: function(name, username, email, password) {
    var users = this.getUsers();

    // Check if email already exists
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        return { success: false, message: 'Email already registered.' };
      }
      if (users[i].username === username) {
        return { success: false, message: 'Username already taken.' };
      }
    }

    var newUser = {
      id:        'P-00' + (users.length + 1),
      name:      name,
      username:  username,
      email:     email,
      password:  password,
      createdAt: new Date().toISOString(),
      avatar:    name.charAt(0).toUpperCase(),
    };

    users.push(newUser);
    this.saveUsers(users);
    return { success: true, user: newUser };
  },

  // Login user
  loginUser: function(emailOrUsername, password) {
    var users = this.getUsers();
    for (var i = 0; i < users.length; i++) {
      var u = users[i];
      if ((u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password) {
        // Save session
        localStorage.setItem('pc_session', JSON.stringify(u));
        return { success: true, user: u };
      }
    }
    return { success: false, message: 'Invalid email or password.' };
  },

  // Get current logged in user
  getCurrentUser: function() {
    var session = localStorage.getItem('pc_session');
    return session ? JSON.parse(session) : null;
  },

  // Logout
  logout: function() {
    localStorage.removeItem('pc_session');
  },

  // Check if logged in
  isLoggedIn: function() {
    return this.getCurrentUser() !== null;
  },

  // Update user profile
  updateUser: function(updatedData) {
    var users   = this.getUsers();
    var current = this.getCurrentUser();
    if (!current) return { success: false };

    for (var i = 0; i < users.length; i++) {
      if (users[i].id === current.id) {
        users[i] = Object.assign(users[i], updatedData);
        this.saveUsers(users);
        localStorage.setItem('pc_session', JSON.stringify(users[i]));
        return { success: true, user: users[i] };
      }
    }
    return { success: false };
  },

  // Update password
  updatePassword: function(newPassword) {
    return this.updateUser({ password: newPassword });
  },

  /* ── APPOINTMENTS ───────────────────────────── */

  // Get appointments for current user
  getAppointments: function() {
    var current = this.getCurrentUser();
    if (!current) return [];
    var key  = 'pc_appts_' + current.id;
    var data = localStorage.getItem(key);
    if (data) return JSON.parse(data);

    // Default demo appointments for first login
    var demo = [
      {
        id:        'APT-2026-0018',
        title:     'Back Check Up',
        doctor:    'Dr. John Buena',
        service:   'Orthopedics',
        date:      'January 2, 2026',
        startTime: '10:00 AM',
        endTime:   '11:00 AM',
        mode:      'Face-to-Face',
        reason:    'I can\'t stretch my back.',
        status:    'complete',
        fee:       800,
        payMethod: 'GCash',
        txnId:     'TXN-88421',
        notes:     'Lumbar muscle stiffness. Physical therapy recommended.',
        createdAt: '2025-12-29T08:00:00.000Z',
      },
      {
        id:        'APT-2026-0019',
        title:     'Tooth Extraction',
        doctor:    'Dr. Ramon Gole',
        service:   'Dental Care',
        date:      'April 15, 2025',
        startTime: '2:00 PM',
        endTime:   '3:00 PM',
        mode:      'Face-to-Face',
        reason:    'Painful wisdom tooth.',
        status:    'complete',
        fee:       600,
        payMethod: 'Card',
        txnId:     'TXN-77312',
        notes:     'Wisdom tooth extracted successfully.',
        createdAt: '2025-04-10T08:00:00.000Z',
      },
    ];
    localStorage.setItem(key, JSON.stringify(demo));
    return demo;
  },

  // Save appointments
  saveAppointments: function(appointments) {
    var current = this.getCurrentUser();
    if (!current) return;
    var key = 'pc_appts_' + current.id;
    localStorage.setItem(key, JSON.stringify(appointments));
  },

  // Add a new appointment
  addAppointment: function(apptData) {
    var appointments = this.getAppointments();
    var newAppt = {
      id:        'APT-' + Date.now(),
      title:     apptData.title,
      doctor:    apptData.doctor,
      service:   apptData.service,
      date:      apptData.date,
      startTime: apptData.startTime,
      endTime:   apptData.endTime,
      mode:      apptData.mode,
      reason:    apptData.reason,
      status:    'pending',
      fee:       apptData.fee,
      payMethod: apptData.payMethod,
      txnId:     'TXN-' + Math.floor(Math.random() * 90000 + 10000),
      notes:     '',
      createdAt: new Date().toISOString(),
    };
    appointments.unshift(newAppt);
    this.saveAppointments(appointments);
    return newAppt;
  },

  // Cancel appointment
  cancelAppointment: function(apptId) {
    var appointments = this.getAppointments();
    for (var i = 0; i < appointments.length; i++) {
      if (appointments[i].id === apptId) {
        appointments[i].status = 'cancelled';
        break;
      }
    }
    this.saveAppointments(appointments);
  },

  // Get single appointment
  getAppointment: function(apptId) {
    var appointments = this.getAppointments();
    for (var i = 0; i < appointments.length; i++) {
      if (appointments[i].id === apptId) return appointments[i];
    }
    return null;
  },

  /* ── NOTIFICATIONS ──────────────────────────── */

  getNotifications: function() {
    var current = this.getCurrentUser();
    if (!current) return [];
    var key  = 'pc_notifs_' + current.id;
    var data = localStorage.getItem(key);
    if (data) return JSON.parse(data);

    // Default notifications
    var defaults = [
      { id:'N001', type:'appointment', title:'Appointment Request Submitted', message:'Your appointment with Dr. John Buena has been submitted. Please wait for confirmation.', time:'10:30 AM', read: false },
      { id:'N002', type:'message',     title:'New Message from Dr. John Buena', message:'Dr. Buena has sent you a message regarding your follow-up appointment.', time:'9:15 AM', read: false },
      { id:'N003', type:'appointment', title:'Appointment Completed',  message:'Your January 2 appointment has been completed. View your appointment details.', time:'Yesterday', read: true },
    ];
    localStorage.setItem(key, JSON.stringify(defaults));
    return defaults;
  },

  addNotification: function(type, title, message) {
    var notifs  = this.getNotifications();
    var current = this.getCurrentUser();
    if (!current) return;
    notifs.unshift({
      id:      'N' + Date.now(),
      type:    type,
      title:   title,
      message: message,
      time:    'Just now',
      read:    false,
    });
    localStorage.setItem('pc_notifs_' + current.id, JSON.stringify(notifs));
  },

  getUnreadCount: function() {
    var notifs = this.getNotifications();
    return notifs.filter(function(n) { return !n.read; }).length;
  },

  /* ── SEED DEFAULT USERS ─────────────────────── */
  seedAdmin: function() {
    var users      = this.getUsers();
    var hasAdmin   = false;
    var hasPatient = false;

    for (var i = 0; i < users.length; i++) {
      if (users[i].email === 'admin@primecare.ph')   hasAdmin   = true;
      if (users[i].email === 'patient@primecare.ph') hasPatient = true;
    }

    // Seed admin account
    if (!hasAdmin) {
      users.push({
        id:        'ADMIN-001',
        name:      'Admin',
        username:  'admin',
        email:     'admin@primecare.ph',
        password:  'admin123',
        role:      'admin',
        avatar:    'A',
        createdAt: new Date().toISOString(),
      });
    }

    // Seed demo patient account
    if (!hasPatient) {
      users.push({
        id:        'P-001',
        name:      'Adrian Lei Frio',
        username:  'adrianfrio',
        email:     'patient@primecare.ph',
        password:  'patient123',
        role:      'patient',
        avatar:    'A',
        contact:   '+63 912 345 6789',
        address:   'Las Pinas City, Metro Manila',
        blood:     'O+',
        createdAt: new Date().toISOString(),
      });
    }

    this.saveUsers(users);
  },

};

// Seed default users on every page load
PrimeCareDB.seedAdmin();
