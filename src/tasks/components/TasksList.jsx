import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CreateTaskInput from './CreateTaskInput';
import Task from './Task';
import * as tasksAction from '../tasks.actions';
import { sortedTasksListSelector } from '../tasks.selectors';

const TasksList = ({ getTaskList, updateTask, deleteTask, createTask, tasks }) => {
  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <main className="todo-list">
      <CreateTaskInput onCreate={createTask} />
      <ul className="list">
        {tasks.map(task => (
          <Task key={task.id} {...task} onChange={updateTask} onDelete={deleteTask} />
        ))}
      </ul>
    </main>
  );
};

const mapDispatch = {
  getTaskList: tasksAction.getTaskList,
  updateTask: tasksAction.updateTask,
  deleteTask: tasksAction.deleteTask,
  createTask: tasksAction.createTask,
};

const mapState = state => ({
  tasks: sortedTasksListSelector(state),
});

export default connect(mapState, mapDispatch)(TasksList);
