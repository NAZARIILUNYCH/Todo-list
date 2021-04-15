import { tasksListSelector } from './tasks.selectors';
import * as tasksGateway from './tasksGateway';

export const TASKS_LIST_RECEIVED = 'TASKS_LIST_RECEIVED';

export const tasksListReceived = tasksList => ({
  type: TASKS_LIST_RECEIVED,
  payload: {
    tasksList,
  },
});

export const getTaskList = () => dispatch =>
  tasksGateway.fetchTasksList().then(tasksList => dispatch(tasksListReceived(tasksList)));

export const updateTask = taskId => (dispatch, getState) => {
  const state = getState();
  const tasksList = tasksListSelector(state);
  const task = tasksList.find(task => task.id === taskId);
  const updatedTask = {
    ...task,
    done: !task.done,
  };
  tasksGateway.updateTask(taskId, updatedTask).then(() => dispatch(getTaskList()));
};

export const deleteTask = taskId => dispatch =>
  tasksGateway.deleteTask(taskId).then(() => dispatch(getTaskList()));

export const createTask = text => dispatch => {
  const taskData = {
    text,
    done: false,
    createData: new Date().toISOString(),
  };

  tasksGateway.createTask(taskData).then(() => dispatch(getTaskList()));
};
