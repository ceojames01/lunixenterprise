import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../services/api';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const { data: projectsData, refetch } = useQuery('projects', async () => {
    const res = await api.get('/projects');
    return res.data;
  });

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await api.post('/projects', {
      name: formData.get('name'),
      description: formData.get('description'),
    });
    setShowForm(false);
    refetch();
  };

  const projects = projectsData?.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? 'Cancel' : 'New Project'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <form onSubmit={handleCreateProject} className="grid gap-4">
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
          <Link
            key={project._id}
            to={`/projects/${project._id}`}
            className="text-inherit no-underline"
          >
            <div className="card hover:shadow-md transition-shadow cursor-pointer">
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
            </div>
          </Link>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">No projects yet</p>
          <p>Create your first project to get started</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
