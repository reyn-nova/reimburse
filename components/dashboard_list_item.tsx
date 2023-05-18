type DashboardListItemComponentType = {
  name: string;
  usedAllocation: number;
  allocation: number;
  onClick?: () => void;
};

const DashboardListItem = ({
  name,
  usedAllocation,
  allocation,
  onClick,
}: DashboardListItemComponentType) => {
  return (
    <a
      style={{
        color: "black",
        width: 300,
        marginTop: 20,
        borderBottom: "2px solid black",
        paddingBottom: 10,
      }}
      onClick={onClick}
    >
      <div
        style={{
          fontWeight: "bold",
        }}
      >
        {name}
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 5,
        }}
      >
        <div>Rp. {usedAllocation.toLocaleString()}</div>

        <div
          style={{
            margin: "0px 5px 0px 5px",
          }}
        >
          {"/"}
        </div>

        <div>Rp. {allocation.toLocaleString()} Terpakai</div>
      </div>
    </a>
  );
};

export default DashboardListItem;
