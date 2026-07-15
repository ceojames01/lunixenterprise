import { useState, useEffect } from 'react';
import api from '../services/api';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('event');

  const [data, setData] = useState({ event: [], hero: [], partners: [], leaders: [], editorials: [] });
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (token && token !== 'virtual_preview_token') {
      fetchData();
    }
  }, [token, activeTab]);

  const fetchData = async () => {
    try {
      const endpoints = {
        event: '/admin/event',
        hero: '/admin/hero',
        partners: '/admin/partners',
        leaders: '/admin/leaders',
        editorials: '/admin/editorials'
      };
      const res = await api.get(endpoints[activeTab], {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(prev => ({ ...prev, [activeTab]: res.data.data }));
    } catch (error) {
      if (error.response?.status === 401) handleLogout();
      console.error('Fetch error:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === 'admin@lunix.com' && password === 'admin123') {
      const virtualToken = 'virtual_preview_token';
      localStorage.setItem('adminToken', virtualToken);
      setToken(virtualToken);
      return;
    }
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      setToken(res.data.token);
    } catch (error) {
      alert('Login failed. For virtual access, use:\nEmail: admin@lunix.com\nPassword: admin123\n\nOr click the Virtual Login button.');
    }
  };

  const handleVirtualLogin = () => {
    const virtualToken = 'virtual_preview_token';
    localStorage.setItem('adminToken', virtualToken);
    setToken(virtualToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    if (token === 'virtual_preview_token') {
      setData(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(item => item._id !== id)
      }));
      return;
    }
    try {
      await api.delete(`/admin/${activeTab}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      alert('Delete failed');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (token === 'virtual_preview_token') {
      setData(prev => {
        const currentData = prev[activeTab];
        if (editingItem?._id) {
          return { ...prev, [activeTab]: currentData.map(item => item._id === editingItem._id ? { ...item, ...formData } : item) };
        } else {
          const newItem = { ...formData, _id: Date.now().toString() };
          return { ...prev, [activeTab]: [...currentData, newItem] };
        }
      });
      setEditingItem(null);
      setFormData({});
      return;
    }
    try {
      if (editingItem?._id) {
        await api.put(`/admin/${activeTab}/${editingItem._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await api.post(`/admin/${activeTab}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setEditingItem(null);
      setFormData({});
      fetchData();
    } catch (error) {
      alert('Save failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const openForm = (item = null) => {
    setEditingItem(item || { isNew: true });
    setFormData(item || { isActive: true, displayOrder: 0 });
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
        <form onSubmit={handleLogin} className="bg-black p-8 rounded-xl border border-zinc-800 w-96">
          <h2 className="text-2xl font-black uppercase mb-6 text-f1-red">Admin Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-4 p-3 bg-zinc-900 rounded border border-zinc-700" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-6 p-3 bg-zinc-900 rounded border border-zinc-700" required />
          <button type="submit" className="w-full bg-f1-red text-white font-bold p-3 rounded mb-4">Login</button>
          
          <div className="relative flex items-center py-2 mb-4">
            <div className="flex-grow border-t border-zinc-700"></div>
            <span className="flex-shrink-0 mx-4 text-zinc-500 text-sm">OR</span>
            <div className="flex-grow border-t border-zinc-700"></div>
          </div>
          
          <button type="button" onClick={handleVirtualLogin} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold p-3 rounded border border-zinc-600 transition-colors">
            Virtual Login (Preview UI)
          </button>
        </form>
      </div>
    );
  }

  const renderForm = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSave} className="bg-zinc-900 p-8 rounded-xl border border-zinc-700 w-full max-w-lg">
        <h3 className="text-xl font-bold mb-6 text-white uppercase">{editingItem?.isNew ? 'Create' : 'Edit'} {activeTab.slice(0,-1)}</h3>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {activeTab === 'event' && (
            <>
              <input type="text" placeholder="Event Code (e.g. E 1)" value={formData.eventCode || ''} onChange={e => setFormData({...formData, eventCode: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" required />
              <input type="text" placeholder="Date Range (e.g. 15 July)" value={formData.dateRange || ''} onChange={e => setFormData({...formData, dateRange: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" required />
              <input type="text" placeholder="Location (e.g. Kutus)" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" required />
              <input type="text" placeholder="Ticket Link" value={formData.ticketLink || ''} onChange={e => setFormData({...formData, ticketLink: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" />
              <label className="flex items-center text-white"><input type="checkbox" checked={formData.isActive !== false} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="mr-2" /> Active</label>
            </>
          )}
          {activeTab === 'hero' && (
            <>
              <input type="text" placeholder="Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" required />
              <input type="text" placeholder="Badge Text (e.g. UNLOCKED)" value={formData.badgeText || ''} onChange={e => setFormData({...formData, badgeText: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" />
              <input type="text" placeholder="Media URL (Image or Video link)" value={formData.mediaUrl || ''} onChange={e => setFormData({...formData, mediaUrl: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" required />
              <select value={formData.mediaType || 'image'} onChange={e => setFormData({...formData, mediaType: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white">
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
              <label className="flex items-center text-white"><input type="checkbox" checked={formData.isActive !== false} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="mr-2" /> Active</label>
            </>
          )}
          {activeTab === 'partners' && (
            <>
              <input type="text" placeholder="Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" required />
              <input type="text" placeholder="Image URL / SVG Link" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" required />
              <input type="text" placeholder="External Link" value={formData.link || ''} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" />
              <label className="flex items-center text-white"><input type="checkbox" checked={formData.isActive !== false} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="mr-2" /> Active</label>
              <input type="number" placeholder="Display Order" value={formData.displayOrder || 0} onChange={e => setFormData({...formData, displayOrder: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" />
            </>
          )}
          {activeTab === 'leaders' && (
            <>
              <input type="text" placeholder="Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" required />
              <input type="text" placeholder="Role" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" required />
              <textarea placeholder="Bio" value={formData.bio || ''} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white h-24" />
              <input type="text" placeholder="Image URL" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" />
              <input type="text" placeholder="Instagram URL" value={formData.instagramUrl || ''} onChange={e => setFormData({...formData, instagramUrl: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" />
              <input type="number" placeholder="Display Order" value={formData.displayOrder || 0} onChange={e => setFormData({...formData, displayOrder: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" />
            </>
          )}
          {activeTab === 'editorials' && (
            <>
              <input type="text" placeholder="Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" required />
              <textarea placeholder="Excerpt" value={formData.excerpt || ''} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white h-24" />
              <input type="text" placeholder="Category" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" />
              <input type="text" placeholder="Image URL" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full p-2 bg-black border border-zinc-700 rounded text-white" />
              <label className="flex items-center text-white"><input type="checkbox" checked={formData.isEditorsPick || false} onChange={e => setFormData({...formData, isEditorsPick: e.target.checked})} className="mr-2" /> Editor's Pick</label>
            </>
          )}
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button type="button" onClick={() => setEditingItem(null)} className="px-4 py-2 text-zinc-400 hover:text-white">Cancel</button>
          <button type="submit" className="px-6 py-2 bg-f1-red text-white font-bold rounded">Save</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black uppercase text-f1-red">Admin Dashboard</h1>
          <button onClick={handleLogout} className="text-sm font-bold bg-zinc-800 px-4 py-2 rounded hover:bg-zinc-700">Logout</button>
        </div>

        <div className="flex gap-4 mb-8 border-b border-zinc-800 pb-4 overflow-x-auto">
          {['event', 'hero', 'partners', 'leaders', 'editorials'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`uppercase font-bold tracking-wider px-4 py-2 rounded transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-f1-red text-white' : 'text-zinc-500 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase">{activeTab}</h2>
          <button onClick={() => openForm()} className="bg-white text-black font-bold px-4 py-2 rounded hover:bg-zinc-200">
            + Add New
          </button>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-zinc-950">
              <tr>
                <th className="p-4 text-xs font-bold uppercase text-zinc-500">Name / Title</th>
                <th className="p-4 text-xs font-bold uppercase text-zinc-500">Details</th>
                <th className="p-4 text-xs font-bold uppercase text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data[activeTab].map(item => (
                <tr key={item._id} className="border-t border-zinc-800 hover:bg-zinc-800/50">
                  <td className="p-4 font-bold">{item.name || item.title || item.eventCode}</td>
                  <td className="p-4 text-sm text-zinc-400">
                    {activeTab === 'event' && `${item.location} | ${item.dateRange}`}
                    {activeTab === 'hero' && formData?.mediaType}
                    {activeTab === 'partners' && <img src={item.imageUrl} alt="logo" className="h-6 object-contain bg-zinc-800 p-1" />}
                    {activeTab === 'leaders' && item.role}
                    {activeTab === 'editorials' && item.category}
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => openForm(item)} className="text-blue-400 hover:text-blue-300 mr-4 font-bold text-sm">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-400 font-bold text-sm">Delete</button>
                  </td>
                </tr>
              ))}
              {data[activeTab].length === 0 && (
                <tr><td colSpan="3" className="p-8 text-center text-zinc-500">No {activeTab} found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {editingItem && renderForm()}
    </div>
  );
};

export default Admin;
