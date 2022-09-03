module.exports = async function addColumn(req, res) {
  const { key, type, label, id } = req.body;
  const formId = req.params.formId;
  const form = await Form.findOne({ id: formId });

  const updatedForm = await Form.updateOne({ id: formId }).set({
    columns: [...form.columns, { key, type, label, id }],
  });

  return res.ok(updatedForm);
};
