import './Header.css';
import himg from '../../Media/blog.jpg'

export default function Header() {
  return (
    <div className='header'>
        <div className="headertitles">
            <span className="headertitlesm">React & Node</span>
            <span className="headertitlelg">Blog</span>
        </div>
        <img className='headerimg' src={himg} alt="" />
      
    </div>
  )
}
