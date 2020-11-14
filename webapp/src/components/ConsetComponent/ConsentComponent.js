import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Backdrop from '@material-ui/core/Backdrop'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import { useUser } from '../../context/user.context'
import { SIGNUP_MUTATION, PROFILE_QUERY, } from '../../gql'
import SignupAccount from '../Signup/SignupAccount'
import SignupConsent from '../Signup/SignupConsent'

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    right: 14,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: "rgba(0, 0, 0, 0.6)"
    }
  },
  dialogConset: {
    padding: "48px",
    [theme.breakpoints.down('md')]: {
      paddingLeft: "21px",
      paddingRight: "21px",
    }
  }, stepperContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  titleConsent: {
    fontSize: '34px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.18,
    letterSpacing: '0.25px',
    color: '#rgba(0, 0, 0, 0.87)',
    marginBottom: 15
  },
  textConsent: {
    fontSize: '12px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.33,
    letterSpacing: '0.4px',
    color: '#000000',
    marginBottom: 30
  }
}))

const ConsetComponent = () => {
  const [currentUser] = useUser()
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [openConsent, setOpenConsent] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [profileData, setprofile] = useState()
  const [messegaAlert, setMessegaAlert] = useState("false")
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [maxWidthConset] = useState('sm')
  const [
    signup,
    { loading: signupLoading, data: { signup: signupResult } = {} }
  ] = useMutation(SIGNUP_MUTATION)

  const [
    loadProfile,
    { data: { profile: { profile } = {} } = {} }
  ] = useLazyQuery(PROFILE_QUERY, { fetchPolicy: 'network-only' })

  const handleOpenConsent = () => {
    setOpenConsent(!openConsent)
  }

  const handleSingup = () => {
    console.log("profile 3: ", profile)
    //const { username, secret, ...profile } = currentUser
    //console.log("profile 3: ", profile)
    signup({
      variables: {
        profile
      }
    })
  }

  const handleOpenAlert = () => {
    setOpenAlert(!openAlert)
  }

  useEffect(() => {
    if (currentUser) loadProfile()

  }, [currentUser])

  useEffect(() => {
    if (currentUser && profile && !profile.consent) {
      setprofile(profile)
      handleOpenConsent()
    }
    console.log("Profile:", profile)
  }, [profile])

  useEffect(() => {
    if (signupResult) {

      if (signupResult.success) {
        setMessegaAlert(t('signup.consentGranted'))
        handleOpenAlert()
        handleOpenConsent()
      } else {
        setMessegaAlert(t('signup.consentError'))
        handleOpenAlert()
      }

    }

  }, [signupResult])


  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={maxWidthConset}
        open={openConsent}
        onClose={handleOpenConsent}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box className={classes.dialogConset}>
          <Box className={classes.closeIcon}>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleOpenConsent}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Box>
            <Box className={classes.stepperContent}>
              <Typography className={classes.titleConsent}> {t('signup.termsAndConditions')}</Typography>
              <Typography variant="body1" className={classes.textConsent}>{t('signup.termsAndConditionsInfo')}</Typography>
            </Box>
            <SignupAccount account={profile ? profile.account : ""} />
            <SignupConsent onSubmit={handleSingup} loading={signupLoading} />
          </Box>
        </Box>
      </Dialog>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleOpenAlert}>
        <Alert onClose={handleOpenAlert} severity="success">
          {messegaAlert}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ConsetComponent