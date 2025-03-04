const User = require('../models/User');

class UserController {
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.userData.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching profile', error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const { name, specialty, phoneNumber, address } = req.body;
      const user = await User.findById(req.userData.userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (name) user.name = name;
      if (specialty && user.role === 'doctor') user.specialty = specialty;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (address) user.address = address;

      await user.save();
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error updating profile', error: error.message });
    }
  }

  async getDoctors(req, res) {
    try {
      const doctors = await User.find({ role: 'doctor' }).select('-password');
      res.json(doctors);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching doctors', error: error.message });
    }
  }

  async getPatients(req, res) {
    try {
      // Only doctors can view patient list
      if (req.userData.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied' });
      }
      const patients = await User.find({ role: 'patient' }).select('-password');
      res.json(patients);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching patients', error: error.message });
    }
  }
}

module.exports = new UserController();
