const changePasswordRoute = require('./change-password/change-password.route')
const checkUsernameRoute = require('./check-username/check-username.route')
const createAccountRoute = require('./create-account/create-account.route')
const credentialsRecoveryRoute = require('./credentials-recovery/credentials-recovery.route')
const editProfileRoute = require('./edit-profile/edit-profile.route')
const getcontractRoute = require('./get-contract/get-contract.route')
const getValidSponsorsRoute = require('./get-valid-sponsors/get-valid-sponsors.route')
const grantConsentRoute = require('./grant-consent/grant-consent.route')
const loginRoute = require('./login/login.route')
const profileRoute = require('./profile/profile.route')
const revokeConsentRoute = require('./revoke-consent/revoke-consent.route')
const signupRoute = require('./signup/signup.route')
const transferRoute = require('./transfer/transfer.route')
const preregisterLifebankRoute = require('./pre-register/pre-register-lifebank.route')
const registerLifebankRoute = require('./create-account-lifebank/create-account-lifebank.route')
const verifyEmailRouteRoute = require('./verify-email/verify-email.route')
const getValidLifebanksRoute = require('./get-valid-lifebanks/get-valid-lifebanks.route')

module.exports = [
  changePasswordRoute,
  checkUsernameRoute,
  createAccountRoute,
  credentialsRecoveryRoute,
  editProfileRoute,
  getcontractRoute,
  getValidSponsorsRoute,
  grantConsentRoute,
  loginRoute,
  profileRoute,
  revokeConsentRoute,
  signupRoute,
  transferRoute,
  preregisterLifebankRoute,
  registerLifebankRoute,
  verifyEmailRouteRoute,
  getValidLifebanksRoute
]
