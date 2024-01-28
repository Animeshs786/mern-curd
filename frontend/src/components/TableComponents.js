import { useEffect, useState } from "react";

function TableComponents({ setUserId, setIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/v1/user`);
        const data = await res.json();
        setUser(data.data.user);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUser();
  }, []);

  const editHandler = (id) => {
    setUserId(id);
    setIsOpen((prev) => !prev);
  };

  const removeUserHandler = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/v1/user/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      await res.json();
      setIsLoading(false);
      setUser((prev) => [...prev].filter((item) => item._id !== id));
      console.log(user)
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return "Loading....";

  return (
    <main>
      <section className="tableWrapper">
        <button
          className="createBtn"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Add
        </button>
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((el, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{el.name} </td>
                <td>{el.email}</td>
                <td>
                  <button onClick={() => editHandler(el._id)}>Edit</button>
                  <button onClick={() => removeUserHandler(el._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default TableComponents;
