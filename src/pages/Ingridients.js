import DataGridTable from "../components/DataGridTable";

function Ingridients() {
  const endpoint =
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
  return (
    <div>
      <DataGridTable endpoint={endpoint}></DataGridTable>
    </div>
  );
}

export default Ingridients;
