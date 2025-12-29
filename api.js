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
const userId = tg.initDataUnsafe?.user?.id || "guest_id";

document.addEventListener('DOMContentLoaded', () => {
    db.ref('user_apis/' + userId).once('value', (snap) => {
        if (snap.exists()) {
            displayExistingAPI(snap.val().apiKey);
        }
    });
});

function generateAPI() {
    const newKey = 'SK-' + Math.random().toString(36).substr(2, 11).toUpperCase();
    db.ref('user_apis/' + userId).set({
        apiKey: newKey,
        createdAt: new Date().toISOString()
    }).then(() => {
        displayExistingAPI(newKey);
    });
}

function displayExistingAPI(key) {
    document.getElementById('gen-btn').style.display = 'none';
    document.getElementById('key-display').style.display = 'block';
    document.getElementById('api-key-text').innerText = key;
    document.getElementById('sdk-section').style.display = 'block';
    
    const sdkCode = `
<div id="star-market-list"></div>
<script src="https://azizbek2222.github.io/star-sdk.js"></script>
<script>
  StarMarket.init({
    apiKey: "${key}",
    container: "#star-market-list"
  });
</script>`;
    document.getElementById('sdk-init-code').innerText = sdkCode;
}
