import { Ticket } from './store';

const mockTickets: Ticket[] = [
  {
    id: 'TICK-1001',
    customerName: 'Alice Johnson',
    customerEmail: 'alice@example.com',
    subject: 'Cannot login to my account',
    description: 'I keep getting an "invalid password" error even though I just reset it.',
    priority: 'High',
    status: 'Open',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    messages: [
      { id: 'm1', sender: 'customer', text: 'Please help, I need to access my dashboard.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() }
    ]
  },
  {
    id: 'TICK-1002',
    customerName: 'Bob Smith',
    customerEmail: 'bob@example.com',
    subject: 'Billing discrepancy',
    description: 'I was charged twice for the last month subscription.',
    priority: 'High',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    messages: [
      { id: 'm1', sender: 'customer', text: 'Attached is the invoice showing double charge.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
      { id: 'm2', sender: 'support', text: 'Hi Bob, we are looking into this issue with our payment processor.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString() }
    ]
  },
  {
    id: 'TICK-1003',
    customerName: 'Carol White',
    customerEmail: 'carol@example.com',
    subject: 'Feature request: dark mode',
    description: 'It would be great to have a dark mode option for the app.',
    priority: 'Low',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    messages: [
      { id: 'm1', sender: 'support', text: 'Thanks for the suggestion! We have added it to our roadmap.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString() }
    ]
  },
  {
    id: 'TICK-1004',
    customerName: 'Dave Brown',
    customerEmail: 'dave@example.com',
    subject: 'App crashes on startup',
    description: 'The mobile app crashes immediately when I open it on iOS 16.',
    priority: 'High',
    status: 'Open',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    messages: []
  },
  {
    id: 'TICK-1005',
    customerName: 'Eve Davis',
    customerEmail: 'eve@example.com',
    subject: 'How to export data?',
    description: 'I need to export my reports to CSV. Where can I find this option?',
    priority: 'Medium',
    status: 'Open',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    messages: []
  }
];

export const fetchTickets = async (): Promise<Ticket[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTickets);
    }, 800);
  });
};
