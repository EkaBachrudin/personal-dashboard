export interface EmailMessage {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isStarred: boolean;
  isRead: boolean;
  label: string;
  isChecked: boolean;
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
      isChecked: false
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
      isChecked: false
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
      isChecked: false
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
      isChecked: false
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
      isChecked: false
    }
  ];