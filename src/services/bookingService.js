import { Op } from "sequelize";
import onRemoveParams from "../utils/remove-params";
import { DEFINE_STATUS_RESPONSE } from "../config/statusResponse";

const {
  BaseSuccessResponse,
  BaseErrorResponse,
  BaseResponseList,
} = require("../config/baseReponse");
const { default: logger } = require("../config/winston");
const { default: db } = require("../models");

const bookingService = {
  createBooking: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          roomId,
          name,
          email,
          phoneNumber,
          startDate,
          endDate,
          adults,
          children,
        } = data;
        const checkIsBooking = await db.Booking.findOne({
          where: {
            roomId,
            startDate,
            endDate,
          },
        });
        if (checkIsBooking) {
          return reject(
            new BaseErrorResponse({
              message: "Booking already exists",
            })
          );
        }
        const newBooking = await db.Booking.create({
          roomId,
          name,
          email,
          phoneNumber,
          startDate,
          endDate,
          adults,
          children,
        });
        return resolve(
          new BaseSuccessResponse({
            data: newBooking,
            message: "Đăng kí phòng thành công",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(new BaseErrorResponse({ message: error.message }));
      }
    });
  },
  getAllBooking: (data) => {
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
        const result = await db.Booking.findAndCountAll(option);
        const list = result.rows;
        const totalCount = result.count;
        return resolve(
          new BaseResponseList({
            list,
            status: DEFINE_STATUS_RESPONSE.SUCCESS,
            totalCount,
            message: "List retrieved successfully",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(new BaseErrorResponse({ message: error.message }));
      }
    });
  },
};

export default bookingService;
