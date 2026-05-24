export interface Project {
  title: string;
  description: string;
  tags: string[];
  status: string;
  icon: string;
  link?: string;
}

export const mockProjects: Project[] = [
  {
    title: 'Market Entry Analysis – Vietnam F&B Industry',
    description:
      'Conducted comprehensive market research and competitive analysis for a new beverage brand entering Vietnam\'s rapidly growing F&B market. Delivered strategic recommendations using SWOT and Porter\'s Five Forces frameworks.',
    tags: ['Market Research', 'Business Analysis', 'SWOT', 'Data Visualization'],
    status: 'Academic Project',
    icon: '📊',
  },
  {
    title: 'E-Compete 2025 – National Business Strategy Competition',
    description:
      'Developed a complete business proposal and go-to-market strategy for a startup case study, reaching Top 30 in the E-Compete 2025 national competition among 200+ teams.',
    tags: ['Strategy', 'Presentation', 'Case Study', 'Team Collaboration'],
    status: 'Competition · Top 30',
    icon: '🏆',
  },
  {
    title: 'REC Club – Sponsorship & External Relations Campaign',
    description:
      'Led the external relations effort for REC Club\'s annual flagship event. Researched potential sponsors, crafted outreach proposals, and successfully secured financial support from external partners.',
    tags: ['Event Planning', 'Stakeholder Management', 'Negotiation', 'Communications'],
    status: 'Club Leadership',
    icon: '🎯',
  },
  {
    title: 'English Communication Workshop Series',
    description:
      'Designed supplementary English communication materials and mini-lesson plans for secondary school students during tutoring and teaching-assistant roles, improving student engagement and comprehension outcomes.',
    tags: ['English', 'Content Design', 'Teaching', 'Curriculum Planning'],
    status: 'Volunteer & Part-time',
    icon: '📚',
  },
];
