import MUIConfig from 'material-ui-shell'
import getDefaultRoutes from './routes'
import grants from './grants'
import merge from 'base-shell/lib/utils/config'
import { lazy } from 'react'

const defaultUserData = (user) => {
  if (user != null) {
    return {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      uid: user.uid,
      providerData: user.providerData,
      isAuthenticated: true,
    }
  } else {
    return {
      isAuthenticated: false,
    }
  }
}

const isGranted = (auth, grant) => {
  const { grants = [], isAdmin = false } = auth || {}

  if (isAdmin) {
    return true
  }

  return grants && !!grants[grant]
}

const config = {
  getDefaultRoutes,
  containers: {
    LayoutContainer: lazy(() =>
      import('../containers/LayoutContainer/LayoutContainer')
    ),
  },
  components: {
    Menu: lazy(() => import('../containers/FirebaseMenu/FirebaseMenu')),
  },
  auth: {
    persistKey: 'rmw-shell:auth',
    signInURL: '/signin',
    redirectTo: '/dashboard',
    grants,
    onAuthStateChanged: async (user, auth, firebaseApp) => {
      if (user != null) {
        const grantsSnap = await firebaseApp
          .database()
          .ref(`user_grants/${user.uid}`)
          .once('value')
        const isAdminSnap = await firebaseApp
          .database()
          .ref(`admins/${user.uid}`)
          .once('value')

        firebaseApp
          .database()
          .ref(`user_grants/${user.uid}`)
          .on('value', (snap) => {
            auth.updateAuth({ grants: snap.val() })
          })

        firebaseApp
          .database()
          .ref(`admins/${user.uid}`)
          .on('value', (snap) => {
            auth.updateAuth({ isAdmin: !!snap.val() })
          })

        auth.updateAuth({
          ...defaultUserData(user),
          grants: grantsSnap.val(),
          isAdmin: !!isAdminSnap.val(),
          isGranted,
        })

        firebaseApp.database().ref(`users/${user.uid}`).update({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          providers: user.providerData,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
        })
      } else {
        firebaseApp.database().ref().off()
        auth.setAuth(defaultUserData(user))
      }
    },
  },
}

export default merge(MUIConfig, config)
