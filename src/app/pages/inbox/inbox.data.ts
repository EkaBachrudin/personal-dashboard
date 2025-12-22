export interface EmailMessage {
  id: string;
  sender: string;
  recipient?: string;
  subject: string;
  preview: string;
  time: string;
  isStarred: boolean;
  isRead: boolean;
  label: string;
  isChecked: boolean;
  folder?: string;
}

export interface EmailFolder {
  name: string;
  count: number;
  icon: string;
  isActive: boolean;
}

export interface EmailLabel {
  name: string;
  color: string;
  isChecked: boolean;
}

export const folders: EmailFolder[] = [
    { name: 'Inbox', count: 1253, icon: '/assets/icons/mail.svg', isActive: false },
    { name: 'Starred', count: 245, icon: '/assets/icons/rating-star.svg', isActive: false },
    { name: 'Sent', count: 24532, icon: '/assets/icons/send-email-1.svg', isActive: false },
    { name: 'Draft', count: 9, icon: '/assets/icons/pencil.svg', isActive: false },
    { name: 'Spam', count: 14, icon: '/assets/icons/warning.svg', isActive: false },
    { name: 'Important', count: 18, icon: '/assets/icons/messages-bubble-settings.svg', isActive: false },
    { name: 'Bin', count: 9, icon: '/assets/icons/bin.svg', isActive: false }
  ];

  // Email labels data
  export const labels: EmailLabel[] = [
    { name: 'Primary', color: 'green', isChecked: false },
    { name: 'Social', color: 'blue', isChecked: false },
    { name: 'Work', color: 'orange', isChecked: false },
    { name: 'Friends', color: 'purple', isChecked: false }
  ];

  // Email messages data
  export const messages: EmailMessage[] = [
    {
      id: '1',
      sender: 'Jullu Jalal',
      subject: 'Our Bachelor of Commerce program is ACBSP-accredited.',
      preview: 'Our Bachelor of Commerce program is ACBSP-accredited.',
      time: '8:38 AM',
      isStarred: false,
      isRead: false,
      label: 'Primary',
      isChecked: false,
      folder: 'inbox'
    },
    {
      id: '2',
      sender: 'Minerva Barnett',
      subject: 'Get Best Advertiser In Your Side Pocket',
      preview: 'Get Best Advertiser In Your Side Pocket',
      time: '8:13 AM',
      isStarred: false,
      isRead: false,
      label: 'Work',
      isChecked: false,
      folder: 'inbox'
    },
    {
      id: '3',
      sender: 'Peter Lewis',
      subject: 'Vacation Home Rental Success',
      preview: 'Vacation Home Rental Success',
      time: '7:52 PM',
      isStarred: true,
      isRead: false,
      label: 'Friends',
      isChecked: false,
      folder: 'inbox'
    },
    {
      id: '4',
      sender: 'Anthony Briggs',
      subject: 'Free Classifieds Using Them To Promote Your Stuff Online',
      preview: 'Free Classifieds Using Them To Promote Your Stuff Online',
      time: '7:52 PM',
      isStarred: false,
      isRead: false,
      label: '',
      isChecked: false,
      folder: 'inbox'
    },
    {
      id: '5',
      sender: 'Clifford Morgan',
      subject: 'Enhance Your Brand Potential With Giant Advertising Blimps',
      preview: 'Enhance Your Brand Potential With Giant Advertising Blimps',
      time: '4:13 PM',
      isStarred: true,
      isRead: false,
      label: 'Social',
      isChecked: false,
      folder: 'inbox'
    },
    {
      id: '6',
      sender: 'Me',
      recipient: 'Sarah Johnson',
      subject: 'Project Update - Q4 Goals',
      preview: 'Hi Sarah, I wanted to share our progress on the Q4 goals...',
      time: '3:45 PM',
      isStarred: false,
      isRead: true,
      label: 'Work',
      isChecked: false,
      folder: 'sent'
    },
    {
      id: '7',
      sender: 'Me',
      recipient: 'Marketing Team',
      subject: 'New Campaign Ideas',
      preview: 'Team, I have some exciting ideas for our upcoming campaign...',
      time: '2:30 PM',
      isStarred: true,
      isRead: true,
      label: 'Work',
      isChecked: false,
      folder: 'sent'
    },
    {
      id: '8',
      sender: 'Me',
      recipient: 'Draft',
      subject: 'Meeting Notes - Product Review',
      preview: 'Today we discussed the new features for the product roadmap...',
      time: '1:15 PM',
      isStarred: false,
      isRead: true,
      label: 'Work',
      isChecked: false,
      folder: 'draft'
    },
    {
      id: '9',
      sender: 'Me',
      recipient: 'Draft',
      subject: 'Budget Proposal 2024',
      preview: 'Dear Finance Team, Please find attached our budget proposal...',
      time: '11:00 AM',
      isStarred: false,
      isRead: true,
      label: 'Work',
      isChecked: false,
      folder: 'draft'
    }
  ];