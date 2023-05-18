import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import CustomButton from "@/components/custom_button";
import CustomInput from "@/components/custom_input";

const ReimburseDetailPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const [title, setTitle] = useState<String>("");
  const [subtitle, setSubtitle] = useState<String>("");
  const [nominal, setNominal] = useState(0);
  const [review, setReview] = useState<String>("");
  const [status, setStatus] = useState<string>("");

  const [imageBase64, setImageBase64] = useState<string>();

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (userData === null) {
      router.replace("/login");
    } else {
      setUser(JSON.parse(userData));

      if (router.query.id_reimburse) {
        fetch(`/api/reimburse?id_reimburse=${router.query.id_reimburse}`)
          .then((res) => res.json())
          .then((resJSON) => {
            const { data } = resJSON;
            setTitle(data.judul);
            setSubtitle(data.keterangan);
            setNominal(data.nominal);
            setImageBase64(data.bukti_foto);
            setReview(data.komentar);
            setStatus(data.status);
          });
      }
    }
  }, [router.query.id_reimburse]);

  const submit = async (newStatus: string) => {
    if (
      title.trim() === "" ||
      subtitle.trim() === "" ||
      nominal === 0 ||
      imageBase64 === undefined
    ) {
      alert("Please fill all the fields");

      return;
    }

    if (router.query.id_reimburse) {
      let editFetch: Promise<Response>;

      if (user?.role === "Management") {
        editFetch = fetch("api/reimburse", {
          body: JSON.stringify({
            id_reimburse: Number(router.query.id_reimburse),
            id_reviewer: Number(user?.id),
            komentar: review,
            status: newStatus,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        });
      } else {
        editFetch = fetch("api/reimburse", {
          body: JSON.stringify({
            id_reimburse: Number(router.query.id_reimburse),
            id_user: user.id,
            judul: title,
            keterangan: subtitle,
            nominal,
            bukti_foto: imageBase64,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        });
      }

      editFetch!
        .then((res) => res.json())
        .then((resJSON) => {
          if (newStatus) {
            setStatus(newStatus.toString());
          }

          alert(resJSON.message);
        });
    } else {
      fetch("api/reimburse", {
        body: JSON.stringify({
          id_user: user.id,
          judul: title,
          keterangan: subtitle,
          nominal,
          bukti_foto: imageBase64,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((res) => res.json())
        .then((resJSON) => {
          alert(resJSON.message);

          router.replace(
            `/reimburse-detail?id_reimburse=${resJSON.data.id_reimburse}`
          );
        });
    }
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
            isDisabled={
              user?.role === "Management" ||
              status === "Disetujui" ||
              status === "Ditolak"
            }
            placeholder="Judul"
            width={300}
            independentPlaceholder
            margin="40px 0px 0px 0px"
            value={title}
            onChangeText={setTitle}
          />

          <CustomInput
            isDisabled={
              user?.role === "Management" ||
              status === "Disetujui" ||
              status === "Ditolak"
            }
            placeholder="Keterangan"
            width={300}
            independentPlaceholder
            margin="20px 0px 0px 0px"
            value={subtitle}
            onChangeText={setSubtitle}
          />

          <CustomInput
            isDisabled={
              user?.role === "Management" ||
              status === "Disetujui" ||
              status === "Ditolak"
            }
            placeholder="Nominal"
            width={300}
            independentPlaceholder
            margin="20px 0px 0px 0px"
            value={nominal}
            onChangeText={(value) => setNominal(Number(value))}
          />

          <div
            style={{
              color: "black",
              fontWeight: "bold",
              margin: "40px 0px 10px 0px",
            }}
          >
            Bukti Foto
          </div>

          <div
            style={{
              backgroundColor: "black",
              height: 300,
              width: 300,
              borderRadius: 10,
              position: "relative",
            }}
          >
            {imageBase64 ? (
              <img
                alt="Bukti Foto"
                src={imageBase64}
                style={{
                  objectFit: "contain",
                  height: "100%",
                  width: "100%",
                  padding: 10,
                }}
              />
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

            {user?.role === "User" &&
            status !== "Disetujui" &&
            status !== "Ditolak" ? (
              <input
                type="file"
                onChange={() => {
                  if (
                    (document as any).querySelector("input[type=file]").files
                      .length > 0
                  ) {
                    const file = (document as any).querySelector(
                      "input[type=file]"
                    ).files[0];

                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = function () {
                      setImageBase64(reader.result as any);
                    };
                  }
                }}
                accept="image/*"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  opacity: 0,
                }}
              ></input>
            ) : null}
          </div>

          {user?.role === "Management" ||
          router.query.id_reimburse !== undefined ? (
            <CustomInput
              isDisabled={
                !(user?.role === "Management" && status === "Belum Disetujui")
              }
              independentPlaceholder
              value={user?.role === "Management" ? review : review || "-"}
              placeholder="Review"
              onChangeText={setReview}
              width={300}
              margin="20px 0px 0px 0px"
            />
          ) : null}

          {router.query.id_reimburse !== undefined ? (
            <CustomInput
              isDisabled
              independentPlaceholder
              value={status}
              placeholder="Status"
              width={300}
              margin="20px 0px 0px 0px"
            />
          ) : null}
        </div>

        <div
          style={{
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            margin: "20px 0px 40px 0px",
          }}
        >
          {user?.role === "User" && router.query.id_reimburse === undefined ? (
            <CustomButton
              onClick={() => submit("Belum Disetujui")}
              label="Ajukan"
              width={300}
              margin="20px 0px 0px 0px"
            />
          ) : null}

          {user?.role === "User" &&
          router.query.id_reimburse !== undefined &&
          status === "Belum Disetujui" ? (
            <CustomButton
              onClick={() => submit(status)}
              label="Terapkan Edit"
              width={300}
              margin="20px 0px 0px 0px"
            />
          ) : null}

          {user?.role === "Management" && status === "Belum Disetujui" ? (
            <>
              <CustomButton
                onClick={() => submit("Ditolak")}
                label="Tolak"
                width={300}
                margin="20px 0px 0px 0px"
                backgroundColor="red"
              />

              <CustomButton
                onClick={() => submit("Disetujui")}
                label="Setujui"
                width={300}
                margin="20px 0px 0px 0px"
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ReimburseDetailPage;
