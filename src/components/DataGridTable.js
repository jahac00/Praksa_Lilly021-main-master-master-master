import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../css/dataGridTable.module.css"

function DataGridTable({ endpoint }) {
  const [data, setData] = useState([]);
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await axios.get(endpoint).then((response) => {
        setData(response.data.drinks);
        setHasImage(
          endpoint ===
            "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
        );
      });
    };

    getData();
  }, [endpoint]);

  const rows = data.map((row, index) => {
    const newRow = {
      id: index + 1,
      ...row,
    };

    if (hasImage && newRow.strIngredient1) {
      newRow.image = `https://www.thecocktaildb.com/images/ingredients/${newRow.strIngredient1}-Small.png`;
    }

    return newRow;
  });

  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key,
          width: 150,
        }))
      : [];

  if (hasImage) {
    columns.push({
      field: "image",
      headerName: "Image",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.image}
          alt={params.row.strIngredient1}
          style={{ width: "100%" }}
        />
      ),
    });
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
}

export default DataGridTable;