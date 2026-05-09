const hasFirebaseConfig = () => {
  const config = window.firebaseConfig || {};
  return Boolean(config.apiKey && !String(config.apiKey).startsWith("PASTE_") && config.projectId && !String(config.projectId).startsWith("PASTE_"));
};

window.PortfolioFirebaseReady = (async () => {
  if (!hasFirebaseConfig()) {
    return {
      enabled: false,
      reason: "Firebase config is not set. Edit firebase-config.js with your Firebase Web App values."
    };
  }

  const appModule = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
  const firestoreModule = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js");
  const authModule = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js");

  const app = appModule.initializeApp(window.firebaseConfig);
  const db = firestoreModule.getFirestore(app);
  const auth = authModule.getAuth(app);
  const contentRef = firestoreModule.doc(db, "portfolio", "content");

  const getPortfolioData = async () => {
    const snapshot = await firestoreModule.getDoc(contentRef);
    return snapshot.exists() ? snapshot.data() : null;
  };

  const savePortfolioData = async (data) => {
    await firestoreModule.setDoc(contentRef, {
      ...data,
      updatedAt: firestoreModule.serverTimestamp()
    }, { merge: true });
  };

  const signIn = (email, password) => authModule.signInWithEmailAndPassword(auth, email, password);
  const signOut = () => authModule.signOut(auth);
  const onAuthChange = (callback) => authModule.onAuthStateChanged(auth, callback);

  return {
    enabled: true,
    auth,
    db,
    getPortfolioData,
    savePortfolioData,
    signIn,
    signOut,
    onAuthChange
  };
})();
