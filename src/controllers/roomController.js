import roomService from "../services/roomService";

const roomController = {
  createRoomMiddleware: async (req, res, next) => {
    try {
      const data = req.body;
      const rs = await roomService.createRoom(data);
      req.roomId = rs.data.id;
      next();
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  getAllRooms: async (req, res) => {
    try {
      const data = req.query;
      const rs = await roomService.getAllRooms(data);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  updateRoom: async (req, res) => {
    try {
      const img_1 = req.img_1;
      const img_2 = req.img_2;
      const img_3 = req.img_3;
      const img_4 = req.img_4;
      const img_5 = req.img_5;
      const img_6 = req.img_6;
      const { id } = req.params;
      const data = req.body;
      const rs = await roomService.updateRoom(id, {
        ...data,
        img_1,
        img_2,
        img_3,
        img_4,
        img_5,
        img_6,
      });
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  deleteRoom: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await roomService.deleteRoom(id);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  getRoom: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await roomService.getRoom(id);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

export default roomController;
