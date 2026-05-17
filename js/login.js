const OWEN_CRED = {user: 'admin', pass: 'adminowen'};


// Show/hide pages
function showLogin() {
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('adminLoginPage').classList.add('hidden');
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('posPage').classList.add('hidden');
}

function showAdminLogin() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('adminLoginPage').classList.remove('hidden');
}

function showAdminPanel() {
    document.getElementById('adminLoginPage').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    loadUserList();
}

function showPOS(username) {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('posPage').classList.remove('hidden');
    document.getElementById('currentUser').textContent = username;
   localStorage.setItem('loggedInUser', username);
}

// admin login 
function adminLogin() {
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;
    const msg= document.getElementById('adminLoginMsg');

    if (user === OWEN_CRED.user && pass === OWEN_CRED.pass) {
        localStorage.setItem('isAdmin', 'true');
        showAdminPanel();
        msg.textContent = '';
    } else {
        msg.innerHTML = '<div class="error">Wrong admin credentials</div>';
    }
}

function adminLogout() {
    localStorage.removeItem('isAdmin');
    showLogin();
}

// 3. Register User - admin only
function registerUser() {
    const newUser = document.getElementById('newUser').value.trim();
    const newPass = document.getElementById('newPass').value.trim();
    const msg = document.getElementById('registerMsg');

 
    if (!newUser || !newPass) {
        msg.innerHTML = '<div class="error">Fill all fields</div>';
        return;
    }
    let users = JSON.parse(localStorage.getItem('posUsers') || '{}');

    if (users[newUser]) {
        msg.innerHMTL = '<div class="error">Username already exists</div>';
        return;
    }
    users[newUser] = newPass; // Store: {username: password}
    localStorage.setItem('posUsers', JSON.stringify(users));

    msg.innerHTML = '<div class="success"> User' + newUser + 'registered!</div>';
    document.getElementById('newUser').value = '';
    document.getElementById('newPass').value = '';
    loadUserList();
}

// 4. Load user list to admin panel
function loadUserList() {
    const users = JSON.parse(localStorage.getItem('posUsers') || '{}');
    const list = document.getElementById('userList');


    if (Object.keys(users).length === 0) {
        list.innerHTML = 'No users registered yet';
    } else {
        list.innerHTML = Object.keys(users).map(u => `<span>${u}</span>`).join(' ');
    }
}

// 5. POS User Login

function login() {
    const user = document.getElementById('loginUser').value.trem();
    const pass = document.getElementById('loginPass').value.trem();
    const msg = document.getElementById('loginMsg');

    const users = JSON.parse(localStorage.getItem('posUsers') || '{}');

    if (users[user] && users[user] === pass) {
        localStorage.setItem('isLoggedIn', 'yes');
        window.location.href = 'pos.html';
        // showPOS(user);
        // msg.textContent = '';
    } else {
        msg.innerHTML  = '<div class="error">Invalid username or password. Contact admin.</div>';
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    showLogin();
}

// 6. Check if login when open
window.onload = function() {
    if(localStorage.getItem('isAdmin') === 'true') {
        showAdminPanel();
    }else if(localStorage.getItem('loggedInUser')) {
        showPOS(localStorage.getItem('loggedInUser'));
    } else {
        showLogin();
    }
}