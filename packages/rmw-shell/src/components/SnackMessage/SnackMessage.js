import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSnackbar, SnackbarContent } from 'notistack'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import {
  Avatar,
  CardMedia,
  IconButton,
} from '@material-ui/core'

import Notifications from '@material-ui/icons/Notifications'
import { useHistory } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '344px !important',
    },
    maxWidth: 400,
    cursor: 'pointer',
  },
  card: {
    width: '100%',
  },
}))

const SnackMessage = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const history = useHistory()
  const { closeSnackbar } = useSnackbar()
  const { payload, id } = props
  const { notification } = payload
  const { title, body, icon, image, click_action } = notification || {}
  
  // const theme = useTheme()
  // const type = theme.palette.type === 'light' ? 'dark' : 'light'
  const { isDarkMode } = useAppTheme()

  const innerTheme = createMuiTheme({
    palette: {
      type: isDarkMode ? 'light' : 'dark',
    },
  })

  const handleDismiss = () => {
    closeSnackbar(id)
  }

  const handleClick = () => {
    const url = new URL(click_action)
    history.push(url.pathname)
    handleDismiss()
  }

  return (
    <ThemeProvider theme={innerTheme}>
      <SnackbarContent ref={ref} className={classes.root}>
        <Card className={classes.card}>
          {image && (
            <CardMedia
              onClick={handleClick}
              style={{ height: 140 }}
              image={image}
              title={title}
            />
          )}
          <CardHeader
            avatar={
              <Avatar onClick={handleClick} src={icon} aria-label="recipe">
                <Notifications />
              </Avatar>
            }
            action={
              <IconButton
                onClick={handleDismiss}
                style={{ zIndex: 9999 }}
                className={classes.expand}
              >
                <CloseIcon />
              </IconButton>
            }
            title={<div onClick={handleClick}>{title}</div>}
            subheader={<div onClick={handleClick}>{body}</div>}
          />
        </Card>
      </SnackbarContent>
    </ThemeProvider>
  )
})

export default SnackMessage
