import { useRouter } from "next/router";

import CustomButton from "@/components/custom_button";
import CustomInput from "@/components/custom_input";

const ReimburseDetailPage = () => {
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
          Reimburse Detail
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
            placeholder="Judul"
            width={300}
            independentPlaceholder
            margin="40px 0px 0px 0px"
          />

          <CustomInput
            placeholder="Keterangan"
            width={300}
            independentPlaceholder
            margin="20px 0px 0px 0px"
          />

          <CustomInput
            placeholder="Nominal"
            width={300}
            independentPlaceholder
            margin="20px 0px 0px 0px"
          />

          <div
            style={{
              backgroundColor: "gray",
              height: 300,
              width: 300,
              borderRadius: 10,
              margin: "40px 0px 0px 0px",
            }}
          >
            {true ? (
              <img
                src="https://qph.cf2.quoracdn.net/main-qimg-dadd96b4b2b80ecd15699565c627ac25-lq"
                style={{
                  objectFit: "contain",
                  height: "100%",
                  width: "100%",
                }}
              ></img>
            ) : (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 72,
                  fontWeight: "bold",
                }}
              >
                +
              </div>
            )}
          </div>
        </div>

        <CustomInput
          independentPlaceholder
          value="Test"
          placeholder="Review"
          width={300}
          margin="20px 0px 0px 0px"
        />

        <div
          style={{
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            margin: "20px 0px 40px 0px",
          }}
        >
          <CustomButton label="Ajukan" width={300} margin="20px 0px 0px 0px" />

          <CustomButton
            label="Terapkan Edit"
            width={300}
            margin="20px 0px 0px 0px"
          />

          <CustomButton
            label="Tolak"
            width={300}
            margin="20px 0px 0px 0px"
            backgroundColor="red"
          />

          <CustomButton label="Setujui" width={300} margin="20px 0px 0px 0px" />
        </div>
      </div>
    </div>
  );
};

export default ReimburseDetailPage;
