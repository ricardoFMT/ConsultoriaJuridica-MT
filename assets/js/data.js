const areasData = [
  {
    title: 'Direito Empresarial',
    description:
      'Reestruturação societária, governança corporativa, contratos estratégicos e proteção patrimonial para empresas de alto crescimento.',
    bullet: 'Células de M&A, contratos complexos e disputas societárias.'
  },
  {
    title: 'Direito Tributário',
    description:
      'Planejamento, contencioso administrativo e judicial, além de revisão de benefícios fiscais para redução de carga tributária.',
    bullet: 'Robôs de auditoria para detecção de créditos tributários.'
  },
  {
    title: 'Direito Trabalhista Estratégico',
    description:
      'Gestão de passivos, programas de compliance, negociação com sindicatos e atuação preventiva para RHs estratégicos.',
    bullet: 'Dashboard de riscos em tempo real e mapeamento de tendências.'
  },
  {
    title: 'Família e Sucessões',
    description:
      'Planejamento sucessório, inventários complexos, proteção de patrimônio e suporte em disputas familiares sensíveis.',
    bullet: 'Uso de mediação assistida e blindagem patrimonial completa.'
  },
  {
    title: 'Startups & Venture Capital',
    description:
      'Constituição, captação, stock options, due diligence e estruturação jurídica de rodadas de investimento.',
    bullet: 'Playbooks customizados para escala e governança desde o primeiro dia.'
  },
  {
    title: 'Contencioso Estratégico',
    description:
      'Disputas de alto impacto com estratégia de dados, precedentes e inteligência competitiva para litígios complexos.',
    bullet: 'War room digital com monitoramento de jurisprudência e cenários.'
  }
];

const lawyersData = [
  {
    nome: 'Marina Albuquerque',
    area: 'Empresarial',
    oab: 'OAB/MT 12345',
    bio: '15 anos liderando reestruturações e disputas societárias para grupos familiares e fundos de private equity.',
    resultados: [
      'Economia de R$ 120 mi em litígios preventivos',
      'Estruturação de conselho de governança para holding agrícola'
    ]
  },
  {
    nome: 'Ricardo Sena',
    area: 'Tributário',
    oab: 'OAB/SP 54321',
    bio: 'Especialista em planejamento fiscal e contencioso estratégico com forte atuação em agronegócio e energia.',
    resultados: [
      'Recuperação de R$ 35 mi em créditos',
      'Redução de 18% na carga tributária de grupo industrial'
    ]
  },
  {
    nome: 'Larissa Duarte',
    area: 'Trabalhista',
    oab: 'OAB/MT 99887',
    bio: 'Foca em passivos trabalhistas complexos, programas de diversidade e acordos estratégicos.',
    resultados: [
      'Reversão de condenação bilionária em instância superior',
      'Implementação de compliance trabalhista em 12 filiais'
    ]
  },
  {
    nome: 'Diego Andrade',
    area: 'Família',
    oab: 'OAB/RJ 77722',
    bio: 'Atua em planejamento sucessório e blindagem patrimonial com abordagem humanizada e estratégica.',
    resultados: [
      'Estruturação de family office multigeracional',
      'Mediação de acordo societário em grupo familiar'
    ]
  },
  {
    nome: 'Júlia Tomé',
    area: 'Startups',
    oab: 'OAB/SP 88776',
    bio: 'General Counsel fractional para scale-ups e líder em operações de venture capital na América Latina.',
    resultados: [
      'Mais de 60 rodadas assessoradas',
      'Programas de stock options e governança para 40 startups'
    ]
  }
];

const insightsData = [
  {
    title: 'Agronegócio e ESG',
    description:
      'Novas exigências de compliance ambiental e social demandam estruturação jurídica específica para exportar com segurança.'
  },
  {
    title: 'Benefícios fiscais',
    description:
      'Estados intensificam programas de incentivo. Mapeamos oportunidades de crédito tributário em todo território nacional.'
  },
  {
    title: 'Inteligência trabalhista',
    description:
      'Analytics comparam decisões por vara e desembargador, antecipando riscos e calibrando provisionamentos.'
  }
];

const casesData = [
  {
    title: 'Holding agrícola - Cuiabá/MT',
    result: 'Redução de 22% em passivo tributário e blindagem patrimonial da família fundadora.',
    tag: 'Tributário & Família'
  },
  {
    title: 'Indústria de alimentos - Centro-Oeste',
    result: 'Economia anual de R$ 14 mi com revisão contratual e compliance trabalhista.',
    tag: 'Empresarial & Trabalhista'
  },
  {
    title: 'Scale-up de logística',
    result: 'Assessoria completa em rodada Série B com fundos internacionais e estrutura de stock option.',
    tag: 'Startups & M&A'
  }
];

const leadsData = [
  {
    cliente: 'Grupo SolarTech',
    area: 'Empresarial',
    origem: 'Evento',
    status: 'Qualificado',
    responsavel: 'Marina Albuquerque',
    proximoPasso: 'Apresentar proposta de governança corporativa',
    data: '2024-05-02'
  },
  {
    cliente: 'Fazenda Horizonte',
    area: 'Tributário',
    origem: 'Indicação',
    status: 'Em negociação',
    responsavel: 'Ricardo Sena',
    proximoPasso: 'Agendar reunião técnica com CFO',
    data: '2024-05-05'
  },
  {
    cliente: 'InovaPay',
    area: 'Startups',
    origem: 'Site',
    status: 'Novo',
    responsavel: 'Júlia Tomé',
    proximoPasso: 'Enviar questionário de diagnóstico',
    data: '2024-05-08'
  }
];

const chartData = {
  labels: ['Empresarial', 'Tributário', 'Trabalhista', 'Família', 'Startups', 'Contencioso'],
  datasets: [
    {
      label: 'Oportunidades mapeadas',
      data: [18, 26, 12, 9, 21, 15],
      backgroundColor: ['#162447', '#1f4068', '#1b1b2f', '#e43f5a', '#53354a', '#0f3460'],
      borderWidth: 0,
      borderRadius: 8
    }
  ]
};