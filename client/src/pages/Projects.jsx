import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../services/api';

const Projects = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const { data, refetch } = useQuery('all-projects', async () => {
    const res = await api.get('/projects');
    return res.data;
  });

  const createMutation = useMutation(
    async (projectData) => {
      const res = await api.post('/projects', projectData);
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('all-projects');
        setShowForm(false);
      },
    }
  );

  const deleteMutation = useMutation(
    async (id) => {
      await api.delete(`/projects/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('all-projects');
      },
    }
  );

  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    createMutation.mutate({
      name: formData.get('name'),
      description: formData.get('description'),
    });
  };

  const projects = data?.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? 'Cancel' : 'New Project'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <form onSubmit={handleCreate} className="grid gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Project Name</label>
              <input name="name" className="input" required />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" className="input" rows={3} />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Project
            </button>
          </form>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project._id} className="card">
            <Link to={`/projects/${project._id}`} className="text-inherit no-underline">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <span className={`badge ${project.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-4">{project.description || 'No description'}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{project.members?.length || 0} members</span>
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
            <button
              onClick={() => {
                if (window.confirm('Delete this project?')) {
                  deleteMutation.mutate(project._id);
                }
              }}
              className="btn btn-danger w-full mt-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
