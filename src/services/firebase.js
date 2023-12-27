import * as firebase from "firebase/app";
import "firebase/auth";
import * as authService from "firebase/auth";
import * as databaseService from "firebase/database";
import * as firestoreService from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseConfig from "../config/firebase";
import { checkAndRemoveExpiredEvents } from "../utils/dataHelper";

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.db = firestoreService.getFirestore();
    this.storage = getStorage();
    this.auth = authService.getAuth();
    this.realtimeDb = databaseService.getDatabase();
  }

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
  changePassword = (currentPassword, newPassword) => {
    const user = this.auth.currentUser;
    console.log("changePassword", user, currentPassword, newPassword);
    const credential = authService.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    // Reauthenticate the user
    return authService
      .reauthenticateWithCredential(user, credential)
      .then(() => {
        // Update the password
        return authService.updatePassword(user, newPassword);
      });
  };

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

  storeFile = async (folder, file, mentorId) => {
    const editName = (mnetorId, fileName) => {
      const lastDotIndex = fileName.lastIndexOf(".");
      let name = "",
        extension = "";

      if (lastDotIndex !== -1) {
        name = fileName.substring(0, lastDotIndex);
        extension = fileName.substring(lastDotIndex + 1);
      } else {
        name = fileName;
      }

      return name + "-" + mnetorId + "." + extension;
    };

    const fileRef = ref(
      this.storage,
      `documents/${editName(mentorId, file.name)}`
    );
    const uploadTask = uploadBytesResumable(fileRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // get file

  //db realtime
  getEvents = async (userId, dayOfWeek) => {
    const snapshot = await databaseService.get(
      databaseService.ref(this.realtimeDb, userId + "/calendars/" + dayOfWeek)
    );
    return snapshot.val() || [];
  };

  addEvent = async (userId, dayOfWeek, event) => {
    const eventId = Date.now();
    const eventRef = databaseService.ref(
      this.realtimeDb,
      userId + "/calendars/" + dayOfWeek
    );

    const events = await this.getEvents(userId, dayOfWeek);

    events.push({ ...event, id: eventId });

    await databaseService.set(eventRef, events);

    return eventId;
  };

  updateEvent = async (userId, dayOfWeek, eventId, event) => {
    const eventRef = databaseService.ref(
      this.realtimeDb,
      userId + "/calendars/" + dayOfWeek
    );

    const events = await this.getEvents(userId, dayOfWeek);

    const index = events.findIndex((e) => e.id === eventId);
    if (index !== -1) {
      events[index] = { ...event, id: eventId };

      await databaseService.set(eventRef, events);
    }
  };

  deleteEvent = async (userId, dayOfWeek, eventId) => {
    const eventRef = databaseService.ref(
      this.realtimeDb,
      userId + "/calendars/" + dayOfWeek
    );

    const events = await this.getEvents(userId, dayOfWeek);

    const index = events.findIndex((e) => e.id === eventId);
    if (index !== -1) {
      events.splice(index, 1);

      await databaseService.set(eventRef, events);
    }
  };

  observeCalendarChanges(userId, onEventChange) {
    return databaseService.onValue(
      databaseService.ref(this.realtimeDb, userId + "/calendars"),
      (snapshot) => {
        const weekEvents = snapshot.val();
        const checkedEvents = checkAndRemoveExpiredEvents(weekEvents);
        console.log("mentor weekEvents", weekEvents);
        this.setUserEvent(userId, checkedEvents);
        onEventChange(weekEvents);
      }
    );
  }
  setUserEvent = async (userId, weekEvents) => {
    const eventRef = databaseService.ref(
      this.realtimeDb,
      `${userId}/calendars`
    );

    // Duyệt qua tất cả các sự kiện trong weekEvents và cập nhật chúng
    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      const dayEvents = weekEvents[dayOfWeek];

      // Cập nhật sự kiện cho ngày trong tuần
      await databaseService.set(
        databaseService.ref(eventRef, `${dayOfWeek}`),
        dayEvents
      );
    }
  };

  getWishlist = async (userId) => {
    const snapshot = await databaseService.get(
      databaseService.ref(this.realtimeDb, userId + "/wishlists/")
    );
    return snapshot.val() || [];
  };
  toggleWishlist = async (userId, mentorId) => {
    const wishlistRef = databaseService.ref(
      this.realtimeDb,
      userId + "/wishlists"
    );
    const wishlist = await this.getWishlist(userId);

    console.log("toggleWishlist", wishlist, mentorId);
    const index = wishlist.findIndex((id) => id === mentorId);

    if (index !== -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(mentorId);
    }

    await databaseService.set(wishlistRef, wishlist);
    return wishlist;
  };
  observeWishlistChanges(userId, onWishlistChange) {
    return databaseService.onValue(
      databaseService.ref(this.realtimeDb, userId + "/wishlists"),
      (snapshot) => {
        const wishlist = snapshot.val();
        onWishlistChange(wishlist);
      }
    );
  }
}

const firebaseInstance = new Firebase();

export default firebaseInstance;
