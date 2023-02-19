import Button from "@mui/material/Button";

function ClearLocalStorageButton() {
    function handleClearLocalStorage() {
      localStorage.clear();
      // add any additional code you want to run after clearing the localStorage
    }
  
    return (
      <Button variant="contained" onClick={handleClearLocalStorage}>Clear Local Storage</Button>
    );
  }

export default ClearLocalStorageButton;