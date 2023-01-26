export default {
  login: {
    form: 'Login/Form',
    inputs: {
      email: 'Login/Email',
      password: 'Login/Password',
    },
    buttons: {
      submit: 'Login/Submit',
    },
    error: 'Login/Error',
  },
  resetPasswordRequest: {
    form: 'ResetPasswordRequest/Form',
    inputs: {
      email: 'ResetPasswordRequest/Email',
    },
    buttons: {
      back: 'ResetPasswordRequest/Back',
      submit: 'ResetPasswordRequest/Submit',
    },
    error: 'ResetPasswordRequest/Error',
  },
  resetPasswordChange: {
    form: 'ResetPasswordChange/Form',
    inputs: {
      password: 'ResetPasswordChange/Password',
      passwordConfirmation: 'ResetPasswordChange/PasswordConfirmation',
    },
    buttons: {
      back: 'ResetPasswordChange/Back',
      submit: 'ResetPasswordChange/Submit',
    },
    error: 'ResetPasswordChange/Error',
  },
  dashboard: {
    test: 'Dashboard/test',
  },
  estoque: {
    table: 'Estoque/Table',
  },
  dragDrop:{
    buttons:{
      submit: 'DragDrop/Submit',
    },
  }
}
