// import { OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs";
// import Link from "next/link";

// export default function OrganizationPage() {
//   return (
//     <div className="container">
//       <h1>Neuromnia Organization Management</h1>
//       <OrganizationSwitcher
//         afterSwitchOrganizationUrl="/organization/org_2kNpuUtjdcuUyvlDUfkGZ4bEsLS/members"
//         afterLeaveOrganizationUrl="/organization/org_2kNpuUtjdcuUyvlDUfkGZ4bEsLS/members"
//         organizationProfileMode="navigation"
//       />
//       {/* <OrganizationProfile /> */}
//     </div>
//   );
// }

// app/organization/page.js (or wherever you are rendering this)
import { OrganizationProfile } from "@clerk/nextjs";

export default function OrganizationManagementPage() {
  return (
    <div className="container">
      <OrganizationProfile
        path="/organization-profile"
        // routing="path"
        afterLeaveOrganizationUrl="/home"
      />
    </div>
  );
}
// "use client";
// import { useClerk, useOrganization } from "@clerk/nextjs";

// export default async function AdminPanel() {
//   const { organization } = useOrganization();
//   const { userManagement } = useClerk();
//   const memberships = await organization?.getMemberships();
//   //   console.log({ organization, memberships });

//   const resetPassword = async (userId) => {
//     // This is pseudo-code; Clerk doesn't have a direct "reset password" API endpoint.
//     await userManagement.updateUser(userId, { password: "newPassword" });
//   };

//   return (
//     <div>
//       <h1>Admin Panel for {organization?.name}</h1>
//       <ul>
//         {memberships?.map((member) => (
//           <li key={member.id}>
//             {/* {member.publicUserData?.firstName} {member.publicUserData?.lastName} */}
//             <button onClick={() => resetPassword(member.id)}>
//               Reset Password
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
