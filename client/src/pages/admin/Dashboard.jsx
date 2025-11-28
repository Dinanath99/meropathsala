// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const Dashboard = () => {

//   const {data, isSuccess, isError, isLoading} = useGetPurchasedCoursesQuery();

//   if(isLoading) return <h1>Loading...</h1>
//   if(isError) return <h1 className="text-red-500">Failed to get purchased course</h1>

//   //
//   const {purchasedCourse} = data || [];

//   const courseData = purchasedCourse.map((course)=> ({
//     name:course.courseId.courseTitle,
//     price:course.courseId.coursePrice
//   }))

//   const totalRevenue = purchasedCourse.reduce((acc,element) => acc+(element.amount || 0), 0);

//   const totalSales = purchasedCourse.length;
//   return (
//     <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader>
//           <CardTitle>Total Sales</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
//         </CardContent>
//       </Card>

//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader>
//           <CardTitle>Total Revenue</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-3xl font-bold text-blue-600">{totalRevenue}</p>
//         </CardContent>
//       </Card>

//       {/* Course Prices Card */}
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold text-gray-700">
//             Course Prices
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={courseData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//               <XAxis
//                 dataKey="name"
//                 stroke="#6b7280"
//                 angle={-30} // Rotated labels for better visibility
//                 textAnchor="end"
//                 interval={0} // Display all labels
//               />
//               <YAxis stroke="#6b7280" />
//               <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
//               <Line
//                 type="monotone"
//                 dataKey="price"
//                 stroke="#4a90e2" // Changed color to a different shade of blue
//                 strokeWidth={3}
//                 dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;


// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const Dashboard = () => {
//   const {data, isSuccess, isError, isLoading} = useGetPurchasedCoursesQuery();

//   if(isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
//         </div>
//       </div>
//     );
//   }

//   if(isError) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center p-6 bg-white rounded-lg shadow-lg border-2 border-red-200">
//           <h1 className="text-xl font-semibold text-red-600">Failed to get purchased course</h1>
//           <p className="text-gray-600 mt-2">Please try again later</p>
//         </div>
//       </div>
//     );
//   }

//   const {purchasedCourse} = data || [];

//   const courseData = purchasedCourse.map((course) => ({
//     name: course.courseId.courseTitle,
//     price: course.courseId.coursePrice
//   }));

//   const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);
//   const totalSales = purchasedCourse.length;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {/* Total Sales Card */}
//           <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 bg-white">
//             <CardHeader>
//               <CardTitle className="text-gray-800">Total Sales</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
//               <p className="text-sm text-gray-500 mt-2">Total courses sold</p>
//             </CardContent>
//           </Card>

//           {/* Total Revenue Card */}
//           <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 bg-white">
//             <CardHeader>
//               <CardTitle className="text-gray-800">Total Revenue</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
//               <p className="text-sm text-gray-500 mt-2">Total earnings</p>
//             </CardContent>
//           </Card>

//           {/* Average Price Card */}
//           <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 bg-white">
//             <CardHeader>
//               <CardTitle className="text-gray-800">Average Price</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold text-purple-600">
//                 ₹{totalSales > 0 ? Math.round(totalRevenue / totalSales).toLocaleString() : 0}
//               </p>
//               <p className="text-sm text-gray-500 mt-2">Per course</p>
//             </CardContent>
//           </Card>

//           {/* Active Courses Card */}
//           <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 bg-white">
//             <CardHeader>
//               <CardTitle className="text-gray-800">Active Courses</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold text-orange-600">
//                 {courseData.length}
//               </p>
//               <p className="text-sm text-gray-500 mt-2">Courses available</p>
//             </CardContent>
//           </Card>

//           {/* Course Prices Chart Card */}
//           <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 bg-white col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold text-gray-800">
//                 Course Prices Overview
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               {courseData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={courseData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
//                     <XAxis
//                       dataKey="name"
//                       stroke="#374151"
//                       angle={-30}
//                       textAnchor="end"
//                       interval={0}
//                       style={{ fontSize: '12px' }}
//                       height={100}
//                     />
//                     <YAxis 
//                       stroke="#374151" 
//                       style={{ fontSize: '12px' }}
//                       tickFormatter={(value) => `₹${value}`}
//                     />
//                     <Tooltip 
//                       formatter={(value) => [`₹${value}`, 'Price']}
//                       contentStyle={{ 
//                         backgroundColor: '#fff', 
//                         border: '1px solid #d1d5db',
//                         borderRadius: '8px',
//                         padding: '8px'
//                       }}
//                       labelStyle={{ color: '#374151', fontWeight: 'bold' }}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="price"
//                       stroke="#2563eb"
//                       strokeWidth={3}
//                       dot={{ stroke: "#2563eb", strokeWidth: 2, fill: "#fff", r: 5 }}
//                       activeDot={{ r: 8 }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="flex items-center justify-center h-64">
//                   <p className="text-gray-500">No course data available</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg border-2 border-red-200">
          <h1 className="text-xl font-semibold text-red-600">Failed to get purchased course</h1>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const { purchasedCourse } = data || [];

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));

  const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);
  const totalSales = purchasedCourse.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Total Sales Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-gray-800">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
              <p className="text-sm text-gray-500 mt-2">Total courses sold</p>
            </CardContent>
          </Card>

          {/* Total Revenue Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-gray-800">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                Rs {totalRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">Total earnings</p>
            </CardContent>
          </Card>

          {/* Average Price Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-gray-800">Average Price</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600">
                Rs {totalSales > 0 ? Math.round(totalRevenue / totalSales).toLocaleString() : 0}
              </p>
              <p className="text-sm text-gray-500 mt-2">Per course</p>
            </CardContent>
          </Card>

          {/* Active Courses Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-gray-800">Active Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600">{courseData.length}</p>
              <p className="text-sm text-gray-500 mt-2">Courses available</p>
            </CardContent>
          </Card>

          {/* Course Prices Chart Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 bg-white col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Course Prices Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {courseData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={courseData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                    <XAxis
                      dataKey="name"
                      stroke="#374151"
                      angle={-30}
                      textAnchor="end"
                      interval={0}
                      style={{ fontSize: '12px' }}
                      height={100}
                    />
                    <YAxis 
                      stroke="#374151" 
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `Rs ${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`Rs ${value}`, 'Price']}
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '8px'
                      }}
                      labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ stroke: "#2563eb", strokeWidth: 2, fill: "#fff", r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">No course data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
