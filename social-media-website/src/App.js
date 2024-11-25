import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import CreatePost from './components/Pages/Posts/CreatePost';
import Home from './components/Pages/Home/Home';
import Register from './components/Pages/Register/Register';
import Login from './components/Pages/Login/Login';
import Profile from './components/Pages/Profile/Profile';
import MyPosts from './components/Pages/MyPosts/MyPosts';
import ExplorePage from './components/Pages/Explore/ExplorePage';
import MyMediaPage from './components/Pages/MyMedia/MyMediaPage';
import SinglePost from './components/Pages/SinglePost/SinglePost';
import { PostsProvider } from './context/PostsContext';

function App() {

  return (
    <div className="App">
      <PostsProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/content/create" element={<CreatePost />} />
          <Route path="/content/my-posts" element={<MyPosts />} />
          <Route path="/content/post/:id" element={<SinglePost />} />
          <Route path="/content/explore" element={<ExplorePage />} />
          <Route path="/media/my-media" element={<MyMediaPage />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/profile/:userId' element={<Profile />} />
        </Routes>
      </PostsProvider>
    </div>
  );
}

export default App;
