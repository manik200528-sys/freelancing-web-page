import { Client, Freelancer, Job, User, Proposal, Contract, Milestone, Review, Conversation, Message, Notification } from '../types';

// Generate random ID
const generateId = () => Math.random().toString(36).substring(2, 10);

// Sample Users
export const users: User[] = [
  {
    id: 'user1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: '2023-01-15T12:00:00Z',
  },
  {
    id: 'user2',
    name: 'James Wilson',
    email: 'james@example.com',
    role: 'freelancer',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: '2023-02-20T09:30:00Z',
  },
  {
    id: 'user3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: '2023-03-05T14:15:00Z',
  },
  {
    id: 'user4',
    name: 'Emma Rodriguez',
    email: 'emma@example.com',
    role: 'freelancer',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: '2023-03-12T11:45:00Z',
  },
  {
    id: 'user5',
    name: 'David Thompson',
    email: 'david@example.com',
    role: 'freelancer',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: '2023-04-18T08:20:00Z',
  },
];

// Sample Clients
export const clients: Client[] = [
  {
    id: 'user1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    company: 'TechNova Inc.',
    industry: 'Software Development',
    description: 'TechNova is a growing tech startup specializing in mobile app development and web solutions.',
    location: 'San Francisco, CA',
    createdAt: '2023-01-15T12:00:00Z',
  },
  {
    id: 'user3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'client',
    avatar: 'https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg?auto=compress&cs=tinysrgb&w=600',
    company: 'GreenLeaf Marketing',
    industry: 'Digital Marketing',
    description: 'GreenLeaf helps businesses grow their online presence through strategic digital marketing campaigns.',
    location: 'Austin, TX',
    createdAt: '2023-03-05T14:15:00Z',
  },
];

// Sample Freelancers
export const freelancers: Freelancer[] = [
  {
    id: 'user2',
    name: 'James Wilson',
    email: 'james@example.com',
    role: 'freelancer',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Senior Full Stack Developer',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    hourlyRate: 75,
    bio: 'Full stack developer with 8+ years of experience building scalable web applications and mentoring junior developers.',
    location: 'Toronto, Canada',
    experience: 8,
    portfolioItems: [
      {
        id: 'portfolio1',
        title: 'E-commerce Platform',
        description: 'Built a full-featured e-commerce platform with React, Node.js, and MongoDB.',
        images: ['https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
        link: 'https://example-ecommerce.com',
        skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      },
      {
        id: 'portfolio2',
        title: 'Task Management App',
        description: 'Developed a real-time task management application with drag-and-drop functionality.',
        images: ['https://images.pexels.com/photos/2736499/pexels-photo-2736499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
        link: 'https://example-tasks.com',
        skills: ['React', 'Firebase', 'Material-UI'],
      },
    ],
    education: [
      {
        id: 'edu1',
        institution: 'University of Toronto',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        from: '2010-09-01',
        to: '2014-05-30',
        current: false,
      },
    ],
    availability: 'available',
    createdAt: '2023-02-20T09:30:00Z',
  },
  {
    id: 'user4',
    name: 'Emma Rodriguez',
    email: 'emma@example.com',
    role: 'freelancer',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'UX/UI Designer',
    skills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD', 'Prototyping'],
    hourlyRate: 65,
    bio: 'Passionate UX/UI designer focused on creating intuitive and engaging user experiences across web and mobile platforms.',
    location: 'Berlin, Germany',
    experience: 5,
    portfolioItems: [
      {
        id: 'portfolio3',
        title: 'Banking App Redesign',
        description: 'Redesigned a banking app to improve user experience and increase engagement.',
        images: ['https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
        link: 'https://behance.net/emma-portfolio',
        skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping'],
      },
    ],
    education: [
      {
        id: 'edu2',
        institution: 'Berlin Design Academy',
        degree: 'Master of Arts',
        fieldOfStudy: 'Digital Design',
        from: '2015-10-01',
        to: '2017-06-30',
        current: false,
      },
    ],
    availability: 'limited',
    createdAt: '2023-03-12T11:45:00Z',
  },
  {
    id: 'user5',
    name: 'David Thompson',
    email: 'david@example.com',
    role: 'freelancer',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Digital Marketing Specialist',
    skills: ['SEO', 'Content Marketing', 'Google Ads', 'Social Media', 'Analytics'],
    hourlyRate: 55,
    bio: 'Results-driven digital marketer with a track record of increasing conversion rates and optimizing ROI for clients.',
    location: 'Melbourne, Australia',
    experience: 6,
    portfolioItems: [
      {
        id: 'portfolio4',
        title: 'E-commerce SEO Campaign',
        description: 'Increased organic traffic by 150% for an e-commerce client through technical SEO and content strategy.',
        images: ['https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
        skills: ['SEO', 'Analytics', 'Content Strategy'],
      },
    ],
    education: [
      {
        id: 'edu3',
        institution: 'University of Melbourne',
        degree: 'Bachelor of Business',
        fieldOfStudy: 'Marketing',
        from: '2012-03-01',
        to: '2016-11-30',
        current: false,
      },
    ],
    availability: 'available',
    createdAt: '2023-04-18T08:20:00Z',
  },
];

// Sample Jobs
export const jobs: Job[] = [
  {
    id: 'job1',
    clientId: 'user1',
    title: 'React Native Mobile App Development',
    description: `We're looking for an experienced React Native developer to build a cross-platform mobile app for our e-commerce business. The app should include user authentication, product browsing, cart functionality, and order processing.

    Key Requirements:
    - Strong experience with React Native and TypeScript
    - Knowledge of state management (Redux or Context API)
    - Experience integrating RESTful APIs
    - Familiarity with native modules when needed
    - Ability to implement smooth animations and transitions

    The ideal candidate will have a portfolio demonstrating previous mobile app projects and can commit to regular communication throughout the development process.`,
    skills: ['React Native', 'TypeScript', 'Redux', 'API Integration', 'Mobile Development'],
    category: 'Mobile Development',
    budget: {
      min: 5000,
      max: 10000,
    },
    type: 'fixed',
    duration: '2-3 months',
    status: 'open',
    location: 'remote',
    createdAt: '2023-06-10T10:30:00Z',
    proposals: 4,
    expiry: '2023-07-10T10:30:00Z',
  },
  {
    id: 'job2',
    clientId: 'user3',
    title: 'SEO Strategy and Implementation',
    description: `GreenLeaf Marketing is seeking an SEO specialist to develop and implement a comprehensive SEO strategy for our digital marketing agency website. The goal is to improve our organic search rankings and increase qualified traffic.

    Responsibilities include:
    - Conducting a thorough SEO audit of our current website
    - Developing a keyword strategy aligned with our business goals
    - Implementing on-page and technical SEO improvements
    - Creating a content strategy to support SEO efforts
    - Providing monthly reports on performance and recommendations

    The ideal candidate will have proven experience improving search rankings for B2B service businesses and be knowledgeable about the latest SEO best practices.`,
    skills: ['SEO', 'Content Strategy', 'Google Analytics', 'Technical SEO', 'Keyword Research'],
    category: 'Digital Marketing',
    budget: {
      min: 2500,
      max: 5000,
    },
    type: 'fixed',
    duration: '1-2 months',
    status: 'open',
    location: 'remote',
    createdAt: '2023-06-15T14:45:00Z',
    proposals: 7,
    expiry: '2023-07-15T14:45:00Z',
  },
  {
    id: 'job3',
    clientId: 'user1',
    title: 'UI/UX Redesign for SaaS Dashboard',
    description: `TechNova is looking for a UI/UX designer to redesign our SaaS product dashboard. Our current interface needs a modern refresh that improves usability while maintaining functionality.

    Project scope includes:
    - User research and usability assessment of current dashboard
    - Creation of wireframes and design mockups
    - Development of an interactive prototype
    - Design system documentation
    - Collaboration with our development team for implementation

    We're looking for someone with experience designing complex data dashboards who can balance aesthetics with usability.`,
    skills: ['UI Design', 'UX Design', 'Figma', 'Dashboard Design', 'Design Systems'],
    category: 'Design',
    budget: {
      min: 3000,
      max: 6000,
    },
    type: 'fixed',
    duration: '4-6 weeks',
    status: 'open',
    location: 'remote',
    createdAt: '2023-06-20T09:15:00Z',
    proposals: 5,
    expiry: '2023-07-20T09:15:00Z',
  },
  {
    id: 'job4',
    clientId: 'user3',
    title: 'Content Marketing Specialist (Ongoing)',
    description: `GreenLeaf Marketing is looking for a content marketing specialist to join our team on an ongoing basis. We need someone who can create engaging, SEO-optimized content for our clients in various industries.

    Responsibilities:
    - Creating blog posts, articles, case studies, and white papers
    - Conducting topic and keyword research
    - Optimizing content for search engines and target audiences
    - Developing content calendars and strategies
    - Analyzing content performance and making improvements

    This is an ongoing role with consistent work. We're looking for someone who can commit to 15-20 hours per week.`,
    skills: ['Content Writing', 'SEO', 'Content Strategy', 'Editing', 'Research'],
    category: 'Content & Copywriting',
    budget: {
      min: 25,
      max: 40,
    },
    type: 'hourly',
    duration: 'Ongoing',
    status: 'open',
    location: 'remote',
    createdAt: '2023-06-25T11:00:00Z',
    proposals: 9,
    expiry: '2023-07-25T11:00:00Z',
  },
  {
    id: 'job5',
    clientId: 'user1',
    title: 'Backend Developer for API Development',
    description: `TechNova is seeking a backend developer to build a robust API for our mobile application. The API will need to handle user authentication, data processing, and integration with third-party services.

    Technical requirements:
    - Experience with Node.js/Express or similar frameworks
    - Strong knowledge of RESTful API design principles
    - Database design and implementation (MongoDB preferred)
    - Authentication and authorization implementation
    - API documentation

    The ideal candidate will have experience building scalable APIs and be comfortable with agile development methodologies.`,
    skills: ['Node.js', 'Express', 'MongoDB', 'API Development', 'Authentication'],
    category: 'Web Development',
    budget: {
      min: 4000,
      max: 7000,
    },
    type: 'fixed',
    duration: '6-8 weeks',
    status: 'open',
    location: 'remote',
    createdAt: '2023-06-30T13:30:00Z',
    proposals: 6,
    expiry: '2023-07-30T13:30:00Z',
  },
];

// Sample Proposals
export const proposals: Proposal[] = [
  {
    id: 'proposal1',
    jobId: 'job1',
    freelancerId: 'user2',
    coverLetter: "I'm excited to apply for the React Native developer position. With 8+ years of experience in full-stack development, including 4 years specifically focused on React Native, I have the skills and expertise needed to deliver a high-quality mobile app for your e-commerce business.\n\nI've built several similar apps in the past, including a cross-platform e-commerce solution that increased my client's mobile sales by 45%. I'm proficient with TypeScript, Redux for state management, and integrating various payment gateways and APIs.\n\nI can commit to your timeline and would be happy to discuss the project requirements in more detail.",
    bid: 8500,
    estimatedDuration: '10 weeks',
    status: 'pending',
    createdAt: '2023-06-11T09:00:00Z',
  },
  {
    id: 'proposal2',
    jobId: 'job3',
    freelancerId: 'user4',
    coverLetter: "I'm very interested in redesigning your SaaS dashboard. As a UX/UI designer with 5 years of experience, I've worked on several complex dashboard projects that required balancing data visualization with intuitive user interfaces.\n\nAfter reviewing your requirements, I'd approach this project by first conducting a thorough analysis of your current dashboard, identifying pain points, and researching your users' needs. Then I'd create wireframes, design mockups, and an interactive prototype for testing before finalizing the design system.\n\nI've attached some examples of my previous dashboard designs in my portfolio. I'd be happy to discuss your specific requirements in more detail.",
    bid: 5200,
    estimatedDuration: '5 weeks',
    status: 'pending',
    createdAt: '2023-06-22T15:30:00Z',
  },
  {
    id: 'proposal3',
    jobId: 'job2',
    freelancerId: 'user5',
    coverLetter: "I'm applying for the SEO Strategy position with GreenLeaf Marketing. As a digital marketing specialist with 6 years of experience in SEO, I've helped numerous B2B companies improve their search rankings and increase organic traffic.\n\nMy approach would include a comprehensive technical audit, competitor analysis, keyword research focused on intent-based queries, and developing a content strategy that aligns with your business objectives. I've previously worked with several marketing agencies to improve their own online visibility, resulting in a 90% increase in qualified leads for one client.\n\nI'd be happy to discuss my previous SEO case studies and how I can help GreenLeaf Marketing achieve its goals.",
    bid: 3800,
    estimatedDuration: '6 weeks',
    status: 'accepted',
    createdAt: '2023-06-16T10:15:00Z',
  },
];

// Sample Contracts
export const contracts: Contract[] = [
  {
    id: 'contract1',
    jobId: 'job2',
    clientId: 'user3',
    freelancerId: 'user5',
    proposalId: 'proposal3',
    terms: "This agreement outlines the SEO strategy and implementation services to be provided by David Thompson for GreenLeaf Marketing. The project will be completed according to the milestones outlined below, with payments released upon successful completion of each milestone.",
    milestones: [
      {
        id: 'milestone1',
        title: 'SEO Audit and Strategy',
        description: 'Complete technical SEO audit, competitor analysis, and development of comprehensive SEO strategy document.',
        amount: 1200,
        dueDate: '2023-07-01T23:59:59Z',
        status: 'released',
        submissionDate: '2023-06-30T16:45:00Z',
        approvalDate: '2023-07-01T10:30:00Z',
      },
      {
        id: 'milestone2',
        title: 'On-Page SEO Implementation',
        description: 'Implementation of on-page SEO improvements, including meta tags, content optimization, and internal linking structure.',
        amount: 1300,
        dueDate: '2023-07-15T23:59:59Z',
        status: 'in-progress',
        submissionDate: undefined,
        approvalDate: undefined,
      },
      {
        id: 'milestone3',
        title: 'Content Strategy and Creation',
        description: 'Development of content calendar and creation of 4 SEO-optimized blog posts targeting key keywords.',
        amount: 1300,
        dueDate: '2023-07-31T23:59:59Z',
        status: 'pending',
        submissionDate: undefined,
        approvalDate: undefined,
      },
    ],
    status: 'active',
    startDate: '2023-06-25T12:00:00Z',
    endDate: undefined,
    createdAt: '2023-06-25T12:00:00Z',
  },
];

// Sample Reviews
export const reviews: Review[] = [
  {
    id: 'review1',
    contractId: 'contract1',
    reviewerId: 'user3',
    receiverId: 'user5',
    rating: 5,
    comment: "David did an outstanding job with the SEO audit and strategy for our company website. His analysis was thorough and his recommendations were clear and actionable. He was also very responsive and professional throughout the first milestone. Looking forward to continuing our work together.",
    createdAt: '2023-07-01T14:30:00Z',
  },
];

// Sample Conversations
export const conversations: Conversation[] = [
  {
    id: 'conversation1',
    participants: ['user1', 'user2'],
    updatedAt: '2023-06-12T11:45:00Z',
    createdAt: '2023-06-11T15:30:00Z',
  },
  {
    id: 'conversation2',
    participants: ['user3', 'user5'],
    updatedAt: '2023-06-30T18:20:00Z',
    createdAt: '2023-06-16T16:45:00Z',
  },
  {
    id: 'conversation3',
    participants: ['user1', 'user4'],
    updatedAt: '2023-06-22T20:10:00Z',
    createdAt: '2023-06-22T19:00:00Z',
  },
];

// Sample Messages
export const messages: Message[] = [
  // Conversation 1 (Sarah and James)
  {
    id: 'message1',
    conversationId: 'conversation1',
    senderId: 'user1',
    content: "Hi James, I saw your proposal for our React Native project. I'm impressed with your portfolio. Do you have time to discuss the project in more detail?",
    readAt: '2023-06-11T15:35:00Z',
    createdAt: '2023-06-11T15:30:00Z',
  },
  {
    id: 'message2',
    conversationId: 'conversation1',
    senderId: 'user2',
    content: "Hello Sarah, thank you for reaching out! I'd be happy to discuss the project in more detail. I'm available tomorrow between 10 AM and 2 PM EST for a call if that works for you.",
    readAt: '2023-06-11T16:00:00Z',
    createdAt: '2023-06-11T15:45:00Z',
  },
  {
    id: 'message3',
    conversationId: 'conversation1',
    senderId: 'user1',
    content: "Great! Let's schedule a call for tomorrow at 11 AM EST. I'll send you a meeting link shortly. I'd like to go over the app requirements and discuss your approach to the project.",
    readAt: '2023-06-11T17:30:00Z',
    createdAt: '2023-06-11T16:15:00Z',
  },
  {
    id: 'message4',
    conversationId: 'conversation1',
    senderId: 'user2',
    content: "Sounds good! I've marked it in my calendar. Looking forward to our call and learning more about your requirements. I'll prepare some questions about your target audience and specific features you'd like to prioritize.",
    readAt: '2023-06-11T18:00:00Z',
    createdAt: '2023-06-11T17:45:00Z',
  },
  {
    id: 'message5',
    conversationId: 'conversation1',
    senderId: 'user1',
    content: "I've just sent the meeting invite to your email. Also, I wanted to ask if you have experience integrating payment gateways like Stripe into React Native apps?",
    readAt: null,
    createdAt: '2023-06-12T11:45:00Z',
  },
  
  // Conversation 2 (Michael and David)
  {
    id: 'message6',
    conversationId: 'conversation2',
    senderId: 'user3',
    content: "Hi David, I've reviewed your proposal for our SEO project and I'm impressed with your approach. I'd like to move forward with your services.",
    readAt: '2023-06-16T17:00:00Z',
    createdAt: '2023-06-16T16:45:00Z',
  },
  {
    id: 'message7',
    conversationId: 'conversation2',
    senderId: 'user5',
    content: "That's great news, Michael! Thank you for choosing me for this project. I'm excited to help improve GreenLeaf Marketing's SEO performance. When would be a good time to discuss the next steps?",
    readAt: '2023-06-16T18:30:00Z',
    createdAt: '2023-06-16T17:15:00Z',
  },
  {
    id: 'message8',
    conversationId: 'conversation2',
    senderId: 'user3',
    content: "I've sent you the contract for review. Once you've signed it, we can schedule a kickoff meeting early next week to discuss the project timeline and initial requirements.",
    readAt: '2023-06-16T20:00:00Z',
    createdAt: '2023-06-16T19:00:00Z',
  },
  {
    id: 'message9',
    conversationId: 'conversation2',
    senderId: 'user5',
    content: "I've reviewed and signed the contract. Monday morning would work well for our kickoff meeting if that suits you. I'll need access to your Google Analytics and Search Console to begin the audit phase.",
    readAt: '2023-06-17T09:15:00Z',
    createdAt: '2023-06-16T21:30:00Z',
  },
  {
    id: 'message10',
    conversationId: 'conversation2',
    senderId: 'user3',
    content: "Monday at 10 AM works perfectly. I'll send calendar invites and access to our analytics accounts later today. Looking forward to working with you!",
    readAt: '2023-06-17T10:00:00Z',
    createdAt: '2023-06-17T09:30:00Z',
  },
  {
    id: 'message11',
    conversationId: 'conversation2',
    senderId: 'user5',
    content: "Just wanted to let you know I've completed the first milestone - the SEO audit and strategy document. I've uploaded it to the project folder for your review. The document includes a comprehensive analysis of your current SEO status, competitor research, and a detailed action plan.",
    readAt: '2023-06-30T18:25:00Z',
    createdAt: '2023-06-30T18:20:00Z',
  },
  
  // Conversation 3 (Sarah and Emma)
  {
    id: 'message12',
    conversationId: 'conversation3',
    senderId: 'user1',
    content: "Hello Emma, I've reviewed your proposal for our UI/UX redesign project. I'm particularly impressed with your previous dashboard designs. Are you available to discuss the project scope in more detail?",
    readAt: '2023-06-22T19:05:00Z',
    createdAt: '2023-06-22T19:00:00Z',
  },
  {
    id: 'message13',
    conversationId: 'conversation3',
    senderId: 'user4',
    content: "Hi Sarah, thank you for your message! I'd be happy to discuss the project in more detail. I'm available tomorrow or Friday for a video call if that works for you?",
    readAt: '2023-06-22T19:30:00Z',
    createdAt: '2023-06-22T19:15:00Z',
  },
  {
    id: 'message14',
    conversationId: 'conversation3',
    senderId: 'user1',
    content: "Friday at 2 PM EST would work well for me. I'd like to go over our current dashboard, the main pain points, and discuss your process for the redesign. Would that time work for you?",
    readAt: '2023-06-22T20:15:00Z',
    createdAt: '2023-06-22T20:10:00Z',
  },
];

// Sample Notifications
export const notifications: Notification[] = [
  {
    id: 'notification1',
    userId: 'user1',
    title: 'New proposal received',
    message: 'You have received a new proposal for "React Native Mobile App Development" from James Wilson.',
    type: 'info',
    read: true,
    link: '/proposals/view/proposal1',
    createdAt: '2023-06-11T09:00:00Z',
  },
  {
    id: 'notification2',
    userId: 'user2',
    title: 'Message received',
    message: 'You have a new message from Sarah Johnson regarding the React Native project.',
    type: 'info',
    read: true,
    link: '/messages/conversation1',
    createdAt: '2023-06-11T15:30:00Z',
  },
  {
    id: 'notification3',
    userId: 'user3',
    title: 'Milestone completed',
    message: 'David Thompson has submitted the "SEO Audit and Strategy" milestone for your review.',
    type: 'success',
    read: false,
    link: '/contracts/contract1',
    createdAt: '2023-06-30T16:45:00Z',
  },
  {
    id: 'notification4',
    userId: 'user5',
    title: 'Payment received',
    message: 'You have received a payment of $1,200 for completing the "SEO Audit and Strategy" milestone.',
    type: 'success',
    read: false,
    link: '/payments',
    createdAt: '2023-07-01T10:35:00Z',
  },
  {
    id: 'notification5',
    userId: 'user4',
    title: 'New message',
    message: 'You have a new message from Sarah Johnson regarding the UI/UX redesign project.',
    type: 'info',
    read: true,
    link: '/messages/conversation3',
    createdAt: '2023-06-22T19:00:00Z',
  },
];

// Get current user data (for demo purposes)
export const getCurrentUser = () => {
  // For demo purposes, return a fixed user
  return users.find(user => user.id === 'user1') || null;
};