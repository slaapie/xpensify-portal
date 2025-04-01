
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, PieChart, Edit, Trash, Check, AlertCircle, UserCog } from 'lucide-react';
import ExpensePieChart from '@/components/dashboard/ExpensePieChart';
import ExpenseBarChart from '@/components/dashboard/ExpenseBarChart';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Import a copy of mockUserData so we can modify it
import { mockUserData as initialMockUserData } from '@/data/mockData';

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const [users, setUsers] = useState(initialMockUserData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    active: true
  });

  useEffect(() => {
    // Check if user is admin or superadmin
    if (userRole !== 'admin' && userRole !== 'superadmin') {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
      });
      navigate('/dashboard');
    }
  }, [userRole, navigate, toast]);

  // Only render content if user is admin or superadmin
  if (userRole !== 'admin' && userRole !== 'superadmin') {
    return null;
  }

  const handleStatusToggle = (userId) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? {...user, active: !user.active} : user
      )
    );
    
    toast({
      title: "User status updated",
      description: "The user's status has been successfully updated.",
    });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      toast({
        title: "User deleted",
        description: "The user has been successfully removed from the system.",
      });
    }
  };

  const handleEditClick = (user) => {
    setEditUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active
    });
    setSelectedUser(user);
  };

  const handleUpdateUser = () => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === editUser.id ? {...editUser} : user
      )
    );
    
    toast({
      title: "User updated",
      description: "The user information has been successfully updated.",
    });

    // Close sheet via handling
    document.querySelector('.sheet-close-button').click();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">Active users: {users.filter(u => u.active).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">रू 278,500</div>
              <p className="text-xs text-muted-foreground">All users combined</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Today</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter(u => u.active).length}</div>
              <p className="text-xs text-muted-foreground">Active users today</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>All users' expense categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpensePieChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>User activity and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseBarChart />
            </CardContent>
          </Card>
        </div>
        
        {/* User Management Table */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.role === 'superadmin' ? 'default' : 
                                 user.role === 'admin' ? 'outline' : 'secondary'}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={user.active ? 'bg-green-500' : 'bg-gray-500'}
                        >
                          {user.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleEditClick(user)}
                                className="flex items-center gap-1"
                              >
                                <Edit className="h-4 w-4" /> Edit
                              </Button>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>Edit User</SheetTitle>
                                <SheetDescription>
                                  Make changes to user's information. Click save when you're done.
                                </SheetDescription>
                              </SheetHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="name">Name</Label>
                                  <Input 
                                    id="name" 
                                    value={editUser.name}
                                    onChange={(e) => setEditUser({...editUser, name: e.target.value})}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="email">Email</Label>
                                  <Input 
                                    id="email" 
                                    value={editUser.email}
                                    onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="role">Role</Label>
                                  <select 
                                    id="role"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    value={editUser.role}
                                    onChange={(e) => setEditUser({...editUser, role: e.target.value})}
                                    disabled={userRole !== 'superadmin' && editUser.role === 'superadmin'}
                                  >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    {userRole === 'superadmin' && (
                                      <option value="superadmin">Super Admin</option>
                                    )}
                                  </select>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input 
                                    type="checkbox" 
                                    id="active" 
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    checked={editUser.active}
                                    onChange={(e) => setEditUser({...editUser, active: e.target.checked})}
                                  />
                                  <Label htmlFor="active">Active</Label>
                                </div>
                              </div>
                              <SheetFooter>
                                <Button type="submit" onClick={handleUpdateUser}>Save changes</Button>
                                <SheetClose className="sheet-close-button">
                                  <Button type="button" variant="outline">Cancel</Button>
                                </SheetClose>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={user.active ? 'text-red-500 hover:text-red-600' : 'text-green-500 hover:text-green-600'}
                            onClick={() => handleStatusToggle(user.id)}
                          >
                            {user.active ? (
                              <>
                                <AlertCircle className="h-4 w-4 mr-1" /> 
                                Disable
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-1" /> 
                                Enable
                              </>
                            )}
                          </Button>
                          
                          {/* Only super admins can delete users */}
                          {userRole === 'superadmin' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-500 hover:bg-red-100"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
