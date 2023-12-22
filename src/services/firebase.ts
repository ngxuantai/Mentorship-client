import * as firebase from "firebase/app";
import "firebase/auth";
import * as authService from "firebase/auth";
import * as databaseService from "firebase/database";
import * as firestoreService from "firebase/firestore";
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseConfig from "../config/firebase";

class Firebase {
  db: firestoreService.Firestore;
  realtimeDb: databaseService.Database;
  storage: FirebaseStorage;
  auth: authService.Auth;
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.db = firestoreService.getFirestore();
    this.storage = getStorage();
    this.auth = authService.getAuth();
    this.realtimeDb = databaseService.getDatabase();
  }
  // AUTH ACTIONS ------------

  createAccount = async (email, password) => {
    const userCredential = await authService.createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("user", user);
    return user;
  };

  signIn = (email, password) =>
    authService.signInWithEmailAndPassword(this.auth, email, password);

  signInWithGoogle = async () =>
    authService.signInWithPopup(this.auth, authService.GoogleAuthProvider());
  signInWithFacebook = () =>
    authService.signInWithPopup(this.auth, authService.FacebookAuthProvider());

  signOut = () => authService.signOut(this.auth);

  passwordReset = (email) =>
    authService.sendPasswordResetEmail(this.auth, email);

  addUser = (id, user) =>
    firestoreService.setDoc(firestoreService.doc(this.db, "users", id), user);

  getUser = (id) =>
    firestoreService.getDoc(firestoreService.doc(this.db, "users", id));

  passwordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  changePassword = (currentPassword, newPassword) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              resolve("Password updated successfully!");
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  // generateKey = () => firestoreService.getDoc().id;
  onAuthStateChanged = () =>
    new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error("Auth State Changed failed"));
        }
      });
    });

  storeImage = async (folder, imageFile) => {
    const id = Date.now();
    const imageRef = ref(this.storage, `images/${id}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // deleteImage = (id) => this.storage.ref("products").child(id).delete();

  //db realtime
  // Hàm trợ giúp để lấy các sự kiện

  getEvents = async (userId, dayOfWeek) => {
    const snapshot = await databaseService.get(
      databaseService.ref(
        this.realtimeDb,
        "calendars/" + userId + "/" + dayOfWeek
      )
    );
    return snapshot.val() || [];
  };

  // Thêm sự kiện
  addEvent = async (userId, dayOfWeek, event) => {
    const eventId = Date.now();
    const eventRef = databaseService.ref(
      this.realtimeDb,
      "calendars/" + userId + "/" + dayOfWeek
    );

    // Lấy tất cả các sự kiện hiện tại
    const events = await this.getEvents(userId, dayOfWeek);

    // Thêm sự kiện mới vào mảng
    events.push({ ...event, id: eventId });

    // Cập nhật mảng sự kiện trong cơ sở dữ liệu
    await databaseService.set(eventRef, events);

    return eventId;
  };

  // Cập nhật sự kiện
  updateEvent = async (userId, dayOfWeek, eventId, event) => {
    const eventRef = databaseService.ref(
      this.realtimeDb,
      "calendars/" + userId + "/" + dayOfWeek
    );

    // Lấy tất cả các sự kiện hiện tại
    const events = await this.getEvents(userId, dayOfWeek);

    // Tìm sự kiện cần cập nhật và cập nhật nó
    const index = events.findIndex((e) => e.id === eventId);
    if (index !== -1) {
      events[index] = { ...event, id: eventId };

      // Cập nhật mảng sự kiện trong cơ sở dữ liệu
      await databaseService.set(eventRef, events);
    }
  };

  // Xóa sự kiện
  deleteEvent = async (userId, dayOfWeek, eventId) => {
    const eventRef = databaseService.ref(
      this.realtimeDb,
      "calendars/" + userId + "/" + dayOfWeek
    );

    // Lấy tất cả các sự kiện hiện tại
    const events = await this.getEvents(userId, dayOfWeek);

    // Tìm sự kiện cần xóa và xóa nó
    const index = events.findIndex((e) => e.id === eventId);
    if (index !== -1) {
      events.splice(index, 1);

      // Cập nhật mảng sự kiện trong cơ sở dữ liệu
      await databaseService.set(eventRef, events);
    }
  };
  // Theo dõi sự thay đổi của lịch
  observeCalendarChanges(userId, onEventChange) {
    return databaseService.onValue(
      databaseService.ref(this.realtimeDb, "calendars/" + userId),
      (snapshot) => {
        const weekEvents = snapshot.val();
        console.log("calendar", weekEvents);

        onEventChange(weekEvents);
      }
    );
  }
}

const firebaseInstance = new Firebase();

export default firebaseInstance;
