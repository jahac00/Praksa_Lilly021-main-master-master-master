import DataGridTable from "../components/DataGridTable";

function Categories() {
  const endpoint =
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  return (
    <div>
      <DataGridTable endpoint={endpoint}></DataGridTable>
    </div>
  );
}

export default Categories;
