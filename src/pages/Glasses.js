import DataGridTable from "../components/DataGridTable";

function Glasses() {
  const endpoint =
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list";
  return (
    <div>
      <DataGridTable endpoint={endpoint}></DataGridTable>
    </div>
  );
}

export default Glasses;
