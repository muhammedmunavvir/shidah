// "use client";

// import { useEffect, useState } from "react";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogFooter,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogAction,
//   AlertDialogCancel,
// } from "@/components/ui/alert-dialog";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { fetchmaintennancestatus, updateMaintenance } from "@/api/adminapi";

// export default function MaintainenceSettings() {
//   const [maintenance, setMaintenance] = useState<boolean | null>(null);
//   const [pendingValue, setPendingValue] = useState<boolean | null>(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const getStatus = async () => {
//     try {
//       setIsLoading(true);
//       const data = await fetchmaintennancestatus();
//       console.log("API Response data:", data, "maintainstatus");
      
//       // Set the maintenance state with the enabled value
//       // Handle both response structures for safety
//       if (data.enabledstatus && typeof data.enabledstatus.enabled === 'boolean') {
//         setMaintenance(data.enabledstatus.enabled);
//       } else if (typeof data.enabled === 'boolean') {
//         setMaintenance(data.enabled);
//       } else {
//         console.warn("Unexpected response structure:", data);
//         setMaintenance(false); // Default to false if data is malformed
//       }
      
//     } catch (error) {
//       console.error("Error fetching maintenance status:", error);
//       toast.error("Error loading maintenance status");
//       setMaintenance(false); // Default to false on error
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getStatus();
//   }, []);

//   const updateStatus = async (value: boolean) => {
//     try {
//       setIsUpdating(true);
//       const data = await updateMaintenance(value);
//       console.log("Update response data:", data);
      
//       // Update state based on response
//       if (typeof data.enabled === 'boolean') {
//         setMaintenance(data.enabled);
//       } else {
//         setMaintenance(value); // Fallback to the value we tried to set
//       }
      
//       toast.success(
//         data.message || (value ? "Maintenance Enabled 🚧" : "Maintenance Disabled 🟢")
//       );
//     } catch (error: any) {
//       console.error("Error updating maintenance status:", error);
//       toast.error(error.message || "Failed to update maintenance status");
//       // Revert to previous state on error
//       getStatus(); // Refresh status from server
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const handleSwitchChange = (val: boolean) => {
//     if (isLoading || isUpdating || maintenance === null) return; // Don't allow changes while loading/updating

//     // Store the intended value and open dialog
//     setPendingValue(val);
//     setDialogOpen(true);
//   };

//   const handleConfirm = () => {
//     if (pendingValue !== null) {
//       updateStatus(pendingValue);
//     }
//     setDialogOpen(false);
//     setPendingValue(null);
//   };

//   const handleCancel = () => {
//     setDialogOpen(false);
//     setPendingValue(null);
//   };

//   return (
//     <div className="container mx-auto py-10 space-y-10">
//       <h1 className="text-3xl font-bold">
//         Admin Settings 
//         {maintenance === true && " 🚧"}
//         {maintenance === false && " 🟢"}
//         {maintenance === null && " (Loading...)"}
//       </h1>
//       <Separator />

//       <Card className="max-w-lg border border-neutral-200 bg-white dark:bg-black">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold">
//             Maintenance Mode
//             {isLoading && (
//               <span className="ml-2 text-sm font-normal text-gray-500">
//                 <Loader2 className="inline h-4 w-4 animate-spin" /> Loading...
//               </span>
//             )}
//             {isUpdating && !isLoading && (
//               <span className="ml-2 text-sm font-normal text-gray-500">
//                 <Loader2 className="inline h-4 w-4 animate-spin" /> Updating...
//               </span>
//             )}
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="flex items-center justify-between">
//           <div className="flex flex-col space-y-2">
//             <Label className="text-sm">Toggle maintenance mode</Label>
//             {maintenance !== null && (
//               <span className={`text-xs ${maintenance ? 'text-amber-600' : 'text-green-600'}`}>
//                 Current status: {maintenance ? "Enabled 🚧" : "Disabled 🟢"}
//               </span>
//             )}
//             {maintenance === null && (
//               <span className="text-xs text-gray-500">Loading status...</span>
//             )}
//           </div>

//           <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
//             <AlertDialogTrigger asChild>
//               <div className="relative">
//                 {isLoading || isUpdating ? (
//                   <div className="h-6 w-11 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//                     <Loader2 className="h-4 w-4 animate-spin text-gray-500 dark:text-gray-400" />
//                   </div>
//                 ) : (
//                   <Switch
//                     checked={maintenance === true}
//                     disabled={isLoading || isUpdating || maintenance === null}
//                     onCheckedChange={handleSwitchChange}
//                     aria-label="Toggle maintenance mode"
//                   />
//                 )}
//               </div>
//             </AlertDialogTrigger>

//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>
//                   {pendingValue
//                     ? "Enable Maintenance Mode?"
//                     : "Disable Maintenance Mode?"}
//                 </AlertDialogTitle>

//                 <AlertDialogDescription>
//                   {pendingValue
//                     ? "Your website will become unavailable for users until you turn this off."
//                     : "Website will be back online for all users."}
//                   <br /><br />
//                   <strong>Current status:</strong> {maintenance ? "Enabled" : "Disabled"}
//                   <br />
//                   <strong>New status:</strong> {pendingValue ? "Enabled" : "Disabled"}
//                 </AlertDialogDescription>
//               </AlertDialogHeader>

//               <AlertDialogFooter>
//                 <AlertDialogCancel onClick={handleCancel} disabled={isUpdating}>
//                   Cancel
//                 </AlertDialogCancel>

//                 <AlertDialogAction 
//                   onClick={handleConfirm}
//                   disabled={isUpdating}
//                   className={pendingValue ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"}
//                 >
//                   {isUpdating ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Updating...
//                     </>
//                   ) : (
//                     "Confirm"
//                   )}
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         </CardContent>
//       </Card>
      
//       {/* Debug info - remove in production */}
//       <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-sm">
//         <h3 className="font-semibold mb-2">Debug Information:</h3>
//         <p>Loading: {isLoading.toString()}</p>
//         <p>Updating: {isUpdating.toString()}</p>
//         <p>Maintenance Status: {maintenance === null ? "null" : maintenance.toString()}</p>
//         <p>Pending Value: {pendingValue === null ? "null" : pendingValue.toString()}</p>
//         <button 
//           onClick={getStatus}
//           className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
//           disabled={isLoading}
//         >
//           {isLoading ? "Loading..." : "Refresh Status"}
//         </button>
//       </div>
//     </div>
//   );
// }