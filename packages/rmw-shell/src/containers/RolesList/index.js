import {
  Checkbox,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import React, { useEffect } from "react";
import VirtualList from "material-ui-shell/lib/containers/VirtualList";
import { useFilter } from "material-ui-shell/lib/providers/Filter";
import { useLists } from "../../providers/Firebase/Lists";
import { getDatabase, ref, set } from "firebase/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ path }) {
  const { watchList, getList: getFirebaseList } = useLists();
  const { getList } = useFilter();
  const db = getDatabase();

  const roles = getFirebaseList("roles");
  const userRoles = getFirebaseList(path);

  const list = getList(
    "roles",
    roles.map((r) => {
      return { key: r.key, ...r.val };
    }),
    [{ name: "name" }]
  );

  useEffect(() => {
    watchList("roles");
    watchList(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, watchList]);

  const Row = ({ index, style, data }) => {
    const { key, name = "" } = data;

    let isSelected = false;

    userRoles.map((rg) => {
      if (rg.key === key) {
        isSelected = true;
      }

      return rg;
    });

    return (
      <div key={`${name}_${index}`} style={style}>
        <ListItem
          button
          alignItems="flex-start"
          onClick={async () => {
            console.log("clicked", isSelected, path);
            await set(ref(db, `${path}/${key}`), isSelected ? null : true);
            console.log("clicked2");
          }}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isSelected}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText primary={name} secondary={name} />
        </ListItem>
        <Divider />
      </div>
    );
  };

  return (
    <VirtualList
      list={list}
      name="roles"
      listProps={{ itemSize: 72 }}
      Row={Row}
    />
  );
}
