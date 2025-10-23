const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const areasList = $('#areasList');
const lawyersGrid = $('#lawyersGrid');
const insightsList = $('#insightsList');
const casesGrid = $('#casesGrid');
const leadsTable = $('#leadsTable');
const leadStats = $('#leadStats');
const statusFilter = $('#statusFilter');
const areaFilter = $('#areaFilter');
const leadModal = $('#leadModal');
const lawyerModal = $('#lawyerModal');
const currentYear = $('#currentYear');
const integrationForm = $('#integrationForm');
const integrationStatus = $('#integrationStatus');
const syncLeadsButton = $('#syncLeadsButton');
const exportLeadsButton = $('#exportLeadsButton');
const leadResponsibleSelect = $('#leadForm select[name="responsavel"]');

const STORAGE_KEYS = {
  leads: 'cjmt::leads',
  lawyers: 'cjmt::lawyers',
  integration: 'cjmt::integration'
};

const LEAD_STATUSES = ['Novo', 'Qualificado', 'Em negociação', 'Convertido'];

const storage = {
  get(key, fallback) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch (error) {
      console.warn('Não foi possível acessar o storage:', error);
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Não foi possível salvar no storage:', error);
    }
  }
};

const generateId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now()}`;

const formatDateTime = (value) => {
  if (!value) return '';
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(new Date(value));
  } catch (error) {
    return value;
  }
};

const sortByRecent = (collection) =>
  collection
    .slice()
    .sort(
      (a, b) => new Date(b.ultimaAtualizacao || b.data).getTime() - new Date(a.ultimaAtualizacao || a.data).getTime()
    );

const normalizeLawyer = (lawyer) => ({
  ...lawyer,
  id: lawyer.id || generateId('lawyer')
});

const normalizeActivities = (lead) => {
  const historico = Array.isArray(lead.historico) ? lead.historico : [];
  if (!historico.length) {
    historico.push({
      id: generateId('activity'),
      data: lead.data,
      nota: 'Lead importado para o pipeline'
    });
  }
  return historico.map((item) => ({
    id: item.id || generateId('activity'),
    data: item.data || lead.data,
    nota: item.nota || item.note || '',
    status: item.status || lead.status
  }));
};

const normalizeLead = (lead) => ({
  ...lead,
  id: lead.id || generateId('lead'),
  data: lead.data || new Date().toISOString().split('T')[0],
  status: lead.status || LEAD_STATUSES[0],
  responsavel: lead.responsavel || 'Definir responsável',
  proximoPasso: lead.proximoPasso || 'Registrar follow-up',
  ultimaAtualizacao: lead.ultimaAtualizacao || lead.data || new Date().toISOString()
});

const loadCollection = (key, fallback, normalizer) => {
  const stored = storage.get(key);
  const base = Array.isArray(stored) ? stored : fallback;
  return base.map((item) => normalizer({ ...item }));
};

let lawyers = loadCollection(STORAGE_KEYS.lawyers, lawyersData, normalizeLawyer);
let leads = loadCollection(STORAGE_KEYS.leads, leadsData, (lead) => {
  const normalized = normalizeLead(lead);
  normalized.historico = normalizeActivities(normalized);
  return normalized;
});

let integrationConfig = storage.get(STORAGE_KEYS.integration, {
  endpoint: '',
  apiKey: '',
  lastSync: null
});

let activeLawyerFilter = 'all';
let integrationStatusTimeout;

const persistLeads = () => storage.set(STORAGE_KEYS.leads, leads);
const persistLawyers = () => storage.set(STORAGE_KEYS.lawyers, lawyers);
const persistIntegration = () => storage.set(STORAGE_KEYS.integration, integrationConfig);

const modals = {
  lead: {
    element: leadModal,
    trigger: $('#openLeadModal')
  },
  lawyer: {
    element: lawyerModal,
    trigger: $('#openLawyerModal')
  }
};

const modalToggle = (modal, open = true) => {
  if (!modal) return;
  modal.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('modal-open', open);
};

Object.values(modals).forEach(({ element, trigger }) => {
  if (!element || !trigger) return;
  trigger.addEventListener('click', () => modalToggle(element, true));
  element.addEventListener('click', ({ target }) => {
    if (target.dataset.close !== undefined || target === element) {
      modalToggle(element, false);
    }
  });
});

const renderAreas = () => {
  if (!areasList) return;
  areasList.innerHTML = areasData
    .map(
      ({ title, description, bullet }) => `
        <article class="area-card">
          <h3>${title}</h3>
          <p>${description}</p>
          <span>${bullet}</span>
        </article>
      `
    )
    .join('');
};

const renderLawyers = (filter = 'all') => {
  if (!lawyersGrid) return;
  const filtered =
    filter === 'all'
      ? lawyers
      : lawyers.filter(({ area }) => area?.toLowerCase().includes(filter.toLowerCase()));

  lawyersGrid.innerHTML = filtered
    .map(
      ({ nome, area, oab, bio, resultados }) => `
        <article class="lawyer-card">
          <header>
            <h3>${nome}</h3>
            <span>${area}</span>
          </header>
          <p>${bio}</p>
          <small>${oab}</small>
          <ul>
            ${resultados.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </article>
      `
    )
    .join('');
};

const renderInsights = () => {
  if (!insightsList) return;
  insightsList.innerHTML = insightsData
    .map(
      ({ title, description }) => `
        <li>
          <h4>${title}</h4>
          <p>${description}</p>
        </li>
      `
    )
    .join('');
};

const renderCases = () => {
  if (!casesGrid) return;
  casesGrid.innerHTML = casesData
    .map(
      ({ title, result, tag }) => `
        <article class="case-card">
          <span>${tag}</span>
          <h3>${title}</h3>
          <p>${result}</p>
        </article>
      `
    )
    .join('');
};

const getLeadStats = (data) => {
  const total = data.length;
  const converted = data.filter(({ status }) => status === 'Convertido').length;
  const conversionRate = total ? Math.round((converted / total) * 100) : 0;
  const byStatus = data.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  return {
    total,
    converted,
    conversionRate,
    byStatus
  };
};

const renderLeadStats = (data) => {
  if (!leadStats) return;
  const { total, converted, conversionRate, byStatus } = getLeadStats(data);
  const statsTemplate = (title, value, subtitle) => `
    <div class="stat-card">
      <strong>${value}</strong>
      <span>${title}</span>
      <small>${subtitle}</small>
    </div>
  `;

  const maiorVolume = Object.entries(byStatus)
    .sort(([, a], [, b]) => b - a)[0]?.[0];

  leadStats.innerHTML = [
    statsTemplate('Leads ativos', total, 'No pipeline'),
    statsTemplate('Convertidos', converted, 'Clientes em andamento'),
    statsTemplate('Taxa de conversão', `${conversionRate}%`, 'Últimos 30 dias'),
    statsTemplate('Maior volume', maiorVolume || '—', 'Status com mais leads')
  ].join('');
};

const getResponsibleOptions = (selected = '', { includePlaceholder = false } = {}) => {
  const unique = Array.from(new Set(lawyers.map(({ nome }) => nome))).filter(Boolean);
  if (!unique.length) {
    unique.push('Cadastrar especialista');
  }
  if (selected && !unique.includes(selected)) {
    unique.unshift(selected);
  }

  const options = [];
  if (includePlaceholder) {
    options.push(
      `<option value="" ${selected ? '' : 'selected'} disabled hidden>Selecione um responsável</option>`
    );
  }

  unique.forEach((nome) => {
    options.push(`<option value="${nome}" ${nome === selected ? 'selected' : ''}>${nome}</option>`);
  });

  return options.join('');
};

const populateLawyerSelect = () => {
  if (!leadResponsibleSelect) return;
  const currentValue = leadResponsibleSelect.value;
  leadResponsibleSelect.innerHTML = getResponsibleOptions(currentValue, {
    includePlaceholder: true
  });

  if (currentValue && leadResponsibleSelect.querySelector(`[value="${currentValue}"]`)) {
    leadResponsibleSelect.value = currentValue;
  }
};

const populateAreaFilter = () => {
  if (!areaFilter) return;
  const currentValue = areaFilter.value;
  const areas = Array.from(new Set(areasData.map(({ title }) => title)));
  areaFilter.innerHTML = [
    '<option value="all">Todas as áreas</option>',
    ...areas.map((area) => `<option value="${area}">${area}</option>`)
  ].join('');

  if (currentValue && areaFilter.querySelector(`[value="${currentValue}"]`)) {
    areaFilter.value = currentValue;
  }

  const leadAreaSelect = $('#leadForm select[name="area"]');
  if (leadAreaSelect) {
    leadAreaSelect.innerHTML = [
      '<option value="" disabled selected hidden>Selecione uma área</option>',
      ...areas.map((area) => `<option value="${area}">${area}</option>`)
    ].join('');
  }
};

const filterLeads = () => {
  const statusValue = statusFilter?.value || 'all';
  const areaValue = areaFilter?.value || 'all';

  return sortByRecent(leads).filter((lead) => {
    const statusMatch = statusValue === 'all' || lead.status === statusValue;
    const areaMatch = areaValue === 'all' || lead.area === areaValue;
    return statusMatch && areaMatch;
  });
};

const renderLeadsTable = (data) => {
  if (!leadsTable) return;
  if (!data.length) {
    leadsTable.innerHTML = '<tr><td colspan="7" class="table__empty">Nenhum lead encontrado com os filtros selecionados.</td></tr>';
    return;
  }

  leadsTable.innerHTML = data
    .map(({ id, cliente, area, origem, status, responsavel, proximoPasso, historico }) => {
      const ultimoFollowUp = historico?.[historico.length - 1];
      return `
        <tr data-id="${id}">
          <td>${cliente}</td>
          <td>${area}</td>
          <td>${origem}</td>
          <td><span class="badge badge--${status.toLowerCase().replace(/\s+/g, '-')}">${status}</span></td>
          <td>
            <div class="table__actions">
              <select data-action="update-owner" data-id="${id}">
                ${getResponsibleOptions(responsavel)}
              </select>
            </div>
          </td>
          <td>
            <div class="lead-next-step">
              <span>${proximoPasso}</span>
              ${ultimoFollowUp ? `<small>Último follow-up em ${formatDateTime(ultimoFollowUp.data)}</small>` : ''}
            </div>
          </td>
          <td>
            <div class="table__actions">
              <select data-action="update-status" data-id="${id}">
                ${LEAD_STATUSES.map(
                  (option) => `<option value="${option}" ${option === status ? 'selected' : ''}>${option}</option>`
                ).join('')}
              </select>
              <button type="button" class="btn btn--ghost" data-action="log-activity" data-id="${id}">Registrar follow-up</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
};

const updateLeadsSection = () => {
  const filteredLeads = filterLeads();
  renderLeadsTable(filteredLeads);
  renderLeadStats(filteredLeads);
};

const showIntegrationMessage = (message, type = 'info', persist = false) => {
  if (!integrationStatus) return;
  integrationStatus.textContent = message;
  integrationStatus.classList.remove('is-error', 'is-success');

  if (type === 'error') integrationStatus.classList.add('is-error');
  if (type === 'success') integrationStatus.classList.add('is-success');

  if (!persist) {
    clearTimeout(integrationStatusTimeout);
    integrationStatusTimeout = setTimeout(() => {
      integrationStatus.textContent = '';
      integrationStatus.classList.remove('is-error', 'is-success');
    }, 5000);
  }
};

statusFilter?.addEventListener('change', updateLeadsSection);
areaFilter?.addEventListener('change', updateLeadsSection);

const filters = $$('.filters .btn');
filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    filters.forEach((button) => button.classList.remove('is-active'));
    btn.classList.add('is-active');
    activeLawyerFilter = btn.dataset.filter || 'all';
    renderLawyers(activeLawyerFilter);
  });
});

$('#lawyerForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const newLawyer = normalizeLawyer({
    nome: formData.get('nome'),
    area: formData.get('area'),
    oab: formData.get('oab'),
    bio: formData.get('bio'),
    resultados: formData
      .get('resultados')
      .split(';')
      .map((item) => item.trim())
      .filter(Boolean)
  });

  lawyers = [newLawyer, ...lawyers];
  persistLawyers();
  renderLawyers(activeLawyerFilter);
  populateLawyerSelect();
  modalToggle(lawyerModal, false);
  form.reset();
});

$('#leadForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const now = new Date().toISOString();
  const newLead = {
    id: generateId('lead'),
    cliente: formData.get('cliente'),
    area: formData.get('area'),
    origem: formData.get('origem'),
    status: formData.get('status'),
    responsavel: formData.get('responsavel'),
    proximoPasso: formData.get('proximoPasso'),
    data: now.split('T')[0],
    ultimaAtualizacao: now,
    historico: [
      {
        id: generateId('activity'),
        data: now,
        nota: `Lead registrado via ${formData.get('origem')}`,
        status: formData.get('status')
      }
    ]
  };

  leads = [newLead, ...leads];
  persistLeads();
  updateLeadsSection();
  modalToggle(leadModal, false);
  form.reset();
  populateLawyerSelect();
});

const updateLead = (id, changes) => {
  leads = leads.map((lead) => (lead.id === id ? { ...lead, ...changes } : lead));
  persistLeads();
  updateLeadsSection();
};

const registerFollowUp = (id) => {
  const lead = leads.find((item) => item.id === id);
  if (!lead) return;

  const followUpNote = window.prompt(`Descreva o follow-up registrado para ${lead.cliente}:`);
  if (!followUpNote) return;

  const nextStep = window.prompt('Qual é o novo próximo passo?', lead.proximoPasso || '');
  const now = new Date().toISOString();
  const historico = [
    ...lead.historico,
    {
      id: generateId('activity'),
      data: now,
      nota: followUpNote,
      status: lead.status
    }
  ];

  updateLead(id, {
    proximoPasso: nextStep?.trim() ? nextStep.trim() : lead.proximoPasso,
    historico,
    ultimaAtualizacao: now
  });
};

leadsTable?.addEventListener('change', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLSelectElement)) return;

  const leadId = target.dataset.id;
  if (!leadId) return;

  if (target.dataset.action === 'update-status') {
    updateLead(leadId, {
      status: target.value,
      ultimaAtualizacao: new Date().toISOString()
    });
  }

  if (target.dataset.action === 'update-owner') {
    updateLead(leadId, {
      responsavel: target.value,
      ultimaAtualizacao: new Date().toISOString()
    });
  }
});

leadsTable?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action="log-activity"]');
  if (!button) return;
  const leadId = button.dataset.id;
  if (!leadId) return;
  registerFollowUp(leadId);
});

$('#healthCheckForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  alert(
    `Obrigado! Recebemos seu pedido para o segmento ${formData.get('segmento')} com foco em ${formData.get(
      'desafio'
    )}. Um estrategista entrará em contato.`
  );
  form.reset();
});

$('#contactForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  alert(
    `Obrigado ${formData.get('nome')}! Nossa equipe retornará para ${formData.get(
      'email'
    )} nas próximas horas.`
  );
  form.reset();
});

integrationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  integrationConfig = {
    ...integrationConfig,
    endpoint: formData.get('endpoint'),
    apiKey: formData.get('apiKey')
  };
  persistIntegration();
  showIntegrationMessage('Conexão salva com sucesso!', 'success');
});

const buildLeadsPayload = () => ({
  exportedAt: new Date().toISOString(),
  resumo: getLeadStats(leads),
  leads: leads.map(({ historico, ...lead }) => ({
    ...lead,
    historico
  }))
});

syncLeadsButton?.addEventListener('click', async () => {
  if (!integrationConfig.endpoint) {
    showIntegrationMessage('Configure um endpoint antes de sincronizar.', 'error', true);
    return;
  }

  showIntegrationMessage('Sincronizando leads com o CRM...', 'info', true);

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (integrationConfig.apiKey) {
      headers.Authorization = integrationConfig.apiKey.startsWith('Bearer ')
        ? integrationConfig.apiKey
        : `Bearer ${integrationConfig.apiKey}`;
    }

    const response = await fetch(integrationConfig.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(buildLeadsPayload())
    });

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    integrationConfig = {
      ...integrationConfig,
      lastSync: new Date().toISOString()
    };
    persistIntegration();
    showIntegrationMessage('Leads sincronizados com sucesso!', 'success');
  } catch (error) {
    showIntegrationMessage(`Falha ao sincronizar: ${error.message}`, 'error', true);
  }
});

const escapeCSV = (value) => {
  if (value == null) return '';
  const safeValue = String(value).replace(/"/g, '""');
  return `"${safeValue}"`;
};

exportLeadsButton?.addEventListener('click', () => {
  if (!leads.length) {
    showIntegrationMessage('Não há leads para exportar.', 'error');
    return;
  }

  const headers = ['Cliente', 'Área', 'Origem', 'Status', 'Responsável', 'Próximo passo', 'Última atualização'];
  const rows = leads.map((lead) =>
    [
      lead.cliente,
      lead.area,
      lead.origem,
      lead.status,
      lead.responsavel,
      lead.proximoPasso,
      formatDateTime(lead.ultimaAtualizacao)
    ].map(escapeCSV).join(';')
  );

  const csvContent = [headers.map(escapeCSV).join(';'), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `leads-consultoria-${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showIntegrationMessage('Arquivo CSV exportado com sucesso.', 'success');
});

if (integrationForm) {
  integrationForm.querySelector('[name="endpoint"]').value = integrationConfig.endpoint || '';
  integrationForm.querySelector('[name="apiKey"]').value = integrationConfig.apiKey || '';

  if (integrationConfig.lastSync) {
    showIntegrationMessage(
      `Última sincronização em ${formatDateTime(integrationConfig.lastSync)}.`,
      'success',
      true
    );
  }
}

const ctx = document.getElementById('intelligenceChart');
if (ctx) {
  new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(22, 36, 71, 0.1)' }, beginAtZero: true }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

renderAreas();
renderLawyers();
populateLawyerSelect();
renderInsights();
renderCases();
populateAreaFilter();
updateLeadsSection();