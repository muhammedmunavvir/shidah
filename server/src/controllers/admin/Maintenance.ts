// import { Request, Response } from "express";
// import Maintenance from "../../models/Maintenance";

// export const Maintenancecontroller = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { enabled } = req.body;

//     if (typeof enabled !== "boolean") {
//       return res.status(400).json({ message: "Invalid value" });
//     }

//     await Maintenance.findOneAndUpdate(
//       {},
//       { enabled },
//       { upsert: true, new: true }
//     ).exec(); // ✅ IMPORTANT

//     return res.status(200).json({
//       status: "success",
//       enabled,
//       message: enabled
//         ? "Maintenance Mode Enabled 🚧"
//         : "Maintenance Mode Disabled 🟢",
//     });
//   } catch (error) {
//     console.error("Maintenance update error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };



// export const GetMaintenanceStatus = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const maintenance = await Maintenance.findOne({}).lean().exec();

//     res.status(200).json({
//       enabledstatus: maintenance?.enabled ?? false,
//     });
//   } catch (error) {
//     console.error("Get maintenance error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
