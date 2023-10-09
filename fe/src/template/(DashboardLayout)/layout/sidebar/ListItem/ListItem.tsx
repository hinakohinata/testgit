import PropTypes from 'prop-types';
// mui imports
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Theme, useTheme } from '@mui/material';
import theme from '@/utils/theme';

type StyledListItemProps = {    
  id: string;
  title: string;
  icon?: any;
  onClick?: () => void;
}
interface ItemType {
    item: StyledListItemProps;
}

const StyledListItem = ({ item }: ItemType) => {
    const Icon = item.icon;
    const theme = useTheme();
    const itemIcon = Icon ? <Icon stroke={1.5} size="1.3rem" /> : null;


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
        
        <List component="div" disablePadding key={item.id}>
        <ListItemStyled>
          <ListItemButton onClick={item.onClick}>
                    {itemIcon && (
                        <ListItemIcon
                            sx={{ minWidth: "36px", p: "3px 0", color: "inherit" }}
                        >
                            {itemIcon}
                        </ListItemIcon>
                    )}
                    <ListItemText>
                        {item.title}
                    </ListItemText>
                </ListItemButton>
            </ListItemStyled>
        </List>
    );
};
export default StyledListItem;
