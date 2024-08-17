/* 
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<   Stcript.js  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Author : Ahmed ElSherif
 * Layer  : JavaScript
 *
 */

// إعداد Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const statusElement = document.getElementById('status');
const loaderElement = document.getElementById('loader');

// الدالة التي تقوم بجلب الداتا من Firebase
async function fetchData() {
    loaderElement.style.display = 'block'; // إظهار مؤشر التحميل
    try {
        const snapshot = await database.ref('your/data/path').once('value');
        const data = snapshot.val();
        
        if (data) {
            statusElement.textContent = 'Data found, sending to the other site...';
            statusElement.classList.remove('error');
            statusElement.classList.add('success');
            sendDataToOtherSite(data);
        } else {
            statusElement.textContent = 'No new data found. Retrying...';
            statusElement.classList.remove('success');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        statusElement.textContent = 'Error fetching data. Retrying...';
        statusElement.classList.add('error');
    } finally {
        loaderElement.style.display = 'none'; // إخفاء مؤشر التحميل
    }

    setTimeout(fetchData, 20000); // الانتظار لمدة ٢٠ ثانية قبل الفحص مرة أخرى
}

// الدالة التي ترسل الداتا إلى الموقع الآخر
async function sendDataToOtherSite(data) {
    loaderElement.style.display = 'block'; // إظهار مؤشر التحميل
    try {
        const response = await fetch('https://other-website.com/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ textboxData: data })
        });

        const result = await response.json();
        console.log('Data sent successfully:', result);
        statusElement.textContent = 'Data sent successfully!';
        statusElement.classList.remove('error');
        statusElement.classList.add('success');
    } catch (error) {
        console.error('Error sending data:', error);
        statusElement.textContent = 'Error sending data.';
        statusElement.classList.add('error');
    } finally {
        loaderElement.style.display = 'none'; // إخفاء مؤشر التحميل
    }
}

// بدء عملية الفحص
fetchData();