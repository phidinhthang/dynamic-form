module.exports = async function (req, res) {
  const { label, fields, postUrl, listUrl, updateUrl, deleteUrl } =
    req.body || {};

  const errors = [];

  if (!label) {
    errors.push({ path: "label", message: "label cannot be empty." });
  } else if (typeof label !== "string") {
    errors.push({ path: "label", message: "label type must be `string`." });
  }

  if (!listUrl) {
    errors.push({ path: "listUrl", message: "listUrl cannot be empty." });
  } else if (typeof listUrl !== "string") {
    errors.push({ path: "listUrl", message: "listUrl type must be `string`." });
  }

  if (postUrl && typeof postUrl !== "string") {
    errors.push({ path: "postUrl", message: "listUrl type must be `string`." });
  }
  if (updateUrl && typeof updateUrl !== "string") {
    errors.push({
      path: "updateUrl",
      message: "updateUrl type must be `string`.",
    });
  }
  if (deleteUrl && typeof deleteUrl !== "string") {
    errors.push({
      path: "deleteUrl",
      message: "deleteUrl type must be `string`.",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const form = await Form.create({
    label,
    fields,
    listUrl,
    postUrl,
    deleteUrl,
    updateUrl,
  }).fetch();

  return res.status(200).json(form);
};
