// ─── Types ───────────────────────────────────────────────────────────────────

export interface Developer {
  name: string
  firstName: string
  title: string
  bio: string
  bioExtended: string[]
  location: string
  email: string
  github: string
  linkedin: string
  whatsapp: string // formato E.164 sem +, ex: "5511999999999"
  initials: string
}

export interface SkillGroup {
  label: string
  skills: string[]
}

export interface Project {
  title: string
  description: string
  stack: string[]
  demoUrl: string
  repoUrl: string
}

export interface Experience {
  role: string
  company: string
  period: string
  description: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const developer: Developer = {
  name: 'Matheus de Miranda Ferreira',
  firstName: 'Matheus',
  title: 'Desenvolvedor Frontend Sênior',
  bio: 'Especialista em criar interfaces modernas, performáticas e escaláveis.',
  bioExtended: [
    'Com mais de 5 anos de experiência, transformo ideias em produtos digitais que funcionam — rápidos, bonitos e que convertem.',
    'Trabalho com React, React Native e todo o ecossistema moderno de frontend. Do design ao deploy, cuido de cada detalhe.',
    'Se você precisa de um site que vende, de um app que as pessoas adoram usar, ou de um sistema complexo que funciona sem travar — é comigo.',
  ],
  location: 'São Paulo, Brasil',
  email: '[SEU_EMAIL]',
  github: 'https://github.com/[SEU_USER]',
  linkedin: 'https://linkedin.com/in/[SEU_USER]',
  whatsapp: '55[SEU_NUMERO]',
  initials: 'MMF',
}

export const skillGroups: SkillGroup[] = [
  { label: 'Core', skills: ['React', 'React Native', 'TypeScript', 'JavaScript ES6+'] },
  { label: 'Estilização', skills: ['Shadcn/UI', 'Tailwind CSS', 'Styled Components', 'Reactstrap', 'CSS Modules'] },
  { label: 'Estado & Dados', skills: ['TanStack Query', 'Context API'] },
  { label: 'Formulários', skills: ['React Hook Form', 'Zod'] },
  { label: 'Tooling', skills: ['Vite', 'ESLint', 'Prettier'] },
  { label: 'Tempo Real', skills: ['WebSocket', 'Socket.io'] },
  { label: 'Testes', skills: ['Jest', 'React Testing Library', 'Cypress'] },
  { label: 'Outros', skills: ['Git', 'CI/CD', 'Figma', 'REST APIs', 'GraphQL'] },
]

export const projects: Project[] = [
  {
    title: 'Dashboard de Monitoramento Real-Time',
    description: 'Dashboard com atualização em tempo real via WebSocket, gráficos interativos e filtros avançados.',
    stack: ['React', 'TypeScript', 'TanStack Query', 'WebSocket', 'Tailwind CSS', 'Recharts'],
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'App Mobile de Gestão de Tarefas',
    description: 'Aplicativo mobile multiplataforma com sync offline, notificações push e UI fluida.',
    stack: ['React Native', 'TypeScript', 'React Hook Form', 'Zod'],
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'E-commerce SPA',
    description: 'Loja virtual SPA com carrinho persistente, busca com debounce, paginação infinita e checkout multi-step.',
    stack: ['React', 'TypeScript', 'Styled Components', 'TanStack Query', 'Vite'],
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Sistema de Chat Colaborativo',
    description: 'Chat em tempo real com rooms, typing indicators, envio de arquivos e histórico persistente.',
    stack: ['React', 'Socket.io', 'TypeScript', 'Tailwind CSS', 'Zod'],
    demoUrl: '#',
    repoUrl: '#',
  },
]

export const experiences: Experience[] = [
  {
    role: 'Desenvolvedor Frontend Sênior',
    company: '[EMPRESA_ATUAL]',
    period: '2022 — Presente',
    description: 'Liderança técnica de projetos frontend, definição de arquitetura, code reviews e mentoria de devs juniors.',
  },
  {
    role: 'Desenvolvedor Frontend Pleno',
    company: '[EMPRESA_ANTERIOR]',
    period: '2020 — 2022',
    description: 'Desenvolvimento de SPAs complexas, integração com APIs REST, implementação de design systems.',
  },
]
