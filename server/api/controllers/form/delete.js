module.exports = async function (req, res) {
  const formId = req.param("formId");

  const deletedForm = await Form.destroyOne({ id: formId });

  return res.status(200).json(deletedForm);
};
