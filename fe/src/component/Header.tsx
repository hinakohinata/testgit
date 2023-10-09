import React from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/redux/hook';
import { logout, selectIsLoggedIn} from '@/redux/slices/userSlice';
// import { useSelector } from 'react-redux';
import cookie from "cookie";
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const username = useSelector(selectUsername);
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // alert(username+" "+isLoggedIn)
  // const cookies = parseCookies(); 
  // const tokenCookie = cookies.token;
  // const username = cookies.username;
  // const tokenCookie = cookie.parse(document.cookie).token;
  // if (username==null) {
  //   alert(username)
  //   window.location.href = '/'; // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
  //   return null;
  // }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary mb-3 ">
      <div className="container-fluid">
              {/* <Link href="/" className="navbar-brand"><i className="bi bi-journals " style={{fontSize:"40px"}}></i></Link> */}

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              {/* <Link href="/role1" className="nav-link">Account</Link> */}
            </li>
            <li className="nav-item">
              {/* <Link href="/role2" className="nav-link">Authors</Link> */}
            </li>
            <li className="nav-item">
              {/* <Link href="/" className="nav-link">Book types</Link> */}
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <button className="nav-link" onClick={()=>{
                   router.push("/")
                   dispatch(logout());
                }}>Log out</button>
            </li>

          </ul>
        </div>
      </div>

    </div>
    </nav >
  );
};

export default Header;
