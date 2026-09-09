import { create } from 'zustand';
import { fetchTickets } from './api';

export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Open' | 'In Progress' | 'Resolved';

export interface Message {
  id: string;
  sender: 'customer' | 'support';
  text: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  messages: Message[];
}

interface TicketState {
  tickets: Ticket[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  statusFilter: Status | 'All';
  priorityFilter: Priority | 'All';
  selectedTicketId: string | null;
  
  fetchTickets: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: Status | 'All') => void;
  setPriorityFilter: (priority: Priority | 'All') => void;
  updateTicketStatus: (id: string, status: Status) => void;
  setSelectedTicketId: (id: string | null) => void;
  addMessage: (ticketId: string, text: string) => void;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  statusFilter: 'All',
  priorityFilter: 'All',
  selectedTicketId: null,

  fetchTickets: async () => {
    set({ isLoading: true, error: null });
    try {
      const tickets = await fetchTickets();
      set({ tickets, isLoading: false });
    } catch (err) {
      set({ error: 'Failed to fetch tickets', isLoading: false });
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setPriorityFilter: (priority) => set({ priorityFilter: priority }),
  
  updateTicketStatus: (id, status) => set((state) => ({
    tickets: state.tickets.map((t) => (t.id === id ? { ...t, status } : t)),
  })),

  setSelectedTicketId: (id) => set({ selectedTicketId: id }),

  addMessage: (ticketId, text) => set((state) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'support',
      text,
      timestamp: new Date().toISOString()
    };
    return {
      tickets: state.tickets.map(t => 
        t.id === ticketId 
          ? { ...t, messages: [...t.messages, newMessage] } 
          : t
      )
    };
  })
}));
