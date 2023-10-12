
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getRole, getUsername, selectIsLoggedIn } from '@/redux/slices/userSlice';
import { useAppDispatch } from '@/redux/hook';


export const pushRouter = () =>{
  const dispatch = useAppDispatch()
  // dispatch(fetch())
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const getRoleUser = useSelector(getRole);
  const getUser = useSelector(getUsername);
  // const router = useRouter();
  const router = useRouter();
switch(getRoleUser){
  case "":{
    return null;
  }
  case "1":{
    router.push("/account")
    return null;
  }
  case "4":{
    // router.push("/")
    return null;
  }
}
    return null;
}