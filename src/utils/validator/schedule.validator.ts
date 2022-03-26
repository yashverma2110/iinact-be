import * as yup from "yup";

const scheduleValidator = yup.object().shape({
  list: yup.string().required(),
  remindAt: yup.string().required(),
  days: yup
    .array()
    .required("Should be schedule for atleast one day")
    .min(1)
    .max(7),
});

export default { scheduleValidator };
