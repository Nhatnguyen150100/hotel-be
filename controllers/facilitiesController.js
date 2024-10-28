import facilitiesService from "../services/facilitiesService";

const facilitiesController = {
  createFacility: async (req, res) => {
    try {
      const rs = await facilitiesService.createFacility(req.body);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  updateFacility: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await facilitiesService.updateFacility(id, req.body);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  deleteFacility: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await facilitiesService.deleteFacility(id);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  getAllFacilities: async (req, res) => {
    try {
      const rs = await facilitiesService.getAllFacilities(req.query);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }
}

export default facilitiesController;