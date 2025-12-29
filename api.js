// Firebase Sozlamalari
const firebaseConfig = {
    apiKey: "AIzaSyA7VLHdjPqf_tobSiBczGbN8H7YlFwq9Wg",
    authDomain: "magnetic-alloy-467611-u7.firebaseapp.com",
    databaseURL: "https://magnetic-alloy-467611-u7-default-rtdb.firebaseio.com",
    projectId: "magnetic-alloy-467611-u7",
    storageBucket: "magnetic-alloy-467611-u7.firebasestorage.app",
    messagingSenderId: "589500919880",
    appId: "1:589500919880:web:7b82d037c5e7396d51687d"
};

// Firebase-ni ishga tushirish
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const tg = window.Telegram.WebApp;

// Foydalanuvchi ma'lumotlarini olish (Telegramdan)
const userId = tg.initDataUnsafe?.user?.id || "guest_id";

// Sahifa yuklanganda mavjud API kalitni bazadan qidirish
document.addEventListener('DOMContentLoaded', () => {
    db.ref('user_apis/' + userId).once('value', (snap) => {
        if (snap.exists()) {
            displayExistingAPI(snap.val().apiKey);
        }
    });
});

// Yangi API kalit yaratish funksiyasi
function generateAPI() {
    // Tasodifiy SK- bilan boshlanadigan 16 belgili kalit
    const newKey = 'SK-' + Math.random().toString(36).substr(2, 16).toUpperCase();
    
    db.ref('user_apis/' + userId).set({
        apiKey: newKey,
        createdAt: new Date().toISOString()
    }).then(() => {
        displayExistingAPI(newKey);
    }).catch(error => {
        alert("Xatolik yuz berdi: " + error.message);
    });
}

// API kalitni va SDK kodini ekranda ko'rsatish funksiyasi
function displayExistingAPI(key) {
    const genBtn = document.getElementById('gen-btn');
    const keyDisplay = document.getElementById('key-display');
    const apiKeyText = document.getElementById('api-key-text');
    const sdkSection = document.getElementById('sdk-section');
    const sdkCodeBox = document.getElementById('sdk-init-code');

    if (genBtn) genBtn.style.display = 'none';
    if (keyDisplay) keyDisplay.style.display = 'block';
    if (apiKeyText) apiKeyText.innerText = key;
    if (sdkSection) sdkSection.style.display = 'block';

    // Foydalanuvchi o'z saytiga qo'yishi kerak bo'lgan tayyor kod
    const sdkSnippet = `<div id="star-market-list"></div>
<script src="https://azizbek2222.github.io/star-sdk.js"></script>
<script>
  StarMarket.init({
    apiKey: "${key}",
    container: "#star-market-list"
  });
</script>`;

    if (sdkCodeBox) {
        sdkCodeBox.innerText = sdkSnippet;
    }
}

// Kalitni nusxalab olish funksiyasi (ixtiyoriy, agar tugma bo'lsa)
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Nusxalandi!");
    });
}
