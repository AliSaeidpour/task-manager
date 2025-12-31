import { Checkbox, Card, Typography, Stack } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { toggleTask } from "./taskSlice";
import type { Task } from "../../types/task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props { task: Task; }

export const TaskItem = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "grab",
    boxShadow: isDragging ? "0 4px 20px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.1)",
    scale: isDragging ? 1.03 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "background.paper" }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Checkbox checked={task.completed} onChange={() => dispatch(toggleTask(task.id))} />
        <Stack>
          <Typography variant="subtitle1" sx={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">{task.description}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};
