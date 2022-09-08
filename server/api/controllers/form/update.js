module.exports = async function update(req, res) {
  const { elements, layout, listUrl, label, postUrl, updateUrl, deleteUrl } =
    req.body || {};
  const formId = req.param("formId");

  const form = await Form.findOne({ id: formId });
  let columns = form.columns;

  if (typeof elements === "object") {
    const fieldElements = Object.values(elements).filter(
      (e) =>
        e.type === "SHORT_TEXT" ||
        e.type === "NUMBER" ||
        e.type === "SINGLE_CHOICE"
    );

    fieldElements.forEach((element) => {
      const hasIncluded = columns.find((col) => col.id === element.id);

      if (!hasIncluded) {
        columns.push({
          type: element.type,
          id: element.id,
          label: element.data.label,
          key: element.data.key,
        });
      }
    });

    columns.forEach((column) => {
      if (typeof column.id === "string") {
        const linkedElement = fieldElements.find(
          (element) => element.id === column.id
        );
        if (!linkedElement) {
          columns = columns.filter((col) => col.id !== column.id);
        } else {
          column.label = linkedElement.data.label;
          column.key = linkedElement.data.key;
        }
      }
    });
  }

  const updatedForm = await Form.updateOne({ id: formId }).set({
    elements,
    layout,
    columns,
    label,
    listUrl,
    postUrl,
    updateUrl,
    deleteUrl,
  });

  return res.status(200).json(updatedForm);
};
