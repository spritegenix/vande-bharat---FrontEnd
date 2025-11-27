"use client";

import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useAuth } from "@clerk/nextjs";
import { useAuthAxios } from "@/lib/axios";
import { MessagePayload } from "firebase/messaging";
import { saveFcmToken, removeFcmToken } from "@/queries/fcm.api";

export const firebaseConfig = {
  // Keep only one definition and export it
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig); // Export initialized app globally
export const messagingInstance = getMessaging(firebaseApp); // Export messaging instance too

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

export const useFcmToken = () => {
  const { userId, isSignedIn } = useAuth();
  const axiosAuth = useAuthAxios(); // Using the correct hook name and import path

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && isSignedIn && userId) {
      const registerServiceWorkerAndToken = async () => {
        try {
          // Register service worker
          const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

          // Request permission for notifications
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            const currentToken = await getToken(messagingInstance, { vapidKey: VAPID_KEY }); // Use exported messagingInstance
            if (currentToken) {
              // Send token to your backend
              const deviceInfo = getDeviceInfo();
              await saveFcmToken(axiosAuth, { token: currentToken, deviceInfo });
            }
          }

          // The onMessage listener is already set up using messagingInstance globally,
          // so no need to duplicate it here within the useEffect for token registration.
          // The global messagingInstance.onMessage will handle foreground messages.
        } catch (error) {
          // Error during FCM token retrieval or service worker registration
        }
      };

      registerServiceWorkerAndToken();

      // Cleanup on unmount or user sign out (optional: remove token from backend)
      return () => {
        // You might want to remove the token from the backend when a user signs out
        // However, it's often handled by setting an 'isActive' flag on the backend
        // or by having the backend periodically clean up old tokens.
        // For simplicity, we'll omit explicit token removal here, relying on
        // backend mechanisms or new token registration on next login.
      };
    }
  }, [userId, isSignedIn, axiosAuth]);

  // Helper function to get device information
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    let os = "Unknown";
    let browser = "Unknown";
    let version = "Unknown";

    // OS detection
    if (userAgent.includes("Win")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "macOS";
    else if (userAgent.includes("Linux")) os = "Linux";
    else if (userAgent.includes("Android")) os = "Android";
    else if (userAgent.includes("iOS")) os = "iOS";

    // Browser detection
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) browser = "Chrome";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Edge";
    else if (userAgent.includes("Opera") || userAgent.includes("OPR")) browser = "Opera";

    // Version (simplified)
    const browserVersionMatch = userAgent.match(
      /(Chrome|Firefox|Safari|Edge|Opera|OPR)\/(\d+\.\d+)/,
    );
    if (browserVersionMatch && browserVersionMatch[2]) {
      version = browserVersionMatch[2];
    }

    return { os, browser, version };
  };
};
