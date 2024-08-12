// // app/organization/org_2kNpuUtjdcuUyvlDUfkGZ4bEsLS/members/page.js
// "use client";

// import { useOrganization } from "@clerk/nextjs";
// import { useState, useEffect } from "react";

// export default function MemberManagementPage() {
//   const { organization, isLoaded: isOrgLoaded } = useOrganization();
//   const [userMemberships, setUserMemberships] = useState([]);

//   useEffect(() => {
//     const func = async () => {
//       if (isOrgLoaded && organization) {
//         console.log({ organization });
//         const memberships = (await organization?.getMemberships()) || [];
//         setUserMemberships(memberships);
//       }
//     };
//     func();
//   }, [organization, isOrgLoaded]);

//   const editUserRole = (userId, currentRole) => {
//     const newRole = prompt("Enter new role:", currentRole);
//     if (newRole && newRole !== currentRole) {
//       console.log(`Updating role for user ${userId} to ${newRole}`);
//       // Implement role update logic here using Clerk's API
//     }
//   };

//   const removeUserFromOrg = (userId) => {
//     const confirmRemoval = confirm(
//       "Are you sure you want to remove this user from the organization?"
//     );
//     if (confirmRemoval) {
//       console.log(`Removing user ${userId} from the organization`);
//       // Implement user removal logic here using Clerk's API
//     }
//   };

//   if (!isOrgLoaded) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="container">
//       <h1>Members of Neuromnia</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Identifier</th>
//             <th>Joined</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {userMemberships.map((mem) => (
//             <tr key={mem.id}>
//               <td>{mem?.publicUserData?.identifier || "N/A"}</td>
//               <td>{new Date(mem.createdAt).toLocaleDateString()}</td>
//               <td>{mem.role}</td>
//               <td>
//                 <button onClick={() => editUserRole(mem.userId, mem.role)}>
//                   Edit Role
//                 </button>
//                 <button onClick={() => removeUserFromOrg(mem.userId)}>
//                   Remove
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// app/organization/[organizationId]/page.js
import { OrganizationProfile } from "@clerk/nextjs";

export default function OrganizationManagementPage() {
  return (
    <div className="container">
      <OrganizationProfile />
    </div>
  );
}
