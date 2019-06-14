// The Cloud Functions for Firebase SDK to create Cloud Functins and setup triggers
const functions = require('firebase-functions')

// The Firebase Admin SDK to access the Firebase RealTime Database
const admin = require('firebase-admin')

admin.initializeApp()

exports.addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query.text
  const snapshot = await admin
    .database()
    .ref('/messages')
    .push({ original: original })

  res.redirect(303, snapshot.reftoString())
})
