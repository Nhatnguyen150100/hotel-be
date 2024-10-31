import bookingService from "../services/bookingService";

const bookingController = {
  createBooking: async (req, res) => {
    try {
      const rs = await bookingService.createBooking(req.body);
      res.status(rs.status).json({ message: rs.message, data: rs.data });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
  getAllBooking: async (req, res) => {
    try {
      const rs = await bookingService.getAllBooking(req.query);
      res.status(rs.status).json({ message: rs.message, data: rs.data });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};


export default bookingController;