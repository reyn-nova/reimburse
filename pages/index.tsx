import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import CustomButton from "@/components/custom_button";
import ReimburseListItem from "@/components/reimburse_list_item";

const HomePage = () => {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (userData === null) {
      router.replace("/login");
    } else {
      fetch("api/reimburse")
        .then((res) => res.json())
        .then((resJSON) => setList(resJSON.data));

      setUser(JSON.parse(userData));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userData");

    router.replace("/login");
  };

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
            position: "relative",
          }}
        >
          <h1
            style={{
              color: "black",
            }}
          >
            Reimburse
          </h1>

          {user?.role === "User" ? (
            <Link
              href="/reimburse-detail"
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
            </Link>
          ) : null}
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
            {list.map((item) => {
              return (
                <ReimburseListItem
                  onClick={() =>
                    router.push(
                      `/reimburse-detail?id_reimburse=${item.id_reimburse}`
                    )
                  }
                  key={item.id_reimburse}
                  title={item.judul}
                  subtitle={item.keterangan}
                  nominal={item.nominal}
                  status={item.status}
                  date={new Date(item.tanggal)}
                />
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: 40,
              paddingTop: 40,
            }}
          >
            <CustomButton
              label="Logout"
              backgroundColor="red"
              width={300}
              onClick={logout}
            />

            {user?.role === "Management" ? (
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <CustomButton
                  onClick={() => router.push("/dashboard")}
                  label="Lihat Dashboard"
                  backgroundColor="deepskyblue"
                  width={300}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
