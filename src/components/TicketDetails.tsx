import { useState, useEffect } from 'react';
import { useTicketStore } from '../store';
import { X, Send, Clock, AlertCircle, Mail, UserCircle2, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

export function TicketDetails({ ticketId, onClose }: { ticketId: string; onClose: () => void }) {
  const { tickets, updateTicketStatus, addMessage } = useTicketStore();
  const ticket = tickets.find(t => t.id === ticketId);
  const [newMessage, setNewMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Slight delay to trigger animation
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for transition
  };

  if (!ticket) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    addMessage(ticket.id, newMessage);
    setNewMessage('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-600 border-red-200';
      case 'Medium': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Low': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Progress': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Resolved': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      
      {/* Side Panel */}
      <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold tracking-wider text-gray-500 uppercase">{ticket.id}</h2>
          </div>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">{ticket.subject}</h3>
            
            {/* Meta Info */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                <AlertCircle className="w-4 h-4" />
                <span>{ticket.priority} Priority</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-white text-gray-600 border-gray-200 text-sm font-medium shadow-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{format(new Date(ticket.createdAt), 'MMM d, yyyy h:mm a')}</span>
              </div>
            </div>

            {/* Customer Info Card */}
            <div className="bg-white rounded-xl p-5 mb-8 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 rounded-full flex items-center justify-center font-bold text-xl shadow-inner shrink-0">
                {ticket.customerName.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-lg">{ticket.customerName}</div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                  <Mail className="w-3.5 h-3.5" />
                  <a href={`mailto:${ticket.customerEmail}`} className="hover:text-blue-600 hover:underline">{ticket.customerEmail}</a>
                </div>
              </div>
            </div>

            {/* Status Changer */}
            <div className="bg-white rounded-xl p-5 mb-8 shadow-sm border border-gray-100">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Ticket Status</label>
              <div className="relative">
                <select
                  value={ticket.status}
                  onChange={(e) => updateTicketStatus(ticket.id, e.target.value as any)}
                  className={`w-full appearance-none border rounded-xl py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium cursor-pointer transition-colors ${getStatusColor(ticket.status)}`}
                >
                  <option value="Open" className="bg-white text-gray-900">Open</option>
                  <option value="In Progress" className="bg-white text-gray-900">In Progress</option>
                  <option value="Resolved" className="bg-white text-gray-900">Resolved</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                Issue Description
              </h4>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">{ticket.description}</p>
              </div>
            </div>

            {/* Conversation */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <UserCircle2 className="w-4 h-4 text-gray-400" />
                Conversation History
              </h4>
              
              {ticket.messages.length === 0 ? (
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                  <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No messages yet. Be the first to reply!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {ticket.messages.map(msg => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'support' ? 'items-end' : 'items-start'}`}>
                      <div className="text-xs text-gray-400 mb-1.5 px-1 font-medium">
                        {msg.sender === 'support' ? 'You (Support)' : ticket.customerName}
                      </div>
                      <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm shadow-sm ${
                        msg.sender === 'support' 
                          ? 'bg-blue-600 text-white rounded-tr-sm' 
                          : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
                      }`}>
                        <div className="mb-2 leading-relaxed">{msg.text}</div>
                        <div className={`text-[10px] text-right font-medium ${msg.sender === 'support' ? 'text-blue-200' : 'text-gray-400'}`}>
                          {format(new Date(msg.timestamp), 'h:mm a')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Bottom padding for scrolling past last message */}
            <div className="h-6"></div>
          </div>
        </div>

        {/* Reply Box */}
        <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] relative z-10">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your reply to the customer..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-sm transition-all"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-sm hover:shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
