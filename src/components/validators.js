const validator = {
  username: {
    rules: [
      {
        test: /^[a-z0-9_]+$/,
        message:
          "Username can contain alphabets, numeric or lowercase characters"
      },
      {
        test: value => {
          return value.length >= 8;
        },
        message: "Username must be longer than 7 characters"
      }
    ],
    errors: [],
    valid: false,
    state: ""
  },
  user: {
    rules: [
      {
        test: /^[a-z0-9_]+$/,
        message:
          "Username can contain alphabets, numeric or lowercase characters"
      },
      {
        test: value => {
          return value.length >= 8;
        },
        message: "Username must be longer than 7 characters"
      }
    ],
    errors: [],
    valid: false,
    state: ""
  },
  password: {
    rules: [
      {
        test: value => {
          return value.length > 7;
        },
        message: "Password must not be shorter than 8 characters"
      }
    ],
    errors: [],
    valid: false,
    state: ""
  },
  confirm_password: {
    rules: [
      {
        test: value => {
          return value.length > 7;
        },
        message: "Password must not be shorter than 8 characters"
      }
    ],
    errors: [],
    valid: false,
    state: ""
  },
  email: {
    rules: [
      {
        test: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: "Enter a valid email"
      }
    ],
    errors: [],
    valid: false,
    state: ""
  },
  mobile: {
    rules: [
      {
        // eslint-disable-next-line
        test: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
        message: "Enter a valid phone number"
      }
    ],
    errors: [],
    valid: false,
    state: ""
  }
};

function updateValidators(fieldName, value) {
  let validators = validator;
  validators[fieldName].errors = [];
  validators[fieldName].state = value;
  validators[fieldName].valid = true;
  validators[fieldName].rules.forEach(rule => {
    if (rule.test instanceof RegExp) {
      if (!rule.test.test(value)) {
        validators[fieldName].errors.push(rule.message);
        validators[fieldName].valid = false;
      }
    }
    if (typeof rule.test === "function") {
      if (!rule.test(value)) {
        validators[fieldName].errors.push(rule.message);
        validators[fieldName].valid = false;
      }
    }
  });

  return validators[fieldName];
}

export default validator;
export { updateValidators };
