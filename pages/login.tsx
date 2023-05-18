import { useRouter } from "next/router";

import CustomButton from "@/components/custom_button";
import CustomInput from "@/components/custom_input";

const LoginPage = () => {
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
      </div>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CustomInput placeholder="Username" width={300} />

        <CustomInput
          placeholder="Password"
          type="password"
          width={300}
          margin="20px 0px 0px 0px"
        />

        <CustomButton
          onClick={() => router.replace("/")}
          label="Login"
          width={300}
          margin="40px 0px 0px 0px"
        />
      </div>

      <div
        style={{
          alignItems: "center",
          color: "black",
          display: "flex",
          justifyContent: "center",
          padding: 20,
        }}
      >
        Belum punya akun?
        <a
          style={{
            color: "navy",
            fontWeight: "bold",
            marginLeft: 5,
          }}
          href="mailto:rynvva@gmail.com"
        >
          Hubungi admin
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
