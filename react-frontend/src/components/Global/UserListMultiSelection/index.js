import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

export default function UserListMultiSelection( {userList, setUserSelected}) {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {userList.map((each_user) => {
        const labelId = `checkbox-list-secondary-label-${each_user.id}`;
        return (
          <ListItem
            key={each_user.id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(each_user.id)}
                checked={checked.indexOf(each_user.id) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${each_user.fullName}`}
                  src={`/static/images/avatar/${each_user.id + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${each_user.fullName}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
