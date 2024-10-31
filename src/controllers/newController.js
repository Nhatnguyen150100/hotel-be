import newService from "../services/newService";

const newController = {
  createNew: async (req, res) => {
    try {
      const rs = await newService.createNew(req.body);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  updateNew: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await newService.updateNew(id, req.body);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  deleteNew: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await newService.deleteNew(id);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  getNew: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await newService.getNew(id);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  getAllNews: async (req, res) => {
    try {
      const rs = await newService.getAllNew(req.query);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

export default newController;
