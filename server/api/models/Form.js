module.exports = {
  attributes: {
    label: {
      type: "string",
      required: true,
    },
    layout: {
      type: "json",
      required: true,
    },
    elements: {
      type: "json",
      required: true,
    },
    columns: {
      type: "json",
      required: true,
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
