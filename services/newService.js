import { logger } from "sequelize/lib/utils/logger";
import { BaseErrorResponse, BaseResponseList, BaseSuccessResponse } from "../config/baseReponse";
import db from "../models";
import { Op } from "sequelize";
import onRemoveParams from "../utils/remove-params";
import { DEFINE_STATUS_RESPONSE } from "../config/statusResponse";

const newService = {
  createNewService: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { thumbnailImg, name, description, content } = data;
        if (!thumbnailImg || !name || !description || !content) {
          return reject(
            new BaseErrorResponse({ message: "Thông tin bắt buộc" })
          );
        }
        const newCreated = await db.New.create({
          thumbnailImg,
          name,
          description,
        });
        if (newCreated) {
          await db.ContentNew.bulkCreate(
            content.map((item) => ({
              newId: newCreated.id,
              content: item.content,
              order: item.order,
            }))
          );
          return resolve(
            new BaseSuccessResponse({
              data: newCreated,
              message: "Thêm tin mới thành công",
            })
          );
        }
      } catch (error) {
        logger.error(error.message);
        reject(new BaseErrorResponse({ message: error.message }));
      }
    });
  },
  updateNew: (newId, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { thumbnailImg, name, description, content } = data;
        if (!thumbnailImg ||!name ||!description) {
          return reject(
            new BaseErrorResponse({ message: "Thông tin bắt buộc" })
          );
        }
        await db.ContentNew.destroy({
          where: {
            newId
          }
        })
        await db.ContentNew.bulkCreate(
          content.map((item) => ({
            newId: newCreated.id,
            content: item.content,
            order: item.order,
          }))
        );
        const updated = await db.New.update({
          thumbnailImg,
          name,
          description,
        }, {
          where: {
            id: newId,
          },
        })
        if(updated) {
          return resolve(
            new BaseSuccessResponse({
              message: "Cập nhật tin mới thành công",
            })
          );
        }
        return reject(
          new BaseErrorResponse({
            message: "Cập nhật tin mới thất bại",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(new BaseErrorResponse({ message: error.message }));
      }
    });
  },
  deleteNew: (newId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleted = await db.New.destroy({
          where: {
            id: newId,
          },
        });
        if (deleted) {
          return resolve(
            new BaseSuccessResponse({
              message: "Xóa tin thành công",
            })
          );
        }
        return reject(
          new BaseErrorResponse({
            message: "Xóa tin thất bại",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(new BaseErrorResponse({ message: error.message }));
      }
    });
  },
  getNew: (newId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newDetail = await db.New.findOne({
          where: {
            id: newId,
          },
          include: [
            {
              model: db.ContentNew,
              as: "contentNew",
              required: false,
              attributes: ["id", "content", "order"],
            }
          ],
          raw: true,
          nest: true,
        });
        if (newDetail) {
          return resolve(
            new BaseSuccessResponse({
              data: newDetail,
              message: "Lấy tin thành công",
            })
          );
        }
        return reject(
          new BaseErrorResponse({
            message: "Lấy tin thất bại",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(new BaseErrorResponse({ message: error.message }));
      }
    });
  },
  getAllNew: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { page, limit, nameLike } = data;
        let offset = page && limit ? (page - 1) * limit : undefined;
        let query = {};
        if (nameLike) {
          query = {
            name: {
              [Op.like]: `%${nameLike}%`,
            },
          };
        }
        const option = onRemoveParams(
          {
            include: [
              {
                model: db.ContentNew,
                as: "contentNew",
                required: false,
                attributes: ["id", "content", "order"],
              }
            ],
            where: query,
            limit: Number(limit),
            offset,
            order: [["createdAt", "DESC"]],
            raw: true,
            nest: true,
            distinct: true,
          },
          [0]
        );
        const result = await db.New.findAndCountAll(option);
        const list = result.rows;
        const totalCount = result.count;
        if (result) {
          return resolve(
            new BaseResponseList({
              list,
              status: DEFINE_STATUS_RESPONSE.SUCCESS,
              totalCount,
              message: "List retrieved successfully",
            })
          );
        }
        return reject(
          new BaseResponseList({
            list: null,
            status: DEFINE_STATUS_RESPONSE.ERROR,
            totalCount,
            message: "List retrieved successfully",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(new BaseErrorResponse({ message: error.message }));
      }
    });
  }
};


export default newService;
