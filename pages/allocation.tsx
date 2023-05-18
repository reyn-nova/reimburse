import { useEffect } from "react";
import { useRouter } from "next/router";

import CustomButton from "@/components/custom_button";
import CustomInput from "@/components/custom_input";

const AllocationPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("userData") === null) {
      router.replace("/login");
    }
  }, []);

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
          Diki
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
            width={300}
            independentPlaceholder
            margin="40px 0px 0px 0px"
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
            label="Perbarui"
            width={300}
            margin="20px 0px 0px 0px"
          />
        </div>
      </div>
    </div>
  );
};

export default AllocationPage;
