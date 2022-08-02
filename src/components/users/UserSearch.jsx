import { useState, useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import GithubContext from "../../context/github/GithubContext";
import { searchUsers } from "../../context/github/GithubAction";

const UserSearch = () => {
  const [text, setText] = useState("");
  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "error");
    } else {
      dispatch({
        type: "SET_LOADING",
      });
      const users = await searchUsers(text);
      dispatch({
        type: "GET_USERS",
        payload: users,
      });
      setText("");
    }
  };

  return (
    <div className="flex flex-row justify-center items-center xl:w-4/5 lg:w-4/5 md:w-4/5 mx-auto mb-8 gap-8">
      <form onSubmit={handleSubmit} className="w-full md:w-5/12 ">
        <div className="form-control">
          <div className="flex flex-row justify-center items-center">
            <input
              type="text"
              className="w-4/5 md:w-full lg:w-full bg-gray-200 input input-md  rounded-r-none text-black text-lg font-base"
              placeholder="Search"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="rounded-md rounded-l-none px-6 py-2 btn btn-md font-bold">
              Go
            </button>
          </div>
        </div>
      </form>

      {users.length > 0 && (
        <div>
          <button
            className="btn btn-ghost btn-md px-4 ml-[-24px] border-white"
            onClick={() => dispatch({ type: "CLEAR_USERS" })}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
