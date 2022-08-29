module.exports = {
  attributes: {
    label: {
      type: "string",
      required: true,
    },
    fields: {
      type: "json",
      defaultsTo: [],
    },
    listUrl: {
      type: "string",
      required: true,
    },
    postUrl: {
      type: "string",
    },
    updateUrl: {
      type: "string",
    },
    deleteUrl: {
      type: "string",
    },
    createdAt: {
      type: "ref",
      columnType: "datetime",
      autoCreatedAt: true,
    },
    updatedAt: {
      type: "ref",
      columnType: "datetime",
      autoUpdatedAt: true,
    },
  },
};
