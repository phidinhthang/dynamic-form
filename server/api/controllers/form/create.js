module.exports = async function (req, res) {
  const { label, postUrl, listUrl, updateUrl, deleteUrl } = req.body || {};

  const form = await Form.create({
    label,
    layout: [],
    elements: {},
    columns: [],
    listUrl,
    postUrl,
    deleteUrl,
    updateUrl,
  }).fetch();

  return res.status(200).json(form);
};
