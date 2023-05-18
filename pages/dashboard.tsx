import { useRouter } from "next/router";

import DashboardListItem from "@/components/dashboard_list_item";

const DashboardPage = () => {
  const router = useRouter();

  return (
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
          <DashboardListItem
            name="Diki"
            usedAllocation={25000}
            allocation={75000}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
