import { useState } from "react";
import FormComponents from "./components/FormComponents";
import TableComponents from "./components/TableComponents";

function App() {
  const [userId, setUserId] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mainWrapper">
      {!isOpen && <FormComponents setIsOpen={setIsOpen} userId={userId} setUserId={setUserId} />}
      {isOpen && <TableComponents setIsOpen={setIsOpen} setUserId={setUserId} />}
    </div>
  );
}

export default App;
