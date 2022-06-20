import * as yup from "yup";

const submissionCreate = yup.object().shape({
  link: yup.string().required(),
  list: yup.string().required(),
  score: yup.number().required(),
  tag: yup.array().min(1).of(yup.string()),
  reviewAgain: yup.boolean(),
});

export default {
  submissionCreate,
};
