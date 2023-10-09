import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { filterAccByrole, resetAccList } from "@/redux/slices/accountSlice";
import { getPositonListAsync, getpositionList } from "@/redux/slices/positionSlice";
import {
  IconAddressBook,
  IconAperture,
  IconCategory2,
  IconCheckupList,
  IconCopy,
  IconDownload,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconSubtask,
  IconTypography,
  IconUser,
  IconUserPlus,
  IconWallet,
} from "@tabler/icons-react";

import { useState, useEffect } from "react";
import { uniqueId } from "lodash";
import { IconChecklist } from "@tabler/icons-react";

export const useMenuItems = () => {


  const roles: any[] = useAppSelector(getpositionList)
  const Menuitems = [
    {
      navlabel: true,
      subheader: "Home",
    },

    {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/",
    },
    {
      navlabel: true,
      subheader: "Manager",
    },
    {
      id: uniqueId(),
      title: "Accounts",
      icon: IconAddressBook,
      href: "/account",
    },
    {
      id: uniqueId(),
      title: "Check in",
      icon: IconChecklist,
      href: "/check_in",
    },
    {
      id: uniqueId(),
      title: "Assignment",
      icon: IconSubtask,
      href: "/assignment",
    },
    {
      id: uniqueId(),
      title: "Evaluation",
      icon: IconCheckupList,
      href: "/evaluation",
    },
    {
      id: uniqueId(),
      title: "Wallet",
      icon: IconWallet,
      href: "/wallet",
    },
    {
      id: uniqueId(),
      title: "Back up",
      icon: IconDownload,
      href: "/backup",
    },
    // {
    //   id: uniqueId(),
    //   title: "List",
    //   icon: IconCategory2,
    //   subItems: [
    //     {
    //       id: 'user',
    //       title: 'Nhân viên',
    //       href:"/check_in",
          
    //     },{
    //       id: 'student',
    //       title: 'Học sinh',
    //       href:"/check_in/student",
          
    //     }
    //   ]
    // },
    // {
    //   navlabel: true,
    //   subheader: "Utilities",
    // },
    // {
    //   id: uniqueId(),
    //   title: "Typography",
    //   icon: IconTypography,
    //   href: "utilities/typography",
    // },
    // {
    //   id: uniqueId(),
    //   title: "Shadow",
    //   icon: IconCopy,
    //   href: "utilities/shadow",
    // },
    // {
    //   navlabel: true,
    //   subheader: "Auth",
    // },
    // {
    //   id: uniqueId(),
    //   title: "Login",
    //   icon: IconLogin,
    //   href: "authentication/login",
    // },
    // {
    //   id: uniqueId(),
    //   title: "Register",
    //   icon: IconUserPlus,
    //   href: "authentication/register",
    // },
    // {
    //   navlabel: true,
    //   subheader: "Extra",
    // },
    // {
    //   id: uniqueId(),
    //   title: "Icons",
    //   icon: IconMoodHappy,
    //   href: "icons",
    // },
    // {
    //   id: uniqueId(),
    //   title: "Sample Page",
    //   icon: IconAperture,
    //   href: "/sample-page",
    // },
  ];
  return Menuitems;
}
// export default useMenuitems;
