
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { fetch, getRole, getUsername, selectIsLoggedIn } from '@/redux/slices/userSlice';
import { useAppDispatch } from '@/redux/hook';


export const createUsername = (role) =>{
 console.log(role)
 const name=role.name.split(" ")
 var result = role.birthday.split(/-/);
 console.log(name[result.length - 1]+'_'+role.identity_number)
    return null;
}
