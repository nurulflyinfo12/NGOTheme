"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import DataTable, { Column } from "@/components/Admin/DataTable";
import { ImageCell } from "@/components/Admin/TableCells";

interface LeadershipMember {
  id: string;
  name: string;
  photo: string;
  position: string;
}

const dummyMembers: LeadershipMember[] = [
  { id: "1", name: "Jane Doe", position: "Managing Director", photo: "https://via.placeholder.com/150" },
];

export default function LeadershipTeamList() {
  const router = useRouter();
  const [members, setMembers] = useState<LeadershipMember[]>(dummyMembers);

  const handleDelete = async (member: LeadershipMember) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Remove ${member.name} from leadership?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
      Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false });
    }
  };

  const columns: Column<LeadershipMember>[] = [
    { key: "photo", header: "Photo", render: (m) => <ImageCell src={m.photo} alt={m.name} /> },
    { key: "name", header: "Name", className: "font-medium text-black" },
    { key: "position", header: "Position" },
  ];

  return (
    <DataTable<LeadershipMember>
      title="Leadership Team"
      description="Manage executive and leadership members"
      data={members}
      columns={columns}
      searchKeys={["name", "position"]}
      addButtonLabel="Add Member"
      onAdd={() => router.push("/admin/leadership-team/add")}
      onEdit={(m) => {
        localStorage.setItem("tempLeadershipData", JSON.stringify(m));
        router.push(`/admin/leadership-team/add?id=${m.id}`);
      }}
      onDelete={handleDelete}
      getRowId={(m) => m.id}
      showActions
    />
  );
}