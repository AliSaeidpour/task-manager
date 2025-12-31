import { Container, Typography } from "@mui/material";
import { AddTaskForm } from "./features/tasks/AddTaskForm";
import { TaskList } from "./features/tasks/TaskList";

function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Task Manager
      </Typography>
      <AddTaskForm />
      <TaskList />
    </Container>
  );
}

export default App;
