import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../services/api';

const ProjectDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [showTaskForm, setShowTaskForm] = useState(false);

  const { data: projectData } = useQuery('project', async () => {
    const res = await api.get(`/projects/${id}`);
    return res.data;
  });

  const { data: tasksData } = useQuery(['tasks', id], async () => {
    const res = await api.get(`/tasks?project=${id}`);
    return res.data;
  });

  const createTaskMutation = useMutation(
    async (taskData) => {
      const res = await api.post('/tasks', taskData);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks', id]);
        setShowTaskForm(false);
      },
    }
  );

  const project = projectData?.data;
  const tasks = tasksData?.data || [];

  const handleCreateTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    createTaskMutation.mutate({
      title: formData.get('title'),
      description: formData.get('description'),
      project: id,
      priority: formData.get('priority'),
      status: formData.get('status'),
    });
  };

  const getStatusBadge = (status) => {
    const colors = {
      todo: 'badge-warning',
      in_progress: 'badge-success',
      review: 'badge-danger',
      done: 'badge-success',
    };
    return colors[status] || 'badge-warning';
  };

  const getPriorityBadge = (priority) => {
    if (priority === 'urgent') return 'badge-danger';
    if (priority === 'high') return 'badge-warning';
    return 'badge-success';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{project?.name}</h1>
        <p className="text-gray-500">{project?.description || 'No description'}</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <button onClick={() => setShowTaskForm(!showTaskForm)} className="btn btn-primary">
          {showTaskForm ? 'Cancel' : 'New Task'}
        </button>
      </div>

      {showTaskForm && (
        <div className="card mb-6">
          <form onSubmit={handleCreateTask} className="grid gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
              <input name="title" className="input" required />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" className="input" rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Priority</label>
                <select name="priority" className="input">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
                <select name="status" className="input">
                  <option value="todo">Todo</option>
                  <option value="in_progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Task
            </button>
          </form>
        </div>
      )}

      <div className="grid gap-3">
        {tasks.map((task) => (
          <div key={task._id} className="card flex justify-between items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-base font-semibold">{task.title}</h3>
                <span className={`badge ${getStatusBadge(task.status)}`}>
                  {task.status.replace('_', ' ')}
                </span>
                <span className={`badge ${getPriorityBadge(task.priority)}`}>{task.priority}</span>
              </div>
              <p className="text-gray-500 text-sm">{task.description || 'No description'}</p>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No tasks yet. Create your first task above.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
