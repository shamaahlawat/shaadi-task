import React, { lazy, Suspense, useState } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import SwitchTheme from '@material-ui/core/Switch'

import { ROUTE_PATH, LOCAL_STORAGE } from '../data/config/constants'
import { getDataFromLocalStorage, setDataInLocalStorage } from '../data/redux/dataUtility'

import light from '../data/theme/light'
import dark from '../data/theme/dark'

import PrivateRoute from '../components/PrivateRoute'

const AuthContainer = lazy(() => import('./Auth'))
const Login = lazy(() => import('./Auth/Login'))
const PageContainer = lazy(() => import('./Page'))
const Home = lazy(() => import('./Page/Home'))
const PageNotFound = lazy(() => import('../components/PageNotFound'))

const useStyles = makeStyles(theme => ({
  appContainer: {
    minHeight: '100vh',
  },
  themeSwitch: {
    position: "fixed",
    right: "20px",
    top: "14px",
    zIndex: 9999,
    color: theme.palette.common.white
  },
  formLabel: {
    fontWeight: 600
  }
}))

const isDarkTheme = getDataFromLocalStorage(LOCAL_STORAGE.IS_DARK_THEME, false)

const App = () => {
  const [darkTheme, setDarkTheme] = useState(isDarkTheme)
  const classes = useStyles()

  const theme = createMuiTheme(darkTheme ? dark : light)

  const handleThemeChange = event => {
    const isDarkThemeSelected = event.target.checked
    setDataInLocalStorage(LOCAL_STORAGE.IS_DARK_THEME, isDarkThemeSelected)
    setDarkTheme(isDarkThemeSelected)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className={classes.appContainer} elevation={0} square>
        <FormControlLabel
          classes={{ label: classes.formLabel }}
          className={classes.themeSwitch}
          label={darkTheme ? "Night" : "Day"}
          labelPlacement="start"
          control={<SwitchTheme checked={darkTheme} onChange={handleThemeChange} />}
        />
        <Suspense fallback={null}>
          <Router>
            <Switch>
              <Route path={ROUTE_PATH.AUTH}>
                <AuthContainer>
                  <Suspense fallback={null}>
                    <Switch>
                      <Route path={ROUTE_PATH.LOGIN} component={Login} />
                      <Route component={PageNotFound} />
                    </Switch>
                  </Suspense>
                </AuthContainer>
              </Route>
              <PageContainer>
                <Switch>
                  <PrivateRoute exact path={ROUTE_PATH.HOME} component={Home} />
                  <PrivateRoute component={PageNotFound} />
                </Switch>
              </PageContainer>
            </Switch>
          </Router>
        </Suspense>
      </Paper>
    </ThemeProvider>
  )
}

export default App
