import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import CustomButton from "@/components/custom_button";
import CustomInput from "@/components/custom_input";

const LoginPage = () => {
  const router = useRouter();
  const [name, setName] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      router.replace("/");
    }
  }, []);

  const login = () => {
    fetch("api/user", {
      body: JSON.stringify({
        name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((resJSON) => {
        const { user } = resJSON;

        if (user) {
          if (password === user.password) {
            alert(resJSON.message);

            localStorage.setItem(
              "userData",
              JSON.stringify({
                ...user,
                password: undefined,
              })
            );

            router.replace("/");
          } else {
            alert("Wrong password");
          }
        } else {
          alert(resJSON.message);
        }
      });
  };

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
        <CustomInput placeholder="Name" width={300} onChangeText={setName} />

        <CustomInput
          placeholder="Password"
          type="password"
          width={300}
          margin="20px 0px 0px 0px"
          onChangeText={setPassword}
        />

        <CustomButton
          onClick={login}
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
