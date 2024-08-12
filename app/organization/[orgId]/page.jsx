// // app/organization/[organizationId]/page.js
// import { OrganizationProfile } from "@clerk/nextjs";

// export default function OrganizationManagementPage() {
//   return (
//     <div className="container">
//       <OrganizationProfile />
//     </div>
//   );
// }

// app/organization/[organizationId]/page.js
import { OrganizationProfile } from "@clerk/nextjs";

export default function OrganizationManagementPage() {
  return (
    <div className="container">
      <OrganizationProfile
        path="/organization-profile"
        routing="path"
        afterLeaveOrganizationUrl="/home"
      />
    </div>
  );
}
