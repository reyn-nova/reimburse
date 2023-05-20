import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DashboardListItem from "@/components/dashboard_list_item";

const DashboardPage = () => {
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (localStorage.getItem("userData") === null) {
      router.replace("/login");
    } else {
      fetch("/api/user")
        .then((res) => res.json())
        .then((resJSON) => setUsers(resJSON.users));
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          backgroundColor: "gainsboro",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: "100vh",
          maxWidth: 600,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 40,
          }}
        >
          <h1
            style={{
              color: "black",
            }}
          >
            Dashboard
          </h1>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            flex: 1,
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              paddingTop: 20,
              paddingBottom: 40,
            }}
          >
            {users.map((user) => {
              return (
                <DashboardListItem
                  onClick={() => router.push(`/allocation?id_user=${user.id}`)}
                  key={user.id}
                  name={user.name}
                  usedAllocation={user.alokasi_terpakai}
                  allocation={user.nominal_alokasi}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
