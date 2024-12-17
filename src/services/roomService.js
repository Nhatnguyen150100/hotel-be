import {
  BaseErrorResponse,
  BaseResponseList,
  BaseSuccessResponse,
} from "../config/baseReponse";
import db from "../models";
import { Op, where } from "sequelize";
import onRemoveParams from "../utils/remove-params";
import { DEFINE_STATUS_RESPONSE } from "../config/statusResponse";
import logger from "../config/winston";
import groupAndMerge from "../utils/group-item";

const roomService = {
  createRoom: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          name,
          description,
          bedType,
          acreage,
          normalDayPrice,
          weekendPrice,
          holidayPrice,
          listFacilitiesId,
          img_1,
          img_2,
          img_3,
          img_4,
          img_5,
          img_6,
        } = data;

        const validFacilities = await db.Facilities.findAll({
          where: {
            id: listFacilitiesId,
          },
        });
        if (validFacilities.length !== listFacilitiesId.length) {
          return reject(
            new BaseErrorResponse({
              message: "Một hoặc nhiều facilityId không hợp lệ.",
            })
          );
        }
        const newRoom = await db.Room.create({
          name,
          description,
          bedType,
          acreage,
          normalDayPrice,
          weekendPrice,
          holidayPrice,
          img_1,
          img_2,
          img_3,
          img_4,
          img_5,
          img_6,
        });
        await db.FacilitiesRoom.bulkCreate(
          listFacilitiesId.map((facilityId) => ({
            roomId: newRoom.dataValues.id,
            facilityId,
          }))
        );

        return resolve(
          new BaseSuccessResponse({
            message: "Tạo phòng thành công",
          })
        );
      } catch (error) {
        logger.error(error.message);
        return reject(
          new BaseErrorResponse({
            message: "Tạo phòng thất bại",
            error: error.message,
          })
        );
      }
    });
  },
  updateRoom: (roomId, data) => {
    console.log("🚀 ~ data:", data)
    return new Promise(async (resolve, reject) => {
      try {
        const { listFacilitiesId } = data;
        const validFacilities = await db.Facilities.findAll({
          where: {
            id: listFacilitiesId,
          },
        });

        if (validFacilities.length !== listFacilitiesId.length) {
          return reject(
            new BaseErrorResponse({
              message: "Một hoặc nhiều facilityId không hợp lệ.",
            })
          );
        }
        await db.FacilitiesRoom.destroy({
          where: { roomId },
        });

        await db.FacilitiesRoom.bulkCreate(
          listFacilitiesId.map((facilityId) => ({
            roomId,
            facilityId,
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
        const room = await db.Room.findAll({
          where: { id: roomId },
          include: [
            {
              model: db.FacilitiesRoom,
              required: false,
              as: "facilitiesRooms",
              required: true,
              nest: true,
              raw: true,
              include: [
                {
                  model: db.Facilities,
                  as: "facility",
                  required: false,
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (room) {
          return resolve(
            new BaseSuccessResponse({
              data: room[0],
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
  getAllRooms: (data) => {
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
                as: "facilitiesRooms",
                required: true,
                nest: true,
                raw: true,
                include: [
                  {
                    model: db.Facilities,
                    as: "facility",
                    required: false,
                  },
                ],
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
        const list = groupAndMerge(result.rows, "id", "facilitiesRooms");
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
  },
  getAllRoomsFromUser: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { page, limit, startDate, endDate } = data;
        let offset = page && limit ? (page - 1) * limit : undefined;
        let query = {};
        if (startDate && endDate) {
          query = {
            [Op.and]: [
              { endDate: { [Op.gte]: new Date(endDate) } },
              { startDate: { [Op.lte]: new Date(startDate) } },
            ],
          };
        }
        const bookings = Object.keys(query).length > 0 ? await db.Booking.findAll({
          where: query,
        }) : [];
        console.log("🚀 ~ returnnewPromise ~ bookings:", bookings)
        const option = onRemoveParams(
          {
            include: [
              {
                model: db.FacilitiesRoom,
                as: "facilitiesRooms",
                required: true,
                nest: true,
                raw: true,
                include: [
                  {
                    model: db.Facilities,
                    as: "facility",
                    required: false,
                  },
                ],
              },
            ],
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
        const list = groupAndMerge(result.rows, "id", "facilitiesRooms").filter((item) => !bookings.some((booing) => booing.roomId === item.id));
        const totalCount = result.count - bookings.length;
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
  },
};

export default roomService;
