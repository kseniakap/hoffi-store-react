import React from "react";
import { List, Datagrid, DateField, TextField, EditButton } from "react-admin";

const PostListGoods = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <DateField source="description" />
        <TextField source="price" />
        <TextField source="category" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default PostListGoods;
