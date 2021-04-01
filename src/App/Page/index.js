import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'

// import { APP_LAYOUT } from '../../data/config/constants'
import AppHeader from '../../components/AppHeader'

const useStyles = makeStyles(theme => ({
  contentContainer: {
    marginTop: theme.spacing(8),
    overflowY: "auto",
  }
}))

const Page = ({ children }) => {
  const classes = useStyles()
  return (
    <Fragment>
      <AppHeader />
      <div className={classes.contentContainer}>
        {children}
      </div>
    </Fragment>
  )
}

export default Page
