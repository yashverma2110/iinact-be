import * as yup from "yup";

const listCreate = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  type: yup.string().required(),
});

export default {
  listCreate,
};
