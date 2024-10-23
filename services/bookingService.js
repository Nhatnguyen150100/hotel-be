const bookingService = {
  createBooking: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { roomId, name, email, phoneNumber, startDate, endDate, adults, children } = data;
        const checkIsBooking = await db.UserBooking.findOne({
          where: {
            userId,
            scheduleId,
          },
        });
        if (checkIsBooking) {
          return reject(
            new BaseErrorResponse({
              message: "Booking already exists",
            })
          );
        }
        const newBooking = await db.UserBooking.create(data);
        resolve({ status: 200, message: "Booking created successfully", data: newBooking });
      } catch (error) {
        reject(new BaseErrorResponse({ message: error.message, status: 500 }));
      }
    });
  }
}