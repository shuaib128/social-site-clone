import { BackendHost } from "./Api/BackendHost";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./index.css";
import "./App.css";
import "./Grid.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import PostsArcade from "./pages/PostsArcade";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import NewPost from "./pages/NewPost";
import Profile from "./pages/Profile";
import EditPage from "./pages/EditPage";
import EditForm from "./pages/EditForm";
import SettingsPage from "./pages/SettingsPage";
import SearchPage from "./pages/SearchPage";
import AnotherProfile from "./pages/AnotherProfile";

//video app section
import VideosPage from "./pages/VideosPage";
import NewVideo from "./pages/NewVideo";
import DashBordVideos from "./pages/DashBordVideos";
import DashbordVideoEditPageComponent from "./components/DashbordVideos/DashbordVideoEditPageComponent";
import DashVideoEditForm from "./components/DashbordVideos/DashVideoEditForm";
import ReadingListPage from "./pages/ReadingListPage";

//Chat page
import ChatRoom from "./pages/ChatRoom";

function App() {
  const [name, setName] = useState("");
  const [userProfileImage, setSserProfileImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profileID, setProfileID] = useState();
  const [profileData, setProfileData] = useState([]);
  const [searchDataInput, setsearchDataInput] = useState("");

  //Get user data
  useEffect(() => {
    try {
      const accestoken = localStorage.getItem("accestoken");
      const content_decoded = jwt_decode(accestoken);

      setUserEmail(content_decoded.email);
      setName(content_decoded.username);
      setProfileID(content_decoded.user_id);
    } catch {
      console.log("Wrong bra");
    }
  }, []);

  //Get profileData
  useEffect(() => {
    try {
      const accestoken = localStorage.getItem("accestoken");
      const content_decoded = jwt_decode(accestoken);
      axios
        .post(`${BackendHost}/api/user/profile`, {
          id: content_decoded.user_id,
        })
        .then((res) => {
          setProfileData(res.data);
          setSserProfileImage(res.data.image);
        });
    } catch {
      console.log("Wrong bra");
    }
  }, [name]);

  //Get all posts
  const [posts, setPost] = useState(() => {
    axios.get(`${BackendHost}/api/posts/`).then((res) => setPost(res.data));
  });

  //Search by query and get post by that qyery
  useEffect(() => {
    axios
      .get(`${BackendHost}/api/posts/post/search/?search=${searchDataInput}`)
      .then((res) => setPost(res.data));
  }, [searchDataInput]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header
          profileData={profileData}
          username={name}
          setName={setName}
          setsearchDataInput={setsearchDataInput}
          userProfileImage={userProfileImage}
          setUserEmail={setUserEmail}
          setProfileID={setProfileID}
          setProfileData={setProfileData}
          setSserProfileImage={setSserProfileImage}
          setPost={setPost}
        />

        <Route
          path="/"
          exact
          component={() => (
            <PostsArcade
              profileData={profileData}
              username={name}
              profileID={profileID}
              posts={posts}
              setPost={setPost}
            />
          )}
        />
        <Route path="/register" exact component={() => <Register />} />
        <Route
          path="/login"
          exact
          component={() => (
            <Login setName={setName} setProfileID={setProfileID} />
          )}
        />
        <Route
          path="/post/:id"
          exact
          component={() => (
            <PostDetail
              profileData={profileData}
              profileID={profileID}
              username={name}
            />
          )}
        />
        <Route
          path="/new_post/"
          exact
          component={() => (
            <NewPost
              profileID={profileID}
              username={name}
              setPost={setPost}
              posts={posts}
            />
          )}
        />
        <Route
          path="/dashbord"
          exact
          component={() => <Profile username={name} />}
        />
        <Route path="/edit/:id" exact component={() => <EditPage />} />
        <Route
          path="/edit_form/:id"
          exact
          component={() => <EditForm profileID={profileID} username={name} />}
        />
        <Route
          path="/settings"
          exact
          component={() => (
            <SettingsPage
              username={name}
              profileID={profileID}
              profileData={profileData}
              userEmail={userEmail}
            />
          )}
        />
        <Route path="/search" exact component={() => <SearchPage />} />
        <Route
          path="/user/profile/:id"
          exact
          component={() => (
            <AnotherProfile
              profileID={profileID}
              profileData={profileData}
              username={name}
            />
          )}
        />

        {/* Video paths */}
        <Route path="/videos" exact component={() => <VideosPage />} />
        <Route
          path="/new_video"
          exact
          component={() => (
            <NewVideo
              profileID={profileID}
              username={name}
              setPost={setPost}
              posts={posts}
            />
          )}
        />
        <Route
          path="/dashbord/videos"
          exact
          component={() => <DashBordVideos username={name} />}
        />
        <Route
          path="/dashbord/videos/edit/:id"
          exact
          component={() => <DashbordVideoEditPageComponent />}
        />
        <Route
          path="/edit/video/:id"
          exact
          component={() => (
            <DashVideoEditForm profileID={profileID} username={name} />
          )}
        />

        {/* Chat page */}
        <Route
          path="/chats/:str"
          exact
          component={() => (
            <ChatRoom
              profileData={profileData}
              username={name}
              profileID={profileID}
            />
          )}
        />

        <Route
          path="/readinglist"
          exact
          component={() => (
            <ReadingListPage
              profileData={profileData}
            />
          )}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
