// src/app/(admin)/admin/page.tsx

import ManageSkill from "@/src/components/admin/ManageSkill"
//import AddProject from "@/src/components/admin/AddProject"
import ManageProject from "@/src/components/admin/ManageProject"

export default async function AdminPage() {
  return (
    <div>
      <ManageProject />
      <ManageSkill />    
    </div>
  );
}