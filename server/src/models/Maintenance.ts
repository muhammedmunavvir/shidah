import mongoose from "mongoose";

const MaintenanceSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Maintenance ||
  mongoose.model("Maintenance", MaintenanceSchema);
