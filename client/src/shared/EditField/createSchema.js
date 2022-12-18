import * as Yup from "yup";

import capitalize from "../utils/capitalize";

const createSchema = (field, validations, confirmation) => {
  const initialSchema = Yup.string();
  let finalSchema = Yup.object().shape();
  let schemas = [];
  let allSchemas = [];

  if (validations.hasOwnProperty("required")) {
    const required = Yup.string().required("it is required");
    schemas.push(required);
  }

  if (validations.hasOwnProperty("min")) {
    const min = Yup.string().min(
      validations["min"].length,
      `Field should have at least ${validations["min"].length} characters`
    );
    schemas.push(min);
  }

  if (validations.hasOwnProperty("email")) {
    const email = Yup.string().email("wrong email format");
    schemas.push(email);
  }

  const schema = schemas.reduce((acc, n) => acc.concat(n), initialSchema);
  allSchemas.push(Yup.object().shape({ [field]: schema }));

  if (confirmation) {
    let newSch = Yup.object().shape({
      [`confirm${capitalize(field)}`]: Yup.string().test(
        "fields-match",
        "Fields must match",
        function (value) {
          return this.parent[field] === value;
        }
      ),
    });
    allSchemas.push(newSch);
  }

  return allSchemas.reduce((s, next) => s.concat(next), finalSchema);
};

export default createSchema;
