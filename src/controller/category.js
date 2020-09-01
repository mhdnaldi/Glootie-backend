const {
  getCategoryItem,
  getCategoryId,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../model/category");
const helper = require("../helper/helper");
const redis = require("redis");
const client = redis.createClient();

module.exports = {
  getCategoryItem: async (req, res) => {
    try {
      const result = await getCategoryItem();
      // redis
      client.setex(`getcategoryitem`, 3600, JSON.stringify(result));
      return helper.response(res, 200, "Data found", result);
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
  getCategoryId: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getCategoryId(id);
      client.setex(
        `getcategoryid:${JSON.stringify(req.params)}`,
        3600,
        JSON.stringify(result)
      );
      if (result.length > 0) {
        return helper.response(res, 200, `Data with id:${id} found`, result);
      } else {
        return helper.response(res, 404, `Data with id:${id} not found`);
      }
    } catch (err) {
      console.log(err);
      return helper.response(res, 404, "Bad request", err);
    }
  },
  postCategory: async (req, res) => {
    try {
      const { category_name, category_status } = req.body;
      const setData = {
        category_name,
        category_status,
      };
      const result = await postCategory(setData);
      return helper.response(res, 200, "Data created", result);
    } catch (err) {
      return helper.response(res, 404, "Bad Request", err);
      console.log(err);
    }
  },
  patchCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { category_name, category_status } = req.body;
      const setData = {
        category_name,
        category_status,
      };
      const checkId = await getCategoryId(id);
      if (checkId.length > 0) {
        const result = await patchCategory(setData, id);
        return helper.response(res, 200, "Success edit data", result);
      }
    } catch (err) {
      return helper.response(res, 404, "Bad Request", err);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await deleteCategory(id);
      return helper.response(res, 201, "File deleted", result);
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
};
