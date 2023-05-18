import moment from "moment";

type ReimburseListItemComponentType = {
  title: string;
  subtitle: string;
  status: "Belum Disetujui" | "Disetujui" | "Ditolak";
  date: Date;
  nominal: number;
  onClick?: () => void;
};

const ReimburseListItem = ({
  title,
  subtitle,
  status,
  date,
  nominal,
  onClick,
}: ReimburseListItemComponentType) => {
  const getStatusLabelColor = () => {
    let statusLabelColor = "goldenrod";

    if (status === "Disetujui") {
      statusLabelColor = "green";
    } else if (status === "Ditolak") {
      statusLabelColor = "red";
    }

    return statusLabelColor;
  };

  return (
    <a
      onClick={onClick}
      style={{
        color: "black",
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        width: 300,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
          }}
        >
          {title}
        </div>

        <div>{moment(date).format("DD/MM/YYYY")}</div>
      </div>

      <div
        style={{
          margin: "20px 0px 20px 0px",
        }}
      >
        {subtitle}
      </div>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
          }}
        >
          Rp. {nominal}
        </div>

        <div
          style={{
            color: getStatusLabelColor(),
            fontWeight: "bold",
          }}
        >
          {status}
        </div>
      </div>
    </a>
  );
};

export default ReimburseListItem;
