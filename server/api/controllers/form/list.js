module.exports = async function (req, res) {
  const forms = await Form.find();

  return res.status(200).json(forms);
};
