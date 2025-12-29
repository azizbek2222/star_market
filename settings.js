const firebaseConfig = {
    apiKey: "AIzaSyA7VLHdjPqf_tobSiBczGbN8H7YlFwq9Wg",
    authDomain: "magnetic-alloy-467611-u7.firebaseapp.com",
    databaseURL: "https://magnetic-alloy-467611-u7-default-rtdb.firebaseio.com",
    projectId: "magnetic-alloy-467611-u7",
    storageBucket: "magnetic-alloy-467611-u7.firebasestorage.app",
    messagingSenderId: "589500919880",
    appId: "1:589500919880:web:7b82d037c5e7396d51687d"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const tg = window.Telegram.WebApp;
tg.ready();

document.addEventListener('DOMContentLoaded', function() {
    const user = tg.initDataUnsafe?.user;

    if (user) {
        const fullName = `${user.first_name} ${user.last_name || ''}`;
        document.getElementById('user-name').innerText = fullName;
        document.getElementById('user-id').innerText = user.id;

        if (user.photo_url) {
            document.getElementById('user-photo').src = user.photo_url;
        } else {
            document.getElementById('user-photo').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=01875f&color=fff`;
        }

        db.ref('users/' + user.id).update({
            name: fullName,
            username: user.username || 'noma'lum',
            last_seen: new Date().toISOString()
        });
    } else {
        document.getElementById('user-name').innerText = "Guest User";
        document.getElementById('user-id').innerText = "12345678";
    }
});
