// import { Request, Response, NextFunction } from "express";
// import Maintenance from "../models/Maintenance";

// export const checkMaintenanceMode = async (req: Request, res: Response, Next: NextFunction) => {
//   try {
//     // Skip maintenance check for admin routes
//     if (req.path.startsWith('/admin')) {
//       return Next();
//     }

//     const setting = await Maintenance.findOne({});
//     const isMaintenance = setting ? setting.enabled : false;

//     if (isMaintenance) {
//       // If API request, return JSON
//       if (req.path.startsWith('/api')) {
//         return res.status(503).json({
//           status: "error",
//           message: "🚧 Site is under maintenance. Please try again later.",
//           maintenance: true,
//           estimatedTime: "We'll be back soon!"
//         });
//       }
      
//       // If regular request, render maintenance page
//       return res.status(503).render('maintenance', {
//         title: "Site Under Maintenance",
//         message: "We're currently performing maintenance. Please check back soon!"
//       });
//     }

//     Next();
//   } catch (error) {
//     console.error("Maintenance middleware error:", error);
//     Next();
//   }
// };