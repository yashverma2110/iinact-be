import * as yup from "yup";

const listCreate = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  type: yup.string().required(),
  urls: yup.array().required("There should be atleast 5 links").min(5).max(100),
});

export default {
  listCreate,
};
