// 1. Firebase Konfiguratsiyasi
const firebaseConfig = {
    apiKey: "AIzaSyA7VLHdjPqf_tobSiBczGbN8H7YlFwq9Wg",
    authDomain: "magnetic-alloy-467611-u7.firebaseapp.com",
    databaseURL: "https://magnetic-alloy-467611-u7-default-rtdb.firebaseio.com",
    projectId: "magnetic-alloy-467611-u7",
    storageBucket: "magnetic-alloy-467611-u7.firebasestorage.app",
    messagingSenderId: "589500919880",
    appId: "1:589500919880:web:7b82d037c5e7396d51687d"
};

// 2. Firebase-ni ishga tushirish
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 3. Telegram WebApp obyektini yuklash
const tg = window.Telegram.WebApp;

// Ilovani tayyor holatga keltirish va kengaytirish
tg.ready();
tg.expand();

// 4. Foydalanuvchi ma'lumotlarini yuklash funksiyasi
function loadUserData() {
    const user = tg.initDataUnsafe?.user;

    // Profil elementlarini olish
    const userNameElem = document.getElementById('user-name');
    const userIdElem = document.getElementById('user-id');
    const userPhotoElem = document.getElementById('user-photo');

    if (user) {
        // Ism va familiyani birlashtirish
        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
        
        // Ekranga chiqarish
        userNameElem.innerText = fullName || "Ismsiz foydalanuvchi";
        userIdElem.innerText = user.id;

        // Profil rasmiga ishlov berish
        if (user.photo_url) {
            userPhotoElem.src = user.photo_url;
        } else {
            // Agar rasm bo'lmasa, ismning bosh harflari bilan avtomat rasm yaratish
            userPhotoElem.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=01875f&color=fff`;
        }

        // 5. Firebase-da ma'lumotlarni saqlash/yangilash
        db.ref('users/' + user.id).update({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            username: user.username || 'noma\'lum',
            photo: user.photo_url || '',
            last_login: new Date().toLocaleString()
        });

    } else {
        // Agar Telegram ichida bo'lmasa (Brauzerda test uchun)
        userNameElem.innerText = "Brauzer Test Foydalanuvchisi";
        userIdElem.innerText = "12345678";
        userPhotoElem.src = "https://ui-avatars.com/api/?name=Test+User&background=01875f&color=fff";
        console.warn("Telegram ma'lumotlari topilmadi. Ilovani Telegram ichida oching.");
    }
}

// 6. Sahifa to'liq yuklanganda funksiyani ishga tushirish
document.addEventListener('DOMContentLoaded', loadUserData);

// Telegram temasi ranglarini body-ga qo'llash (Ixtiyoriy lekin tavsiya etiladi)
document.body.style.backgroundColor = tg.backgroundColor || '#f1f3f4';
document.body.style.color = tg.textColor || '#202124';
