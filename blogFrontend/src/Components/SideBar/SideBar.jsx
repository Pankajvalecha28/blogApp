import "./SideBar.css";
import sideimg from "../../Media/sidebar.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [cats, setCats] = useState([]);

  useEffect(()=>{
    const getCats = async ()=>{
      const res = await axios.get("http://localhost:5000/api/categories")
      setCats(res.data);

    };
    getCats();
  },[])
  return (
    <div className="sidebar">
      <div className="sidebaritem">
        <span className="sidebartitle">ABOUT ME</span>
        <img src={sideimg} alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
          placeat illum mollitia dolor, officia.
        </p>
      </div>
      <div className="sidebaritem">
        <span className="sidebartitle">CATEGORIES</span>
        <ul className="sidebarlist">
          {cats.map(c=>(
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarlistitem">{c.name}</li>
            </Link>
          ))}
          
          
        </ul>
      </div>
      <div className="sidebaritem">
        <span className="sidebartitle">FOLLOW US</span>
        <div className="sidebarsocial">
          <i className="sidebaricon fa-brands fa-square-facebook"></i>
          <i className="sidebaricon fa-brands fa-square-twitter"></i>
          <i className="sidebaricon fa-brands fa-square-pinterest"></i>
          <i className="sidebaricon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
}
