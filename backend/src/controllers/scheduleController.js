const Schedule = require('../models/Schedule');
const User = require('../models/User');

class ScheduleController {
  async setAvailability(req, res) {
    try {
      const { availableSlots } = req.body;

      if (req.userData.role !== 'doctor') {
        return res
          .status(403)
          .json({ message: 'Only doctors can set availability' });
      }

      let schedule = await Schedule.findOne({ doctorId: req.userData.userId });

      if (!schedule) {
        schedule = new Schedule({
          doctorId: req.userData.userId,
          availableSlots: availableSlots,
        });
      } else {
        schedule.availableSlots = availableSlots;
      }

      await schedule.save();
      res.json(schedule);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error setting availability', error: error.message });
    }
  }

  async getAvailability(req, res) {
    try {
      const schedule = await Schedule.findOne({
        doctorId: req.params.doctorId,
      });
      if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }
      res.json(schedule);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching availability', error: error.message });
    }
  }

  async getAvailableSlots(req, res) {
    try {
      const schedule = await Schedule.findOne({
        doctorId: req.params.doctorId,
      });
      if (!schedule) {
        return res.status(404).json({ message: 'No available slots found' });
      }

      // Filter out past slots and booked slots
      const now = new Date();
      const availableSlots = schedule.availableSlots.filter(
        (slot) => new Date(slot.startTime) > now && !slot.isBooked
      );

      res.json(availableSlots);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching slots', error: error.message });
    }
  }
}

module.exports = new ScheduleController();
