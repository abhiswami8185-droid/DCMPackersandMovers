# DCM PACKERS & MOVERS — CLIENT FIREBASE DEPLOYMENT GUIDE

This document describes how to connect the DCM Digital Relocation Platform to DCM's official Google Cloud / Firebase production account.

---

## 1. Prerequisites (Client Account)
1. Ensure DCM owns a Google Cloud / Firebase console account with billing enabled.
2. In the Firebase console (https://console.firebase.google.com), create a new project:
   - **Project Name:** `dcm-packers-movers` (or preferred client project name)
   - Enable **Cloud Firestore** in production mode.
   - Enable **Firebase Authentication**.
   - Enable **Firebase Storage**.
   - Enable **Cloud Functions** (requires Blaze pay-as-you-go tier).

---

## 2. Authentication Setup
In the Firebase Authentication tab:
- **Sign-in method 1:** Email/Password (for Admin, Managers, and Field Staff).
- **Sign-in method 2:** Google Sign-In (for Customer Web & Customer Portal).
- Add the production domain (e.g. `dcmpackersmovers.com`) to **Authorized domains**.

---

## 3. Firestore Database & Security Rules
1. In the Firebase Console, go to **Firestore Database** -> **Rules**.
2. Copy the contents of the root `firestore.rules` file in this repository and paste them into the console editor.
3. Click **Publish**.

---

## 4. Storage Security Rules
1. In the Firebase Console, go to **Storage** -> **Rules**.
2. Copy the contents of the root `storage.rules` file and paste them into the console editor.
3. Click **Publish**.

---

## 5. Web App Configuration (Environment Variables)
In the Firebase Console -> **Project Settings** -> **General** -> **Your apps** -> **Add Web App**:
Copy the generated configuration keys and set them in your hosting environment (or `.env` file):

```bash
VITE_APP_BACKEND_PROVIDER="firebase"
VITE_FIREBASE_API_KEY="AIzaSyYourActualClientKey"
VITE_FIREBASE_AUTH_DOMAIN="dcm-packers-movers.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="dcm-packers-movers"
VITE_FIREBASE_STORAGE_BUCKET="dcm-packers-movers.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789012"
VITE_FIREBASE_APP_ID="1:123456789012:web:abcdef123456"

# Payment Gateway (Razorpay India Client Production Key)
VITE_RAZORPAY_KEY_ID="rzp_live_your_actual_key"
```

---

## 6. Verification Checklist
- [ ] Sign in as Customer via Google.
- [ ] Submit a Quote inquiry and generate a Booking ID.
- [ ] Log in to Admin Command Center using Admin credentials.
- [ ] Change a Move stage from `in_transit` to `destination_city_reached` and verify real-time update in customer tracker.
- [ ] Test the Staff Mobile App simulation and record a digital Proof of Delivery with customer signature.
