import { useState } from "react";
import type { KeyboardEvent } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTask } from "./taskSlice";
import { v4 as uuidv4 } from "uuid";
import { Button, TextField, Stack } from "@mui/material";

export const AddTaskForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    dispatch(addTask({ id: uuidv4(), title, description, completed: false }));
    setTitle("");
    setDescription("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        autoFocus
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        onKeyDown={handleKeyDown}
      />
      <Button variant="contained" onClick={handleSubmit} disabled={!title.trim()}>
        Add Task
      </Button>
    </Stack>
  );
};
