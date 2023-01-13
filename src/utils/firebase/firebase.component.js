import { initializeApp } from 'firebase/app';
import {
  getAuth,
  // signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, getDocs, query } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBln0QHfI5IXcXVzHG0LPvgSHTZyYkf65c",
  authDomain: "crwn-clothing-wb.firebaseapp.com",
  projectId: "crwn-clothing-wb",
  storageBucket: "crwn-clothing-wb.appspot.com",
  messagingSenderId: "216442051379",
  appId: "1:216442051379:web:7bc30b6bc1ceb9d066fc46"
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

export const db = getFirestore()

// bizdagi data larni firestore ga set qilish un kerak bo`ladigan function bu func faqat 1marta ishlasa yetadi(Data larni firestorega set qilsa buldi)
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey); // collectionKey ni set qilamiz
  const batch = writeBatch(db); // add qilish un db hozirlaymiz

  objectsToAdd.forEach((object) => { //bizdagi data ni mep qilamiz va har birini db ga joylaymiz
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

//  firebasedagi datalarni json qilib get qilib olish un helper func
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories'); // collectionni nomi ostida silkani olish
  const q = query(collectionRef); // silka buticha zapros qilish un

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items; // {title:'Hats',items:[{},{}]} shunaqa edi
    // kegin Hats:[{},{}] bo`lib qoldi ya`ni Hats degan qiymatga arrayimiz biriktirilib quyildi
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async ( //authenticated bo`lgan userlarni firestore db ga set qiladi
  userAuth,
  additionalInformation = {} // displayName kirgizish un kerak createAuthUserWithEmailAndPassword bilan sign up qilganda
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid); // userni db dagi ref silkasini ko`rsatadi

  const userSnapshot = await getDoc(userDocRef); // userni db da bor yoki yuqligini aniqlash un kere
  // db ga userni set qilamiz
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  // agar user bulsa shunchaki silkasini return
  return userDocRef;
};
// sign up qilamiz email password bn
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// sign in qilamiz email password bn
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
// logOut qilish un kerak
export const signOutUser = async () => await signOut(auth);

// user Authenticated bo`lsa yoki log out qilsa shuni eshitib turadigan helper listener function 
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);