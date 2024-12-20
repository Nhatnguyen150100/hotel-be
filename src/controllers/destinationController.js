import destinationService from "../services/destinationService";

const destinationController = {
  createNew: async (req, res) => {
    try {
      const rs = await destinationService.createNew(req.body);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  updateNew: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await destinationService.updateNew(id, req.body);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  deleteNew: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await destinationService.deleteNew(id);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  getNew: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await destinationService.getNew(id);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  getAllNews: async (req, res) => {
    try {
      const rs = await destinationService.getAllNew(req.query);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

export default destinationController;
