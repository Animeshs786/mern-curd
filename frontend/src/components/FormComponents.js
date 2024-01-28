import { useEffect, useState } from "react";

function FormComponents({ userId, setUserId, setIsOpen }) {
  const initialState = {
    name: "",
    email: "",
  };

  const [field, setField] = useState(initialState);

  useEffect(() => {
    if (!userId) return;
    const controller = new AbortController();
    const signal = controller.signal;

    const getUser = async () => {
      try {
        const res = await fetch(`/api/v1/user/${userId}`, { signal });
        const data = await res.json();
        const {
          data: { user },
        } = data;
        setField((prev) => {
          return { ...prev, name: user.name, email: user.email };
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    getUser();

    return () => {
      controller.abort();
    };
  }, [userId]);

  const nameHandler = (name) => {
    setField((prev) => {
      return { ...prev, name };
    });
  };

  const emailHandler = (email) => {
    setField((prev) => {
      return { ...prev, email };
    });
  };

  const closeHandler = () => {
    setIsOpen((prev) => !prev);
    setUserId("");
  };

  // On Submit form
  const formHandler = async (e) => {
    e.preventDefault();

    if (!field.name || !field.email) return;

    //create new user
    if (!userId) {
      try {
        const res = await fetch("/api/v1/user", {
          method: "POST",
          body: JSON.stringify({ name: field.name, email: field.email }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status !== "success") throw new Error(data.message);
        setIsOpen((prev) => !prev);
      } catch (err) {
        console.log(err.message);
      }
    }

    //user update
    if (userId) {
      try {
        const res = await fetch(`/api/v1/user/${userId}`, {
          method: "PATCH",
          body: JSON.stringify(field),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status !== "success") throw new Error(data.message);
        setIsOpen(true);
        setUserId("");
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="formWrapper">
      <form onSubmit={formHandler}>
        <span className="backBtn" onClick={closeHandler}>
          x
        </span>
        <div className="fieldsSection">
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => nameHandler(e.target.value)}
            value={field.name}
            required
          />
        </div>
        <div className="fieldsSection">
          <label>Email</label>
          <input
            type="email"
            value={field.email}
            onChange={(e) => emailHandler(e.target.value)}
            required
          />
        </div>
        <div className="btnWrapper">
          <button onClick={() => setField(initialState)} type="reset">
            Clear
          </button>
          <button type="submit">{userId ? "Update" : "Create"}</button>
        </div>
      </form>
    </div>
  );
}

export default FormComponents;
