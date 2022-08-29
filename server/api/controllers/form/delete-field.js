module.exports = async function (req, res) {
  const formId = req.param("formId");
  const fieldKey = req.param("fieldKey");

  const form = await Form.findOne({ id: formId });

  const fields = form.fields.filter((field) => field.key !== fieldKey);

  if (fields.length === form.fields.length) {
    return res.status(400).json({
      errors: {
        keyNotFound: `key ${fieldKey} not found.`,
      },
    });
  }

  await Form.updateOne({ id: formId }).set({ fields });

  return true;
};
