
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getRole, getUsername, selectIsLoggedIn } from '@/redux/slices/userSlice';
import { useAppDispatch } from '@/redux/hook';


export const checkRole = (role) =>{
    const dispatch = useAppDispatch()
  // dispatch(fetch())
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const getRoleUser = useSelector(getRole);
  const getUser = useSelector(getUsername);
  // const router = useRouter();

  const router = useRouter();
  if (!isLoggedIn) {
    //   router.push('/page'); // Trang đăng nhập

    toast.error('Vui lòng đăng nhập!');
    router.push("/")
    // window.location.href = '/'
    return null;
  }else
  if(Number(getRoleUser) >2)
  if (Number(getRoleUser) !=role) {
    toast.error('Bạn không thể truy cập trang này!');
    router.push("/404")

  }
    return null;
}
