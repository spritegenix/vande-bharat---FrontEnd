// vande-bharat---FrontEnd/public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// TODO: Replace with your actual Firebase configuration
// These values are typically loaded from environment variables in your main app,
// but for the service worker, you need to hardcode them or use a build step
// to inject them. For simplicity, placeholders are used here.
const firebaseConfig = {
  apiKey: "AIzaSyBp6D6kRdveXGgdQGkpLC4ZArz5HMNM7sw",
  authDomain: "vande-bharat-be918.firebaseapp.com",
  projectId: "vande-bharat-be918",
  storageBucket: "vande-bharat-be918.firebasestorage.app",
  messagingSenderId: "612084820870",
  appId: "1:612084820870:web:e960b7969664e54fd75a07",
  measurementId: "G-WQEXEC75K2",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const notificationTitle = payload.notification.title || "New Notification";
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/favicon.ico", // You might want a specific icon for notifications
    data: payload.data, // Custom data from the payload
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
