const functions = require('firebase-functions')
const admin = require('firebase-admin')
try { admin.initializeApp() } catch (e) { } // You do that because the admin SDK can only be initialized once.
const nodemailer = require('nodemailer')
const gmailEmail = encodeURIComponent(functions.config().gmail.email)
const gmailPassword = encodeURIComponent(functions.config().gmail.password)
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`)

exports = module.exports = functions.auth.user().onDelete((userMetadata, context) => {
  const uid = userMetadata.uid
  const email = userMetadata.email
  const displayName = userMetadata.displayName
  const provider = userMetadata.providerData ? userMetadata.providerData[0] : {}
  const providerId = provider.providerId ? provider.providerId.replace('.com', '') : provider.providerId

  console.log(userMetadata.providerData)
  console.log(userMetadata)
  console.log(context)

  let promises = []

  const mailOptions = {
    from: `"Tarik Huber" <${gmailEmail}>`,
    to: email,
    subject: `Bye!`,
    text: `Hey ${displayName || ''}!, We confirm that we have deleted your React Most Wanted account.`
  }

  const sendEmail = mailTransport.sendMail(mailOptions).then(() => {
    console.log('Account deletion confirmation email sent to:', email)
  })

  const deleteUser = admin.database().ref(`/users/${uid}`).remove()

  const usersCount = admin.database()
    .ref(`/users_count`)
    .transaction(current => (current || 0) - 1)

  if (providerId) {
    promises.push(
      admin.database()
        .ref(`/provider_count/${providerId}`)
        .transaction(current => (current || 0) - 1)
    )
  }

  promises.push(sendEmail, deleteUser, usersCount)

  return Promise.all(promises)
})
