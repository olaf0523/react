import React, { lazy } from 'react'
import locales from './locales'
import routes from './routes'
import getMenuItems from './menuItems'
import themes from './themes'
import parseLanguages from 'base-shell/lib/utils/locale'

const config = {
  firebase: {
    config_prod: {
      apiKey: 'AIzaSyBQAmNJ2DbRyw8PqdmNWlePYtMP0hUcjpY',
      authDomain: 'react-most-wanted-3b1b2.firebaseapp.com',
      databaseURL: 'https://react-most-wanted-3b1b2.firebaseio.com',
      projectId: 'react-most-wanted-3b1b2',
      storageBucket: 'react-most-wanted-3b1b2.appspot.com',
      messagingSenderId: '258373383650',
    },
    config_dev: {
      apiKey: 'AIzaSyB31cMH9nJnERC1WCWA7lQHnY08voLs-Z0',
      authDomain: 'react-most-wanted-dev.firebaseapp.com',
      databaseURL: 'https://react-most-wanted-dev.firebaseio.com',
      projectId: 'react-most-wanted-dev',
      storageBucket: 'react-most-wanted-dev.appspot.com',
      messagingSenderId: '70650394824',
      appId: '1:70650394824:web:7cd3113c37741efc',
    },
    firebaseuiProps: {
      signInOptions: [
        'google.com',
        'facebook.com',
        'twitter.com',
        'github.com',
        'password',
        'phone',
      ],
    },
    messaging: {
      publicVapidKey:
        'BGddXH_O6qLmcingsSJx-R3hC8U9yUr2mW4ko63fF__e50WvfRcBfZu_JyBzLI35DNUE5x_9CPBqe64BWniCxV0',
    },
  },
  routes,
  locale: {
    locales,
    defaultLocale: parseLanguages(['en', 'de', 'ru'], 'en'),
    onError: (e) => {
      //console.warn(e)

      return
    },
  },
  menu: {
    getMenuItems,
  },
  theme: {
    themes,
    defaultThemeID: 'default',
    defaultType: 'light',
  },
  pages: {
    LandingPage: lazy(() => import('../pages/LandingPage/LandingPage')),
    PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
  },
}

export default config
