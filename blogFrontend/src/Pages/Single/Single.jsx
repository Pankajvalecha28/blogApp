import SideBar from '../../Components/SideBar/SideBar'
import SinglePost from '../../Components/Singlepost/SinglePost'
import './Single.css'

export default function Single() {
  return (
    <div className='single'>
        <SinglePost/>
        <SideBar/>
      
    </div>
  )
}
