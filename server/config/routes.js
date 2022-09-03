/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  "GET /form/list": "form/list",
  "GET /form/:formId": "form/get-by-id",
  "POST /form/create": "form/create",
  "DELETE /form/:formId/delete": "form/delete",
  "PATCH /form/:formId/update": "form/update",
  "PUT /form/:formId/add-column": "form/add-column",

  "GET /task/populate": "TaskController.populate",
};
