import { logger } from "sequelize/lib/utils/logger";
import { BaseErrorResponse, BaseResponseList, BaseSuccessResponse } from "../config/baseReponse";
import db from "../models";
import { Op } from "sequelize";
import onRemoveParams from "../utils/remove-params";
import { DEFINE_STATUS_RESPONSE } from "../config/statusResponse";

const roomService = {
  createRoom: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, description, price, listImages, listFacilitiesId } = data;
        const newRoom = await db.Room.create({
          name,
          description,
          price,
          listImages,
        });
        const facilities = await db.FacilitiesRoom.bulkCreate(
          listFacilitiesId.map((listFacilitiesId) => ({
            roomId: newRoom.id,
            facilitiesId: listFacilitiesId,
          }))
        );
        if (newRoom && facilities) {
          return resolve(
            new BaseSuccessResponse({
              message: "Tạo phòng thành công",
            })
          );
        }
        reject(
          new BaseErrorResponse({
            message: "Tạo phòng thất bại",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(
          new BaseErrorResponse({
            message: "Tạo phòng thất bại",
            error: error.message,
          })
        );
      }
    });
  },
  updateRoom: (roomId, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { listFacilitiesId } = data;
        await db.FacilitiesRoom.destroy({
          where: { roomId },
        });
        await db.FacilitiesRoom.bulkCreate(
          listFacilitiesId.map((listFacilitiesId) => ({
            roomId: roomId,
            facilitiesId: listFacilitiesId,
          }))
        );
        const updatedRoom = await db.Room.update(data, {
          where: { id: roomId },
        });
        if (updatedRoom) {
          return resolve(
            new BaseSuccessResponse({
              message: "Cập nhật phòng thành công",
            })
          );
        }
        reject(
          new BaseErrorResponse({
            message: "Cập nhật phòng thất bại",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(
          new BaseErrorResponse({
            message: error.message,
          })
        );
      }
    });
  },
  deleteRoom: (roomId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedRoom = await db.Room.destroy({
          where: { id: roomId },
        });
        if (deletedRoom) {
          return resolve(
            new BaseSuccessResponse({
              message: "Xóa phòng thành công",
            })
          );
        }
        reject(
          new BaseErrorResponse({
            message: "Xóa phòng thất bại",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(
          new BaseErrorResponse({
            message: error.message,
          })
        );
      }
    });
  },
  getRoom: (roomId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const room = await db.Room.findOne({
          where: { id: roomId },
          include: [
            {
              model: db.FacilitiesRoom,
              through: { model: db.Facilities },
              as: "facilities",
            },
          ],
        });
        if (room) {
          return resolve(
            new BaseSuccessResponse({
              data: room,
            })
          );
        }
        reject(
          new BaseErrorResponse({
            message: "Không tìm thấy phòng này",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(
          new BaseErrorResponse({
            message: error.message,
          })
        );
      }
    });
  },
  getAllRooms: () => {
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
        const result = await db.Room.findAndCountAll(option);
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
            message: error.message,
          })
        );
      }
    });
  }
};


export default roomService;
