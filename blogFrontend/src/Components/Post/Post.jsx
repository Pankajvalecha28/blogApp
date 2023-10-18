import "./Post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/";
  console.log(PF)

  return (
    <div className="post">
      
      
      {post.photo && (  // Check if 'post.photo' exists
        <img className="postimg" src={PF + post.photo} alt="" /> // Display the image
      )}
      <div className="postinfo">
        <div className="postcats">
          {post.categories.map((c) => (
            <span className="postcat" key={c._id}>{c.name}</span> // Add a unique 'key' prop for each element in the map
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="posttitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postdate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postdesc">{post.desc}</p>
    </div>
  );
}
