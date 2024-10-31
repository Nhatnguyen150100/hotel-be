import roomService from "../services/roomService";

const roomController = {
  createRoom: async (req, res) => {
    try {
      const data = {
        ...req.body,
        listFacilitiesId: req.body.listFacilitiesId.split(","),
      };
      const rs = await roomService.createRoom(data);
      res.status(rs.status).json(rs);
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
  getAllRoomsFromUser: async (req, res) => {
    try {
      const data = req.query;
      const rs = await roomService.getAllRoomsFromUser(data);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  updateRoom: async (req, res) => {
    try {
      const { id } = req.params;
      const data = {
        ...req.body,
        listFacilitiesId: req.body.listFacilitiesId.split(","),
      };
      const rs = await roomService.updateRoom(id, data);
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
