import * as yup from 'yup';

const signup = yup.object().shape({
    firstName: yup.string().trim().required(),
    lastName: yup.string().trim().required(),
    email:yup.string().email().required(),
    password: yup.string().min(5).max(8).required(),
})

const tag = yup.object().shape({
  name: yup.string().required().min(5).max(24),
  color: yup.string().required(),
});

export default {
  signup,
  tag,
};