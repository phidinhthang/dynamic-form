module.exports = async function findRecords(req, res) {
  const limitString = req.query.limit ?? "20";
  const pageString = req.query.page ?? "1";
  const limit = parseInt(limitString);
  const page = parseInt(pageString);

  const model = req.options.action.split("/")[0];
  if (!model) {
    return res.status(200).json({
      errors: "no model specified.",
    });
  }

  if (Number.isNaN(limit) || Number.isNaN(page)) {
    return res.status(400).json({ errors: "query option invalid." });
  }

  if (limit < 1 || page < 1) {
    return res.status(400).json({ errors: "query option invalid." });
  }

  var Model = req._sails.models[model];

  const totalRecords = await Model.count();
  const offset = limit * (page - 1);

  const records = await Model.find({ limit, skip: offset });

  return res.status(200).json({
    data: records,
    paging: {
      current: page,
      total: Math.ceil(totalRecords / limit),
    },
  });
};
