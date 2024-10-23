import { logger } from "sequelize/lib/utils/logger";
import { BaseErrorResponse, BaseResponseList, BaseSuccessResponse } from "../config/baseReponse";
import db from "../models";
import { DEFINE_STATUS_RESPONSE } from "../config/statusResponse";
import { Op } from "sequelize";

const facilitiesService = {
  createFacility: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, icon } = data;
        const facility = await db.Facilities.create({ name, icon });
        if (facility) {
          return resolve(
            new BaseSuccessResponse({
              data: facility,
              message: "Tạo tiện ích thành công",
            })
          );
        }
        return reject(
          new BaseErrorResponse({
            message: "Tạo tiện ích thất bại",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(
          new BaseErrorResponse({
            message: "Tạo tiện ích thất bại",
            data: error.message,
          })
        );
      }
    });
  },
  updateFacility: (facilityId, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const facility = await db.Facilities.findByPk(facilityId);
        if (!facility) {
          return reject(
            new BaseErrorResponse({
              message: "Tiện ích không tồn tại",
            })
          );
        }
        const updatedFacility = await facility.update(data);
        if (updatedFacility) {
          return resolve(
            new BaseSuccessResponse({
              data: updatedFacility,
              message: "Cập nhật tiện ích thành công",
            })
          );
        }
        return reject(
          new BaseErrorResponse({
            message: "Cập nhật tiện ích thất bại",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(
          new BaseErrorResponse({
            message: "Cập nhật tiện ích thất bại",
            data: error.message,
          })
        );
      }
    });
  },
  deleteFacility: (facilityId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const facility = await db.Facilities.findByPk(facilityId);
        if (!facility) {
          return reject(
            new BaseErrorResponse({
              message: "Tiện ích không tồn tại",
            })
          );
        }
        await facility.destroy();
        return resolve(
          new BaseSuccessResponse({
            message: "Xóa tiện ích thành công",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(
          new BaseErrorResponse({
            message: "Xóa tiện ích thất bại",
            data: error.message,
          })
        );
      }
    });
  },
  getAllFacilities: (data) => {
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
                model: db.FacilitiesRoom,
                through: { model: db.Facilities },
                as: "facilities",
              },
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
        const result = await db.Facilities.findAndCountAll(option);
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
        reject(
          new BaseErrorResponse({
            message: "Lấy tất cả tiện ích thất bại",
            data: error.message,
          })
        );
      }
    });
  }
};

export default facilitiesService;
