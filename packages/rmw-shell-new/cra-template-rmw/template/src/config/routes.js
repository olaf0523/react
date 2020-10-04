/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import PrivateRoute from 'base-shell/lib/components/PrivateRoute/PrivateRoute'
import PublicRoute from 'base-shell/lib/components/PublicRoute/PublicRoute'
import { Route } from 'react-router-dom'

const About = lazy(() => import('../pages/About/About'))
const Home = lazy(() => import('../pages/Home/Home'))
const FirebasePaths = lazy(() => import('../pages/Firebase/Paths'))
const FirebaseLists = lazy(() => import('../pages/Firebase/Lists'))
const FirebaseDocs = lazy(() => import('../pages/Firebase/Docs'))
const FirebaseCols = lazy(() => import('../pages/Firebase/Cols'))
const FirebaseMessaging = lazy(() => import('../pages/Firebase/Messaging'))
const FirebaseStorage = lazy(() => import('../pages/Firebase/Storage'))

const routes = [
  <Route path="/about" exact component={About} />,
  <PrivateRoute path="/home" exact component={Home} />,
  <PrivateRoute path="/firebase_paths" exact component={FirebasePaths} />,
  <PrivateRoute path="/firebase_lists" exact component={FirebaseLists} />,
  <PrivateRoute path="/firebase_docs" exact component={FirebaseDocs} />,
  <PrivateRoute path="/firebase_cols" exact component={FirebaseCols} />,
  <PrivateRoute
    path="/firebase_messaging"
    exact
    component={FirebaseMessaging}
  />,
  <PrivateRoute path="/firebase_storage" exact component={FirebaseStorage} />,
]

export default routes
