"use strict";

import {
  BaseErrorResponse,
  BaseResponseList,
  BaseSuccessResponse,
} from "../config/baseReponse";
import { DEFINE_STATUS_RESPONSE } from "../config/statusResponse";
import logger from "../config/winston";
import db from "../models";
import onRemoveParams from "../utils/remove-params";

const bannerService = {
  createImage: ({url}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await db.BannerImage.create({
          url,
        });
        return resolve(
          new BaseSuccessResponse({
            data,
            message: "Đăng kí phòng thành công",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(new BaseErrorResponse({ message: error.message }));
      }
    });
  },
  getAllImages: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { page, limit } = data;
        let offset = page && limit ? (page - 1) * limit : undefined;

        const option = onRemoveParams(
          {
            limit: Number(limit),
            offset,
            order: [["createdAt", "DESC"]],
            raw: true,
            nest: true,
            distinct: true,
          },
          [0]
        );
        const result = await db.BannerImage.findAndCountAll(option);
        const list = result.rows;
        const totalCount = result.count;
        return resolve(
          new BaseResponseList({
            list,
            status: DEFINE_STATUS_RESPONSE.SUCCESS,
            totalCount,
            message: "Lấy danh sách ảnh bìa thành công",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(new BaseErrorResponse({ message: error.message }));
      }
    });
  },
  deleteImage: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await db.BannerImage.findByPk(id);
        if (!data) {
          return reject(
            new BaseErrorResponse({
              message: "��nh bìa không tồn tại",
            })
          );
        }
        await db.BannerImage.destroy({
          where: {
            id: id,
          },
        });
        return resolve(
          new BaseSuccessResponse({
            message: "Xóa ảnh bìa thành công",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(new BaseErrorResponse({ message: error.message }));
      }
    });
  },
};

export default bannerService;
