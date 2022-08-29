module.exports = async function (req, res) {
  const formId = req.param("formId");
  let {
    key,
    label,
    type,
    default: defaultsTo,
    validations: _validations,
  } = req.body || {};
  const validations = {};
  const errors = [];

  if (!key) {
    errors.push({ path: "key", message: "key cannot be empty." });
  } else if (typeof key !== "string") {
    errors.push({ path: "key", message: "key type must be string." });
  }

  if (label && typeof label !== "string") {
    errors.push({ path: "label", message: "label type must be string." });
  }

  if (!type) {
    errors.push({
      path: "type",
      message: "type cannot be empty.",
    });
  } else if (!["string", "number"].includes(type)) {
    errors.push({
      path: "type",
      message: "type must be one of values: `string` or `number`.",
    });
  }

  if (
    type === "string" &&
    typeof defaultsTo !== "undefined" &&
    typeof defaultsTo !== "string"
  ) {
    errors.push({
      path: "default",
      message: `cannot set default value \`${defaultsTo}\` for type \`string\`.`,
    });
  } else if (
    type === "number" &&
    typeof defaultsTo !== "undefined" &&
    typeof defaultsTo !== "number"
  ) {
    errors.push({
      path: "default",
      message: `cannot set default value \`${defaultsTo}\` for type \`number\``,
    });
  }

  const form = await Form.findOne({ id: formId });

  if (form.fields?.map((field) => field.key).includes(key)) {
    errors.push({
      path: "key",
      message: `key \`${key}\` already exists in form.`,
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  if (!label) {
    label = key;
  }

  if (
    _validations?.required &&
    typeof _validations.required?.value === "boolean" &&
    (typeof _validations.required?.errorMessage === "string" ||
      typeof _validations.required?.errorMessage === "undefined")
  ) {
    validations.required = _validations.required;
  }

  switch (type) {
    case "string": {
      if (
        _validations?.minLength &&
        typeof _validations.minLength?.value === "number" &&
        typeof _validations.minLength?.errorMessage === "string"
      ) {
        validations.minLength = _validations.minLength;
      }

      if (
        _validations?.maxLength &&
        typeof _validations.maxLength?.value === "number" &&
        typeof _validations.maxLength?.errorMessage === "string"
      ) {
        validations.maxLength = _validations.maxLength;
      }

      if (
        _validations?.isEmail &&
        typeof _validations.isEmail?.value === "boolean" &&
        typeof _validations.isEmail?.errorMessage === "string"
      ) {
        validations.isEmail = _validations.isEmail;
      }

      if (
        _validations?.regexp &&
        typeof _validations.regexp?.value === "string" &&
        typeof _validations?.regexp?.errorMessage === "string"
      ) {
        validations.regexp = _validations.regexp;
      }
    }
    case "number": {
      if (
        _validations?.min &&
        typeof _validations.min?.value === "number" &&
        typeof _validations.min?.errorMessage === "string"
      ) {
        validations.min = _validations.min;
      }

      if (
        _validations?.max &&
        typeof _validations.max?.value === "number" &&
        typeof _validations.max?.errorMessage === "string"
      ) {
        validations.max = _validations.max;
      }
    }
  }

  const fields = form.fields;
  const field = {
    key,
    label,
    type,
    default: defaultsTo,
    validations,
  };
  fields.push(field);

  await Form.updateOne({ id: formId }).set({ fields });

  return res.status(200).json(field);
};
