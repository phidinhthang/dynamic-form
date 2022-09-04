module.exports = async function (req, res) {
  const { isHidden } = req.body;

  const formId = req.params.formId;
  const columnId = req.params.columnId;

  const form = await Form.findOne({ id: formId });

  console.log("hidden ", isHidden, "formId ", formId, "columnId ", columnId);

  if (!form) {
    return res.status(404).json(false);
  }

  const column = form.columns.find((col) => col.id === columnId);

  if (!column) {
    return res.status(404).json(false);
  }

  column.isHidden = isHidden;

  await Form.updateOne({ id: formId }).set({ columns: form.columns });

  return res.status(200).json(true);
};
