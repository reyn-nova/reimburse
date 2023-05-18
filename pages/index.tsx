import { useRouter } from "next/router";

import CustomButton from "@/components/custom_button";
import ReimburseListItem from "@/components/reimburse_list_item";

const HomePage = () => {
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
          Reimburse
        </h1>

        <a
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "black",
            position: "absolute",
            right: 40,
            top: 40,
          }}
        >
          +
        </a>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            flexGrow: 1,
          }}
        >
          <ReimburseListItem
            title="Lampu Kantor"
            subtitle="Pembelian lampu kantor sebanyak 3 buah"
            nominal={75000}
            status="Belum Disetujui"
            date={new Date()}
          />

          <ReimburseListItem
            title="Sapu Kantor"
            subtitle="Pembelian sapu kantor sebanyak 1 buah"
            nominal={55000}
            status="Disetujui"
            date={new Date()}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: 40,
            paddingTop: 40,
          }}
        >
          <CustomButton label="Logout" backgroundColor="red" width={300} />

          <div
            style={{
              marginTop: 20,
            }}
          >
            <CustomButton
              label="Lihat Dashboard"
              backgroundColor="deepskyblue"
              width={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
