module.exports = async function (req, res) {
  const formId = req.param("formId");
  const form = await Form.findOne({ id: formId });

  return res.status(200).json(form);
};
