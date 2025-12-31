import { Button, Stack, Typography } from "@mui/material";
import { TaskItem } from "./TaskItem";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import type { RootState } from "../../app/store";
import { reorderTasks } from "./taskSlice";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

export const TaskList = () => {
  const tasks = useAppSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      dispatch(reorderTasks(newTasks));
    }
  };

  const handleClearCompleted = () => {
    const activeTasks = tasks.filter((t) => !t.completed);
    dispatch(reorderTasks(activeTasks));
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }} flexWrap="wrap">
        <Button variant={filter === "all" ? "contained" : "outlined"} onClick={() => setFilter("all")}>All</Button>
        <Button variant={filter === "active" ? "contained" : "outlined"} onClick={() => setFilter("active")}>Active</Button>
        <Button variant={filter === "completed" ? "contained" : "outlined"} onClick={() => setFilter("completed")}>Completed</Button>
        <Button color="error" onClick={handleClearCompleted}>Clear Completed</Button>
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
        {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
      </Typography>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)}
        </SortableContext>
      </DndContext>
    </>
  );
};
