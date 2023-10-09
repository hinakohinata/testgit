import React from "react";
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText, styled } from "@mui/material";
import NavGroup from "./NavGroup/NavGroup";
import { useMenuItems } from "./MenuItems";
import { useState } from 'react';
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";
import theme from "@/utils/theme";



const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const [open, setOpen] = useState(false);

  const handleSubItemClick = (action?: () => void) => {
    if (action) {
      action();
    }
  };

  const menuItems = useMenuItems();
  const pathname = usePathname();
  const pathDirect = pathname;

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
        whiteSpace: "nowrap",
        marginBottom: "2px",
        padding: "8px 10px",
        borderRadius: "8px",
        // backgroundColor: level > 1 ? "transparent !important" : "inherit",
        color: theme.palette.text.secondary,
        paddingLeft: "10px",
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
        },
        "&.Mui-selected": {
            color: "white",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
            },
        },
    },
}));

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">

        {menuItems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            // if (item.subItems) {
            //   return (
            //     <div key={item.id}>
            //       <ListItemStyled  onClick={() => setOpen(!open)}>
            //         {item.icon && <ListItemIcon>{<item.icon />}</ListItemIcon>}
            //         <ListItemText primary={item.title} />
            //       </ListItemStyled>
            //       {item.subItems && (
            //         <Collapse in={open} timeout="auto" unmountOnExit>
            //           <List component="div" disablePadding>
            //             {item.subItems.map((subItem: any) => (
            //               <ListItem
            //                 button
            //                 key={subItem.id}
            //                 onClick={() => handleSubItemClick(subItem.action)}
            //               >
            //                 <ListItemText primary={subItem.title} inset />
            //               </ListItem>
            //             ))}
            //           </List>
            //         </Collapse>
            //       )}
            //     </div>
            //   );
            // } else
              return (<NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
              />)
          }
        }
        )
        }
      
      </List>
    </Box>
  );
};

export default SidebarItems;
