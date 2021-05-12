import { useState } from "react";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import { CometChatUserListWithMessages } from "./cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import { CometChat } from "@cometchat-pro/chat";

function App() {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState("");

  // logout
  const logout = () => {
    CometChat.logout().then(
      () => {
        //Logout completed successfully
        console.log("Logout completed successfully");
        setUser(null);
      },
      (error) => {
        //Logout failed with exception
        console.log("Logout failed with exception:", { error });
      }
    );
  };

  // add friend
  const addFriend = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        appId: "324411fcdc5bd35",
        apiKey: "a660ee508bb8d428d37daf432c1bec1f529653ef",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ accepted: [phone] }),
    };

    fetch(`https://api-us.cometchat.io/v2.0/users/${user.uid}/friends`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        alert("Friend Added Successfuly!");
      })
      .catch((err) => {
        console.error(err);
        alert("Adding Friend Not Successfuly!");
      });
  };

  return (
    <main>
      <h1>Welcome to CometChat WhatsApp</h1>
      {user ? (
        <section id="chat_body">
          <button onClick={() => logout()}>Logout</button>
          <div>
            <input
              type="tel"
              required
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />{" "}
            <button onClick={(e) => addFriend(e)}>Add Friend</button>
          </div>

          <div style={{ width: "95vw", height: "500px" }}>
            <CometChatUserListWithMessages friendsOnly={true} />
          </div>
        </section>
      ) : (
        <section id="auth_forms">
          <Register setUser={setUser} />
          <Login setUser={setUser} />
        </section>
      )}
    </main>
  );
}

export default App;
