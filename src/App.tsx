import { useEffect } from 'react';
import { useTicketStore } from './store';
import { LayoutDashboard, Inbox, Clock, CheckCircle, Search, Filter, AlertCircle, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { TicketDetails } from './components/TicketDetails';

function StatCard({ title, value, icon: Icon, color, gradient }: { title: string, value: number, icon: any, color: string, gradient: string }) {
  return (
    <div className={`rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between relative overflow-hidden bg-white hover:shadow-md transition-shadow`}>
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 bg-gradient-to-br ${gradient}`}></div>
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`p-4 rounded-xl ${color} bg-opacity-10 backdrop-blur-sm`}>
        <Icon className={`w-7 h-7 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  );
}

export default function App() {
  const { 
    tickets, isLoading, error, fetchTickets, 
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    priorityFilter, setPriorityFilter,
    setSelectedTicketId, selectedTicketId,
    updateTicketStatus
  } = useTicketStore();

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-600 border-red-200';
      case 'Medium': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Low': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    let color = '';
    let dot = '';
    switch (status) {
      case 'Open': 
        color = 'bg-blue-50 text-blue-700 border-blue-200';
        dot = 'bg-blue-500';
        break;
      case 'In Progress': 
        color = 'bg-purple-50 text-purple-700 border-purple-200';
        dot = 'bg-purple-500';
        break;
      case 'Resolved': 
        color = 'bg-gray-50 text-gray-700 border-gray-200';
        dot = 'bg-gray-500';
        break;
      default: 
        color = 'bg-gray-50 text-gray-700 border-gray-200';
        dot = 'bg-gray-500';
    }
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${color}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar Area */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">HelpDesk</h1>
              <p className="text-xs text-gray-500">Support Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:opacity-90 transition-opacity">
              JD
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Tickets" value={stats.total} icon={LayoutDashboard} color="bg-blue-500" gradient="from-blue-400 to-blue-600" />
          <StatCard title="Open" value={stats.open} icon={Inbox} color="bg-red-500" gradient="from-red-400 to-red-600" />
          <StatCard title="In Progress" value={stats.inProgress} icon={Clock} color="bg-purple-500" gradient="from-purple-400 to-purple-600" />
          <StatCard title="Resolved" value={stats.resolved} icon={CheckCircle} color="bg-emerald-500" gradient="from-emerald-400 to-emerald-600" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center transition-all">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by ID, subject, or customer..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative">
              <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="appearance-none pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all cursor-pointer font-medium text-sm text-gray-700"
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all cursor-pointer font-medium text-sm text-gray-700"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Ticket List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center flex flex-col items-center justify-center text-gray-500">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="font-medium">Loading tickets...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-500 flex flex-col items-center">
              <AlertCircle className="w-10 h-10 mb-3 text-red-400" />
              <p className="font-medium">{error}</p>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="p-16 text-center text-gray-500 flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No tickets found</h3>
              <p className="text-gray-500 max-w-sm">We couldn't find any tickets matching your current search criteria. Try adjusting your filters.</p>
              <button 
                onClick={() => { setSearchQuery(''); setStatusFilter('All'); setPriorityFilter('All'); }}
                className="mt-6 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100">
                    <th className="py-4 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider">Ticket Details</th>
                    <th className="py-4 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider">Customer</th>
                    <th className="py-4 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider">Priority</th>
                    <th className="py-4 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTickets.map(ticket => (
                    <tr 
                      key={ticket.id} 
                      className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                      onClick={() => setSelectedTicketId(ticket.id)}
                    >
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{ticket.subject}</div>
                        <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide font-medium">{ticket.id}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                            {ticket.customerName.charAt(0)}
                          </div>
                          <div className="text-sm font-medium text-gray-900">{ticket.customerName}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                        <div className="relative">
                          {getStatusBadge(ticket.status)}
                          <select
                            value={ticket.status}
                            onChange={(e) => updateTicketStatus(ticket.id, e.target.value as any)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 font-medium whitespace-nowrap">
                        {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedTicketId && (
        <TicketDetails 
          ticketId={selectedTicketId} 
          onClose={() => setSelectedTicketId(null)} 
        />
      )}
    </div>
  );
}
