module.exports = async function update(req, res) {
  const { elements, layout } = req.body || {};
  const formId = req.param("formId");

  const form = await Form.findOne({ id: formId });
  let columns = form.columns;

  const fieldElements = Object.values(elements).filter(
    (e) => e.type === "SHORT_TEXT"
  );

  fieldElements.forEach((element) => {
    const hasIncluded = columns.find((col) => col.id === element.id);

    if (!hasIncluded) {
      columns.push({
        type: "SHORT_TEXT",
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

  const updatedForm = await Form.updateOne({ id: formId }).set({
    elements,
    layout,
    columns,
  });

  return res.status(200).json(updatedForm);
};
