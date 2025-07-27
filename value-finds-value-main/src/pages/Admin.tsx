import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Building2, Target, BarChart3, LogOut, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Admin = () => {
  const { user, signOut, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [startups, setStartups] = useState<any[]>([]);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal/dialog state
  const [modal, setModal] = useState<{ type: 'add' | 'edit', entity: 'startup' | 'challenge' | 'user', open: boolean }>({ type: 'add', entity: 'startup', open: false });
  const [confirmDelete, setConfirmDelete] = useState<{ entity: 'startup' | 'challenge' | 'user', id: string | null, open: boolean }>({ entity: 'startup', id: null, open: false });
  const [form, setForm] = useState<any>({});
  const [selected, setSelected] = useState<any>(null);

  // Debug logging
  useEffect(() => {
    console.log('Admin component mounted');
    console.log('User:', user);
    console.log('isAdmin:', isAdmin);
    console.log('authLoading:', authLoading);
  }, [user, isAdmin, authLoading]);

  // Show loading spinner while authentication is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Only redirect if we're sure the user is not admin (not loading and not admin)
  if (!authLoading && !isAdmin) {
    console.log('Not admin, redirecting to auth');
    navigate('/auth');
    return null;
  }

  // Fetch data (refactored for reuse)
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [startupsRes, challengesRes, usersRes] = await Promise.all([
        supabase.from('startups').select('*'),
        supabase.from('challenges').select('*'),
        supabase.from('users').select('*'),
      ]);
      
      if (startupsRes.error) console.error('Startups fetch error:', startupsRes.error);
      if (challengesRes.error) console.error('Challenges fetch error:', challengesRes.error);
      if (usersRes.error) console.error('Users fetch error:', usersRes.error);
      
      setStartups(startupsRes.data || []);
      setChallenges(challengesRes.data || []);
      setUsersList(usersRes.data || []);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (isAdmin) {
      console.log('User is admin, fetching data');
      fetchAll(); 
    }
  }, [isAdmin]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Modal open helpers
  const openAdd = (entity: 'startup' | 'challenge' | 'user') => {
    console.log('Opening add modal for:', entity);
    // Set default form values for each entity
    if (entity === 'startup') setForm({ name: '', founder: '', email: '' });
    else if (entity === 'challenge') setForm({ title: '', organizer: '' });
    else if (entity === 'user') setForm({ email: '', role: 'user' });
    setSelected(null); 
    setModal({ type: 'add', entity, open: true });
  };
  
  const openEdit = (entity: 'startup' | 'challenge' | 'user', item: any) => {
    console.log('Opening edit modal for:', entity, item);
    setForm({ ...item }); 
    setSelected(item); 
    setModal({ type: 'edit', entity, open: true });
  };
  
  const closeModal = () => { 
    setModal(m => ({ ...m, open: false })); 
    setForm({}); 
    setSelected(null); 
  };
  
  const openDelete = (entity: 'startup' | 'challenge' | 'user', id: string) => {
    console.log('Opening delete confirmation for:', entity, id);
    setConfirmDelete({ entity, id, open: true });
  };
  
  const closeDelete = () => setConfirmDelete(c => ({ ...c, open: false, id: null }));

  // Form change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log('Form change:', name, value);
    setForm((f: any) => ({ ...f, [name]: value }));
  };

  // CRUD handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { entity, type } = modal;
    console.log('Submitting form:', { entity, type, form });
    
    let res;
    try {
      // Validate required fields
      if (entity === 'startup' && (!form.name || !form.founder || !form.email)) {
        throw new Error('All fields required for startup');
      }
      if (entity === 'challenge' && (!form.title || !form.organizer)) {
        throw new Error('All fields required for challenge');
      }
      if (entity === 'user' && (!form.email || !form.role)) {
        throw new Error('All fields required for user');
      }
      
      if (entity === 'startup') {
        if (type === 'add') {
          res = await supabase.from('startups').insert(form);
        } else {
          res = await supabase.from('startups').update(form).eq('id', selected.id);
        }
      } else if (entity === 'challenge') {
        if (type === 'add') {
          res = await supabase.from('challenges').insert(form);
        } else {
          res = await supabase.from('challenges').update(form).eq('id', selected.id);
        }
      } else if (entity === 'user') {
        if (type === 'add') {
          res = await supabase.from('users').insert(form);
        } else {
          res = await supabase.from('users').update(form).eq('id', selected.id);
        }
      }
      
      if (res?.error) {
        console.error('Supabase error:', res.error);
        throw res.error;
      }
      
      console.log('CRUD operation successful:', res);
      toast.success(`${type === 'add' ? 'Added' : 'Updated'} successfully!`);
      closeModal();
      fetchAll(); // Refetch data after operation
    } catch (err: any) {
      console.error('CRUD error:', err);
      toast.error(err.message || 'Operation failed');
    }
  };

  const handleDelete = async () => {
    const { entity, id } = confirmDelete;
    console.log('Deleting:', { entity, id });
    
    let res;
    try {
      if (entity === 'startup') {
        res = await supabase.from('startups').delete().eq('id', id);
      } else if (entity === 'challenge') {
        res = await supabase.from('challenges').delete().eq('id', id);
      } else if (entity === 'user') {
        res = await supabase.from('users').delete().eq('id', id);
      }
      
      if (res?.error) {
        console.error('Delete error:', res.error);
        throw res.error;
      }
      
      console.log('Delete successful:', res);
      toast.success('Deleted successfully!');
      closeDelete();
      fetchAll(); // Refetch data after operation
    } catch (err: any) {
      console.error('Delete error:', err);
      toast.error(err.message || 'Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-brand-yellow rounded-md w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="startups" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Startups</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Challenges</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
          </TabsList>
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Startups</CardTitle><Building2 className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{startups.length}</div></CardContent></Card>
              <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Challenges</CardTitle><Target className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{challenges.length}</div></CardContent></Card>
              <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Users</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{usersList.length}</div></CardContent></Card>
              <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Successful Matches</CardTitle><BarChart3 className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">-</div></CardContent></Card>
            </div>
          </TabsContent>
          {/* Startups Tab */}
          <TabsContent value="startups" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Startups Management</h2>
              <Button onClick={() => openAdd('startup')} className="flex items-center space-x-2"><Plus className="h-4 w-4" /><span>Add Startup</span></Button>
            </div>
            <Card><CardHeader><CardTitle>Startups List</CardTitle></CardHeader><CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-yellow"></div>
                  <span className="ml-2">Loading startups...</span>
                </div>
              ) : (
                <table className="min-w-full text-sm">
                  <thead><tr><th>Name</th><th>Founder</th><th>Email</th><th>Actions</th></tr></thead>
                  <tbody>
                    {startups.map(s => (
                      <tr key={s.id} className="border-b">
                        <td>{s.name}</td>
                        <td>{s.founder}</td>
                        <td>{s.email}</td>
                        <td className="space-x-2">
                          <Button size="sm" variant="outline" aria-label="Edit Startup" tabIndex={0} onClick={() => openEdit('startup', s)}><Edit className="h-4 w-4" /></Button>
                          <Button size="sm" variant="destructive" aria-label="Delete Startup" tabIndex={0} onClick={() => openDelete('startup', s.id)}><Trash2 className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent></Card>
          </TabsContent>
          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Challenges Management</h2>
              <Button onClick={() => openAdd('challenge')} className="flex items-center space-x-2"><Plus className="h-4 w-4" /><span>Add Challenge</span></Button>
            </div>
            <Card><CardHeader><CardTitle>Challenges List</CardTitle></CardHeader><CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-yellow"></div>
                  <span className="ml-2">Loading challenges...</span>
                </div>
              ) : (
                <table className="min-w-full text-sm">
                  <thead><tr><th>Title</th><th>Organizer</th><th>Actions</th></tr></thead>
                  <tbody>
                    {challenges.map(c => (
                      <tr key={c.id} className="border-b">
                        <td>{c.title}</td>
                        <td>{c.organizer}</td>
                        <td className="space-x-2">
                          <Button size="sm" variant="outline" aria-label="Edit Challenge" tabIndex={0} onClick={() => openEdit('challenge', c)}><Edit className="h-4 w-4" /></Button>
                          <Button size="sm" variant="destructive" aria-label="Delete Challenge" tabIndex={0} onClick={() => openDelete('challenge', c.id)}><Trash2 className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent></Card>
          </TabsContent>
          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Users Management</h2>
              <Button onClick={() => openAdd('user')} className="flex items-center space-x-2"><Plus className="h-4 w-4" /><span>Add User</span></Button>
            </div>
            <Card><CardHeader><CardTitle>Users List</CardTitle></CardHeader><CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-yellow"></div>
                  <span className="ml-2">Loading users...</span>
                </div>
              ) : (
                <table className="min-w-full text-sm">
                  <thead><tr><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
                  <tbody>
                    {usersList.map(u => (
                      <tr key={u.id} className="border-b">
                        <td>{u.email}</td>
                        <td><Badge>{u.role}</Badge></td>
                        <td className="space-x-2">
                          <Button size="sm" variant="outline" aria-label="Edit User" tabIndex={0} onClick={() => openEdit('user', u)}><Edit className="h-4 w-4" /></Button>
                          <Button size="sm" variant="destructive" aria-label="Delete User" tabIndex={0} onClick={() => openDelete('user', u.id)}><Trash2 className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">{modal.type === 'add' ? 'Add New' : 'Edit'} {modal.entity}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {modal.entity === 'startup' && (
                <>
                  <div>
                    <label htmlFor="startupName" className="block text-sm font-medium text-gray-700">Name</label>
                    <Input
                      type="text"
                      id="startupName"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="startupFounder" className="block text-sm font-medium text-gray-700">Founder</label>
                    <Input
                      type="text"
                      id="startupFounder"
                      name="founder"
                      value={form.founder}
                      onChange={handleFormChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="startupEmail" className="block text-sm font-medium text-gray-700">Email</label>
                    <Input
                      type="email"
                      id="startupEmail"
                      name="email"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </>
              )}
              {modal.entity === 'challenge' && (
                <>
                  <div>
                    <label htmlFor="challengeTitle" className="block text-sm font-medium text-gray-700">Title</label>
                    <Input
                      type="text"
                      id="challengeTitle"
                      name="title"
                      value={form.title}
                      onChange={handleFormChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="challengeOrganizer" className="block text-sm font-medium text-gray-700">Organizer</label>
                    <Input
                      type="text"
                      id="challengeOrganizer"
                      name="organizer"
                      value={form.organizer}
                      onChange={handleFormChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </>
              )}
              {modal.entity === 'user' && (
                <>
                  <div>
                    <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">Email</label>
                    <Input
                      type="email"
                      id="userEmail"
                      name="email"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">Role</label>
                    <Select onValueChange={(value) => setForm((f: any) => ({ ...f, role: value }))} value={form.role} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                <Button type="submit">{modal.type === 'add' ? 'Add' : 'Update'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      {confirmDelete.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-4">Are you sure you want to delete this {confirmDelete.entity}?</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeDelete}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin; 