import { Request, Response } from "express";
import Maintenance from "../../models/Maintenance";

export const Maintenancecontroller = async (req: Request, res: Response) => {
  try {
    const { enabled } = req.body;
    console.log(enabled)

    if (typeof enabled !== "boolean") {
      return res.status(400).json({ message: "Invalid value" });
    }

    await Maintenance.findOneAndUpdate(
      {},
      { enabled },
      { upsert: true }
    );

    return res.status(200).json({
      status: "success",
      enabled,
      message: enabled
        ? "Maintenance Mode Enabled 🚧"
        : "Maintenance Mode Disabled 🟢",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const GetMaintenanceStatus = async (req: Request, res: Response) => {
  try {
    const enabled = await Maintenance.findOne({});
    console.log(enabled,"setting")
    
    res.status(200).json({ enabledstatus:enabled });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
