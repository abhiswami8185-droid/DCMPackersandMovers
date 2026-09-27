import { FirebaseBackendProvider } from './firebaseProvider';
import { MockBackendProvider } from './mockProvider';
import { BackendProvider } from './types';

// Check environment switch: "mock" (default for development) or "firebase" (for production deployment)
const backendType = (import.meta.env.VITE_APP_BACKEND_PROVIDER || 'mock').toLowerCase();

let providerInstance: BackendProvider;

if (backendType === 'firebase') {
  providerInstance = new FirebaseBackendProvider();
} else {
  providerInstance = new MockBackendProvider();
}

export const backend: BackendProvider = providerInstance;
export * from './types';
