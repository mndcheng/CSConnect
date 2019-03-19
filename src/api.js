
const headers = new Headers();
headers.set('Content-Type', 'application/JSON');

export function signIn(cred, {getFirestore, getFirebase}) {
   const firestore = getFirestore();
   const firebase = getFirebase();
   return firebase.auth().signInWithEmailAndPassword(
    cred.email,
    cred.password
   )
   .then(authUser => 
    firestore.collection("User").doc(authUser.user.uid).get())
   .then(user => {
      if (user.exists)
         return {...user.data(), id: user.id };
      else {
         Promise.reject(user);
      }
   })
}

export function getAdminResources({getFirestore, getFirebase}) {
   const firestore = getFirestore();
   return firestore.collection("Resource")
   .orderBy('numClicks', 'desc')
   .orderBy('whenAdded', 'asc')
   .get()
   .then((resourceDoc) => {
      const resArr = resourceDoc.docs.map(resource => { 
       return { ...resource.data(), id: resource.id } });
      return resArr;
   })
}

export function getResources({getFirestore, getFirebase}) {
   const firestore = getFirestore();
   return firestore.collection("Resource")
   .where('show', '==', true)
   .orderBy('numClicks', 'desc')
   .orderBy('whenAdded', 'asc')
   .get()
   .then((resourceDoc) => {
      const resArr = resourceDoc.docs.map(resource => { 
       return { ...resource.data(), id: resource.id } });
      return resArr;
   })
}

export function addResource(resource, {getFirestore, getFirebase}) {
   const firestore = getFirestore();
   return firestore.collection("Resource").add({
      ...resource,
      whenAdded: new Date(),
      show: true
   })
   .then(resourceDoc => 
      firestore.collection("Resource").doc(resourceDoc.id).get()
   )
   .then(resourceFromCollection => resourceFromCollection.data());
}

export function postPrs(user, {getFirestore, getFirebase}) {
   const firestore = getFirestore();
   const firebase = getFirebase();
   return firebase.auth()
   .createUserWithEmailAndPassword(user.email, user.password)
   .then((authUser) => firestore.collection("User").doc(authUser.user.uid).set({
      ...user,
      whenAdded: Date()
   }))
   .then(() => signIn(user, {getFirestore, getFirebase}));
}

export function addClick(numClicks, click, {getFirestore, getFirebase}) {
   const firestore = getFirestore();
   const resourceDocRef = firestore.collection("Resource").doc(click.resourceId);
   return firestore.collection("Click").add({
      ...click,
      whenAdded: new Date()
   }).then(rsp => {
      return firestore.runTransaction(transaction =>
         transaction.get(resourceDocRef)
         .then(resourceDoc => {
         if (!resourceDoc.exists)
            throw ["Resource could be found"]

         const newNumClicks = resourceDoc.data().numClicks + 1;
         transaction.update(resourceDocRef, {
            numClicks: newNumClicks
         });
      }))
   })
}

export function checkCnvIsNew(users, {getFirestore, getFirebase}) {
   const firestore = getFirestore();
   return firestore.collection("Conversation")
    .where("user1", '==', users.user1)
    .where("user2", '==', users.user2)
    .get()
    .then(rsp => {
      if (rsp.docs.length)
         return Promise.reject(["Conversation with this user already exists"]);
      return firestore.collection("Conversation")
      .where("user1", '==', users.user2)
      .where("user2", '==', users.user1)
      .get()
      .then(rsp => {
      if (rsp.docs.length)
         return Promise.reject(["Conversation with this user already exists"]);
      return checkUsersEmailCorrect(users, getFirestore)
    })
    })
}

export function checkUsersEmailCorrect(users, getFirestore) {
   const firestore = getFirestore();
   return firestore.collection("User").where("email", "==", users.user2).get()
   .then(rsp => {
      if (rsp.docs.length) 
         return addCnv(users, getFirestore)
      return Promise.reject([`Could not find user with email: ${users.user2}`]);
   });
}
export function addCnv(users, getFirestore) {
   const firestore = getFirestore();
   return firestore.collection("Conversation").add({
      user1: users.user1,
      user2: users.user2,
      lastMessage: null,
   }).then(rsp => {
      return firestore.collection("Conversation").doc(rsp.id)
      .get()
      .then(cnv => cnv.data());
   });
}

export function getCnvsUser1(userEmail, getFirestore) {
   const firestore = getFirestore();
   return firestore.collection("Conversation")
    .where("user1", '==', userEmail)
    .get()
    .then(cnvsDocs => {
    const cnvArr = cnvsDocs.docs.map(cnv => { 
    return { ...cnv.data(), id: cnv.id } });;
    return cnvArr;
    });
}

export function getCnvsUser2(userEmail, getFirestore) {
   const firestore = getFirestore();
   return firestore.collection("Conversation")
    .where("user2", '==', userEmail)
    .get()
    .then(cnvsDocs => {
    const cnvArr = cnvsDocs.docs.map(cnv => { 
    return { ...cnv.data(), id: cnv.id } });;
    return cnvArr;
    });
}

export function addMsg(cnvId, msg, getFirestore) {
   const firestore = getFirestore();
   var now = new Date();
   var docRef = firestore.collection("Conversation")
   .doc(cnvId)
   return docRef.collection("Message").add({
      ...msg,
      whenAdded: now
    })
    .then(() => docRef.set({
       lastMessage: now
    }, { merge: true }))
    .then(() => getMsgs(cnvId, getFirestore));
}

export function getMsgs(cnvId, getFirestore) {
   const firestore = getFirestore();
   return firestore.collection("Conversation")
   .doc(cnvId).collection("Message")
   .orderBy("whenAdded", "desc")
   .get()
   .then(msgsDocs => {
      const msgArr = msgsDocs.docs.map(msg => { 
         return { ...msg.data(), id: msg.id } });;
         return msgArr;
   });
}

export function putProfile(profile, id, oldPwd, {getFirestore, getFirebase}) {
   const firestore = getFirestore();
   const user = firestore.collection("User").doc(id);
   const newInfo = { year: profile.year, courses: profile.courses };

   if (profile.newPwd) {
      return user.get()
      .then(rsp => {
         if (!profile.oldPwd) {
            return Promise.reject(["No old password provided."]);
         }
         else if (profile.oldPwd !== oldPwd) {
            return Promise.reject(["Old password mismatch."]);
         }
         else {
            return user.update({ 
               year: profile.year, 
               courses: profile.courses, 
               password: profile.newPwd 
            });
         }
      })
   }
   else {
      return user.update({ year: profile.year, courses: profile.courses })
   }
}

export function putResource(resource, { getFirestore, getFirebase }) {
   const firestore = getFirestore();
   const rsrc = firestore.collection("Resource").doc(resource.id);
   const display = resource.show;

   return rsrc.update({ show: !display });
}


/**
 * @param {string} errTag
 * @param {string} lang
 */
// export function errorTranslate(errTag, lang = 'en') {
//    return errMap[lang][errTag] || 'Unknown Error!';
// }