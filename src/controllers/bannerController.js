"use strict";

import bannerService from "../services/bannerService";

const bannerController = {
  createImage: async (req, res) => {
    try {
      const rs = await bannerService.createImage(req.body);
      res.status(rs.status).json({ message: rs.message, data: rs.data });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  getAllImages: async (req, res) => {
    try {
      const rs = await bannerService.getAllImages(req.query);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  deleteImage: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await bannerService.deleteImage(id);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

export default bannerController;
