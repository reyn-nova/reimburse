import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import CustomButton from "@/components/custom_button";
import CustomInput from "@/components/custom_input";

const AllocationPage = () => {
  const router = useRouter();

  const [selectedUser, setSelectedUser] = useState<any>();
  const [allocation, setAllocation] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("userData") === null) {
      router.replace("/login");
    } else {
      fetch(`/api/user?id_user=${router.query.id_user}`)
        .then((res) => res.json())
        .then((resJSON) => {
          setAllocation(resJSON.user.nominal_alokasi);
          setSelectedUser(resJSON.user);
        });
    }
  }, []);

  const updateAllocation = () => {
    fetch("/api/user", {
      body: JSON.stringify({
        id_user: selectedUser.id,
        nominal_alokasi: allocation,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    })
      .then((res) => res.json())
      .then((resJSON) => alert(resJSON.message));
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
          }}
        >
          <h1
            style={{
              color: "black",
            }}
          >
            {selectedUser?.name}
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
            }}
          >
            <CustomInput
              placeholder="Nominal Alokasi"
              value={allocation}
              width={300}
              independentPlaceholder
              margin="40px 0px 0px 0px"
              onChangeText={(value) => setAllocation(Number(value))}
            />
          </div>

          <div
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              margin: "20px 0px 40px 0px",
            }}
          >
            <CustomButton
              onClick={updateAllocation}
              label="Perbarui"
              width={300}
              margin="20px 0px 0px 0px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationPage;
