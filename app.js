// ==========================================
// NOTIFICAÇÕES LOCAIS (Capacitor)
// ==========================================
const scheduleNotification = async () => {
  const LocalNotifications = window.Capacitor?.Plugins?.LocalNotifications;

  if (!LocalNotifications) {
    console.log("Plugin de notificações não está disponível neste ambiente.");
    return;
  }

  try {
    // 1. Verificar e pedir permissão
    let permStatus = await LocalNotifications.checkPermissions();

    if (permStatus.display === 'prompt') {
      permStatus = await LocalNotifications.requestPermissions();
    }

    if (permStatus.display !== 'granted') {
      console.log('Permissão de notificação negada pelo usuário.');
      return;
    }

    // 2. Opcional: Cancelar notificações antigas para não duplicar
    await LocalNotifications.cancel({ notifications: [{ id: 101 }] });

    // 3. Agendar a notificação cotidiana (ex: todo dia às 09:00 AM)
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Memodioma 🧠",
          body: "Você tem palavras pendentes para revisar hoje!",
          id: 101,
          schedule: { 
            every: 'day', 
            on: { hour: 9, minute: 0 } 
          },
          sound: 'default'
        }
      ]
    });
    
    console.log('Notificação diária agendada com sucesso!');
  } catch (error) {
    console.error('Erro ao configurar notificações:', error);
  }
};

// Chame essa função quando o seu app carregar/iniciar
scheduleNotification();

// ==========================================
// SISTEMA DE INTERNACIONALIZAÇÃO (i18n)
// ==========================================
const dict = {
  "pt-BR": {
    "profiles_title": "Perfis",
    "news_title": "Novidades",
    "btn_create_profile": "+ Criar Perfil",
    "profiles_subtitle": "Escolha um perfil para continuar estudando",
    "review_alert_title": "Revisões pendentes",
    "btn_study_now": "Estudar Agora",
    "add_card_title": "Adicionar Palavra ou Expressão",
    "placeholder_expression": "Expressão original",
    "placeholder_translation": "Tradução",
    "btn_add_card": "Adicionar",
    "recent_inserted_title": "Últimas palavras cadastradas:",
    "tap_hint": "Toque para ver a tradução",
    "feedback_title": "Qual foi sua facilidade para lembrar?",
    "btn_forgot": "Esqueci totalmente ❌",
    "btn_hard": "Lembrei com esforço 🧠",
    "btn_easy": "Fácil demais! ⚡",
    "discord_title": "Comunidade",
    "discord_desc": "Entre para o canal de conversação do Memodioma no Server Friends Around The World, focado na conversação em inglês no discord",
    "btn_access_discord": "Acessar Discord",
    "settings_title": "Configurações",
    "settings_lang_label": "Idioma Geral do App",
    "settings_backup_label": "Backup e Migração",
    "settings_backup_desc": "Exporte seus dados para não perder o progresso ou carregue um backup de outro aparelho.",
    "btn_export_data": "📤 Exportar Dados",
    "settings_import_label": "Importar arquivo de backup (.json)",
    "btn_import_data": "📥 Importar Dados",
    "donate_title": "DOE!",
    "donate_desc": "Este projeto é mantido gratuitamente por <strong>David Calazans</strong> no Github e sua contribuição de qualquer valor é um incentivo para melhorias futuras.",
    "donate_pix": "Chave Pix:",
    "find_me": "Me encontre aqui",
    "about_title": "SOBRE",
    "about_desc": "O <strong>Memodioma App</strong> é um aplicativo desenvolvido exclusivamente para transformar a maneira como você treina e domina novos idiomas. Combinando ciência cognitiva e praticidade, nossa metodologia acelera o seu aprendizado prático por meio de três pilares fundamentais:<br><br>🧠<strong>Método SRS (Spaced Repetition System / Repetição Espaçada):</strong> Você não precisa revisar a mesma palavra todo santo dia até cansar. O nosso algoritmo inteligente calcula exatamente o momento em que sua mente está prestes a esquecer uma informação e a traz de volta para revisão. Isso consolida o conteúdo na sua memória de longo prazo com o menor esforço possível.<br><br>🗂️<strong>Flashcards (Cartões de Memória):</strong> Ferramenta clássica e altamente eficaz de estudo ativo. Cada cartão apresenta um desafio na frente (uma pergunta, frase ou imagem) e a resposta no verso. Ao forçar seu cérebro a buscar a resposta antes de virar o cartão, você fortalece as conexões neurais muito mais rápido do que apenas lendo um livro.<br><br>✍🏻<strong>Chunks (Blocos de Linguagem):</strong> Em vez de decorar regras gramaticais complexas ou palavras soltas que não fazem sentido sozinhas, você aprende através de chunks. Eles são combinações naturais de palavras frequentemente usadas por nativos (como \"by the way\", \"como vai?\" ou \"take a look\"). Aprender em blocos faz você falar de forma muito mais fluida, natural e sem travar para traduzir mentalmente.",
    "nav_news": "Novidades",
    "nav_discord": "Discord",
    "nav_settings": "Config",
    "modal_create_title": "Criar Novo Perfil",
    "modal_create_name_label": "Nome do Perfil",
    "modal_create_name_placeholder": "Ex: Lucas - Inglês",
    "modal_create_native_label": "Seu idioma nativo",
    "modal_create_target_label": "Idioma que vai estudar",
    "btn_cancel_create": "Cancelar",
    "btn_confirm_create": "Criar",
    "modal_delete_title": "⚠️ Excluir Perfil?",
    "modal_delete_desc1": "Tem certeza de que deseja excluir o perfil ",
    "modal_delete_desc2": "? Todo o seu progresso de aprendizado e cartões salvos serão deletados permanentemente. <strong>Esta ação não poderá ser desfeita.</strong>",
    "btn_cancel_delete": "Cancelar",
    "btn_confirm_delete": "Excluir Permanentemente",
    
    // Alertas Dinâmicos
    "alert_import_select": "Por favor, selecione um arquivo .json para importar.",
    "alert_import_success": "Dados importados com sucesso!",
    "alert_import_invalid": "Arquivo inválido. Certifique-se de usar o backup do app.",
    "alert_import_error": "Erro ao ler o arquivo. Ele pode estar corrompido.",
    "alert_create_name": "Insira um nome para o perfil!",
    "alert_create_diff": "O idioma nativo deve ser diferente do estudado.",
    "alert_fill_both": "Preencha ambos os campos!",
    "alert_study_done": "🎉 Revisões concluídas neste perfil!",
    "alert_card_added": '"{0}" adicionada ao perfil!',
    "msg_no_profiles": "Nenhum perfil criado. Clique em \'+ Criar Perfil\' para iniciar!",
    "msg_review_count": "Você tem {0} {1} para praticar hoje.",
    "word_single": "palavra pronta",
    "word_plural": "palavras prontas",
    "msg_card_progress": "Cartão {0} de {1}",
    "title_change_profile": "Mudar Perfil",
    "title_delete_profile": "Excluir Perfil",
    "msg_no_cards_recent": "Nenhuma palavra cadastrada ainda.",
    "title_delete_card": "Excluir Palavra"
  },
  "en-US": {
    "profiles_title": "Profiles",
    "news_title": "News",
    "btn_create_profile": "+ Create Profile",
    "profiles_subtitle": "Choose a profile to continue studying",
    "review_alert_title": "Pending reviews",
    "btn_study_now": "Study Now",
    "add_card_title": "Add Word or Expression",
    "placeholder_expression": "Original expression",
    "placeholder_translation": "Translation",
    "btn_add_card": "Add",
    "recent_inserted_title": "Latest registered words:",
    "tap_hint": "Tap to see translation",
    "feedback_title": "How easy was it to remember?",
    "btn_forgot": "Completely forgot ❌",
    "btn_hard": "Remembered with effort 🧠",
    "btn_easy": "Too easy! ⚡",
    "discord_title": "Community",
    "discord_desc": "Join the Memodioma conversation channel on the Friends Around The World Server, focused on English conversation on Discord.",
    "btn_access_discord": "Access Discord",
    "settings_title": "Settings",
    "settings_lang_label": "General App Language",
    "settings_backup_label": "Backup & Migration",
    "settings_backup_desc": "Export your data so you don't lose progress or load a backup from another device.",
    "btn_export_data": "📤 Export Data",
    "settings_import_label": "Import backup file (.json)",
    "btn_import_data": "📥 Import Data",
    "donate_title": "DONATE!",
    "donate_desc": "This project is maintained for free by <strong>David Calazans</strong> on Github and your contribution of any amount is an incentive for future improvements.",
    "donate_pix": "Pix Key:",
    "find_me": "Find me here",
    "about_title": "ABOUT",
    "about_desc": "The <strong>Memodioma App</strong> is an application developed exclusively to transform the way you train and master new languages. Combining cognitive science and practicality, our methodology accelerates your practical learning through three fundamental pillars:<br><br>🧠<strong>SRS Method (Spaced Repetition System):</strong> You don't need to review the same word every single day until you get tired. Our smart algorithm calculates exactly when your mind is about to forget an information and brings it back for review. This consolidates content in your long-term memory with the least effort.<br><br>🗂️<strong>Flashcards:</strong> A classic and highly effective active study tool. Each card presents a challenge on the front and the answer on the back. By forcing your brain to search for the answer before turning the card, you strengthen neural connections much faster than just reading.<br><br>✍🏻<strong>Language Chunks:</strong> Instead of memorizing complex grammar rules or single words that make no sense alone, you learn through chunks. These are natural combinations of words frequently used by natives. Learning in chunks makes you speak much more fluently, naturally, and without freezing to translate mentally.",
    "nav_news": "News",
    "nav_discord": "Discord",
    "nav_settings": "Config",
    "modal_create_title": "Create New Profile",
    "modal_create_name_label": "Profile Name",
    "modal_create_name_placeholder": "Ex: Lucas - English",
    "modal_create_native_label": "Your native language",
    "modal_create_target_label": "Language to study",
    "btn_cancel_create": "Cancel",
    "btn_confirm_create": "Create",
    "modal_delete_title": "⚠️ Delete Profile?",
    "modal_delete_desc1": "Are you sure you want to delete the profile ",
    "modal_delete_desc2": "? All your learning progress and saved cards will be permanently deleted. <strong>This action cannot be undone.</strong>",
    "btn_cancel_delete": "Cancel",
    "btn_confirm_delete": "Delete Permanently",
    
    // Alertas Dinâmicos
    "alert_import_select": "Please select a .json file to import.",
    "alert_import_success": "Data imported successfully!",
    "alert_import_invalid": "Invalid file. Make sure to use the app backup.",
    "alert_import_error": "Error reading file. It may be corrupted.",
    "alert_create_name": "Enter a profile name!",
    "alert_create_diff": "The native language must be different from the target language.",
    "alert_fill_both": "Fill in both fields!",
    "alert_study_done": "🎉 Reviews completed in this profile!",
    "alert_card_added": '"{0}" added to the profile!',
    "msg_no_profiles": "No profile created. Click '+ Create Profile' to start!",
    "msg_review_count": "You have {0} {1} ready to practice today.",
    "word_single": "word",
    "word_plural": "words",
    "msg_card_progress": "Card {0} of {1}",
    "title_change_profile": "Change Profile",
    "title_delete_profile": "Delete Profile",
    "msg_no_cards_recent": "No words registered yet.",
    "title_delete_card": "Delete Word"
  }
};

let currentLang = localStorage.getItem('appLanguage') || 'pt-BR';
let paginaRecentesAtual = 1;
const itensPorPaginaRecentes = 5;

function t(key, param1, param2) {
    let text = dict[currentLang][key] || key;
    if (param1 !== undefined) text = text.replace('{0}', param1);
    if (param2 !== undefined) text = text.replace('{1}', param2);
    return text;
}

function applyAppLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('appLanguage', lang);
    
    const langSelect = document.getElementById('app-language');
    if (langSelect) langSelect.value = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[lang] && dict[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = dict[lang][key];
            } else {
                el.textContent = dict[lang][key];
            }
        }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (dict[lang] && dict[lang][key]) {
            el.innerHTML = dict[lang][key];
        }
    });

    renderizarListaPerfis();
    if(AppState.activeProfileId) {
        atualizarAlertaRevisao();
        atualizarListaRecentes();
    }
}

// ==========================================
// 1. ESTADO GLOBAL MULTI-PERFIL
// ==========================================
const AppState = {
  activeProfileId: null,
  profiles: []
};

let sessaoEstudo = { cartoesAtuais: [], indiceAtual: 0, cartaoVirado: false };
let idPerfilParaExclusao = null;
let historicoTelas = [];

let db = null;

// Inicializa o SQL.js e o Banco de Dados ANTES de iniciar o app
window.onload = async function() {
  await inicializarBancoDados();
  iniciarApp();
};

async function inicializarBancoDados() {
  try {
    const SQL = await initSqlJs({
      locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    });

    // Tenta carregar um banco salvo anteriormente no localStorage
    const savedDb = localStorage.getItem('sqlite_memodioma_db');
    if (savedDb) {
      // CORREÇÃO: Lê a string diretamente, sem adicionar colchetes extras
      const uInt8Array = new Uint8Array(JSON.parse(savedDb));
      db = new SQL.Database(uInt8Array);
    } else {
      db = new SQL.Database();
      criarTabelasSQL();
    }
  } catch (erro) {
    console.error("Erro ao inicializar o SQLite:", erro);
    alert("Erro crítico ao carregar o banco de dados.");
  }
}

function criarTabelasSQL() {
  if (!db) return;
  db.run(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      nativeLanguage TEXT NOT NULL,
      targetLanguage TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      profile_id INTEGER,
      expression TEXT NOT NULL,
      translation TEXT NOT NULL,
      repetitions INTEGER DEFAULT 0,
      easinessFactor REAL DEFAULT 2.5,
      interval INTEGER DEFAULT 0,
      nextReviewDate TEXT,
      FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
    );
  `);
  salvarBancoNoStorage();
}

function salvarBancoNoStorage() {
  if (!db) return;
  const data = db.export();
  const arr = Array.from(data);
  localStorage.setItem('sqlite_memodioma_db', JSON.stringify(arr));
}

function iniciarApp() {
  applyAppLanguage(currentLang);
  
  document.getElementById('app-language').addEventListener('change', (e) => {
      applyAppLanguage(e.target.value);
  });

  irParaTela('screen-splash');

  // Aguarda 3 segundos na splash e vai direto para os perfis carregados do SQLite
  setTimeout(function() {
    irParaTela('screen-profiles');
    renderizarListaPerfis();
  }, 3000);
}

function salvarNoDispositivo() {
  localStorage.setItem('srs_multi_app_data', JSON.stringify(AppState));
}

// ==========================================
// CONTROLE DE TELA & MENU
// ==========================================
function atualizarMenuInferior(idTela) {
  const menu = document.getElementById('bottom-nav');
  const telasSemMenu = ['screen-splash', 'screen-study'];
  
  if (telasSemMenu.includes(idTela)) {
    menu.classList.add('hidden');
  } else {
    menu.classList.remove('hidden');
  }

  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
  
  if (idTela === 'screen-profiles' || idTela === 'screen-home') {
      document.getElementById('nav-profiles').classList.add('active');
  } else if (idTela === 'screen-news') {
      document.getElementById('nav-news').classList.add('active');
  } else if (idTela === 'screen-discord') {
      document.getElementById('nav-discord').classList.add('active');
  } else if (idTela === 'screen-settings') {
      document.getElementById('nav-settings').classList.add('active');
  }
}

function irParaTela(idTela) {
  const telaAtual = document.querySelector('.screen.active');
  if (telaAtual && telaAtual.id !== idTela) {
    historicoTelas.push(telaAtual.id);
  }
  document.querySelectorAll('.screen').forEach(tela => tela.classList.remove('active'));
  const telaAtiva = document.getElementById(idTela);
  if (telaAtiva) telaAtiva.classList.add('active');
  atualizarMenuInferior(idTela);
}

function voltarTela() {
  if (historicoTelas.length > 0) {
    const telaAnterior = historicoTelas.pop();
    document.querySelectorAll('.screen').forEach(tela => tela.classList.remove('active'));
    const telaAtiva = document.getElementById(telaAnterior);
    if (telaAtiva) telaAtiva.classList.add('active');
    
    atualizarMenuInferior(telaAnterior);
    if (telaAnterior === 'screen-home') {
        atualizarAlertaRevisao();
        atualizarListaRecentes();
    }
  }
}

// ==========================================
// EXPORTAÇÃO E IMPORTAÇÃO
// ==========================================

function exportarDados() {
  const dbData = localStorage.getItem('sqlite_memodioma_db');
  if (!dbData) return;
  
  const blob = new Blob([dbData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'memodioma_sqlite_backup.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importarDados() {
  const fileInput = document.getElementById('import-file');
  const file = fileInput.files[0];
  
  if (!file) {
    alert(t('alert_import_select'));
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const conteudo = e.target.result;
      JSON.parse(conteudo);
      
      localStorage.setItem('sqlite_memodioma_db', conteudo);
      alert(t('alert_import_success'));
      location.reload();
    } catch (erro) {
      alert(t('alert_import_error'));
    }
  };
  reader.readAsText(file);
}


// ==========================================
// 2. GERENCIAMENTO DE PERFIS & MODAIS
// ==========================================
function abrirModalCriar() {
  document.getElementById('new-profile-name').value = '';
  document.getElementById('modal-create').classList.remove('hidden');
}

function fecharModais() {
  document.getElementById('modal-create').classList.add('hidden');
  document.getElementById('modal-delete').classList.add('hidden');
  idPerfilParaExclusao = null;
}

function confirmarCriarPerfil() {
  const nome = document.getElementById('new-profile-name').value.trim();
  const nativo = document.getElementById('new-profile-native').value;
  const alvo = document.getElementById('new-profile-target').value;

  if (!nome) {
    alert(t('alert_create_name'));
    return;
  }
  if (nativo === alvo) {
    alert(t('alert_create_diff'));
    return;
  }

  // Inserção via SQL
  db.run(`INSERT INTO profiles (name, nativeLanguage, targetLanguage) VALUES (?, ?, ?)`, [nome, nativo, alvo]);
  salvarBancoNoStorage();
  
  fecharModais();
  renderizarListaPerfis();
}

function renderizarListaPerfis() {
  const container = document.getElementById('profiles-list');
  container.innerHTML = '';

  // Consulta SQL para buscar perfis
  const res = db.exec("SELECT * FROM profiles");
  
  if (res.length === 0 || res[0].values.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); font-size: 14px; text-align: center; grid-column: 1/-1; padding: 24px 0;">${t('msg_no_profiles')}</p>`;
    return;
  }

  const columns = res[0].columns;
  const values = res[0].values;

  values.forEach(row => {
    const p = {
      id: row[columns.indexOf('id')],
      name: row[columns.indexOf('name')],
      nativeLanguage: row[columns.indexOf('nativeLanguage')],
      targetLanguage: row[columns.indexOf('targetLanguage')]
    };

    const card = document.createElement('div');
    card.className = 'profile-card';
    card.onclick = function(e) {
      if(e.target.closest('.btn-delete-profile')) return;
      selecionarPerfil(p.id);
    };

    card.innerHTML = `
      <div class="profile-info">
        <span class="profile-name">${p.name}</span>
        <span class="profile-lang">${p.nativeLanguage.split('-')[0].toUpperCase()} ➔ ${p.targetLanguage.split('-')[0].toUpperCase()}</span>
      </div>
      <button class="btn-delete-profile" onclick="abrirModalExcluir(${p.id}, '${p.name}')" title="${t('title_delete_profile')}">🗑️</button>
    `;
    container.appendChild(card);
  });
}

function selecionarPerfil(id) {
  // Define o ID ativo e salva no storage (para manter a sessão caso recarregue a página)
  AppState.activeProfileId = id;
  salvarNoDispositivo();

  // Busca o perfil diretamente do SQLite usando a função que você já criou
  const perfil = obterPerfilAtivo();

  if (perfil) {
    document.getElementById('home-profile-name').innerText = perfil.name;
    document.getElementById('btn-change-profile').title = t('title_change_profile');
    document.getElementById('home-languages-badge').innerText = `${perfil.nativeLanguage.split('-')[0].toUpperCase()} ➔ ${perfil.targetLanguage.split('-')[0].toUpperCase()}`;
    
    paginaRecentesAtual = 1;
    atualizarAlertaRevisao();
    atualizarListaRecentes();
    
    // Agora sim, vai para a tela inicial do perfil
    irParaTela('screen-home');
  }
}

function abrirModalExcluir(id, nome) {
  idPerfilParaExclusao = id;
  document.getElementById('delete-profile-target-name').innerText = nome;
  document.getElementById('modal-delete').classList.remove('hidden');
}

function confirmarExclusaoPerfil() {
  if (idPerfilParaExclusao) {
    // Executa a exclusão diretamente no banco de dados SQLite
    db.run("DELETE FROM profiles WHERE id = ?", [idPerfilParaExclusao]);
    
    // Atualiza o storage com o banco modificado
    salvarBancoNoStorage();

    // Se o perfil excluído era o que estava ativo, limpa o ID ativo
    if (AppState.activeProfileId === idPerfilParaExclusao) {
      AppState.activeProfileId = null;
    }

    fecharModais();
    renderizarListaPerfis();
  }
}

function obterPerfilAtivo() {
  if (!AppState.activeProfileId) return null;
  
  const stmt = db.prepare("SELECT * FROM profiles WHERE id = ?");
  stmt.bind([AppState.activeProfileId]);
  
  if (!stmt.step()) {
    stmt.free();
    return null;
  }
  
  const row = stmt.getAsObject();
  stmt.free();

  // Busca os cartões relacionados a este perfil
  const cardsStmt = db.prepare("SELECT * FROM cards WHERE profile_id = ? ORDER BY id DESC");
  cardsStmt.bind([AppState.activeProfileId]);
  
  const cards = [];
  while (cardsStmt.step()) {
    cards.push(cardsStmt.getAsObject());
  }
  cardsStmt.free();

  return {
    id: row.id,
    name: row.name,
    nativeLanguage: row.nativeLanguage,
    targetLanguage: row.targetLanguage,
    cards: cards
  };
}

// ==========================================
// 3. HOME, CADASTRO & HISTÓRICO RECENTE
// ==========================================
function atualizarAlertaRevisao() {
  const palavrasDoDia = obterPalavrasDoDia();
  const alertBox = document.getElementById('review-alert-box');
  const alertText = document.getElementById('review-count-text');

  if (palavrasDoDia.length > 0) {
    alertBox.classList.remove('hidden');
    const labelWord = palavrasDoDia.length === 1 ? t('word_single') : t('word_plural');
    alertText.innerText = t('msg_review_count', palavrasDoDia.length, labelWord);
  } else {
    alertBox.classList.add('hidden');
  }
}

function atualizarListaRecentes() {
  const perfil = obterPerfilAtivo();
  const listaContainer = document.getElementById('recent-cards-list');
  const paginacaoContainer = document.getElementById('recent-cards-pagination');
  const indicadorPagina = document.getElementById('recent-page-indicator');
  
  listaContainer.innerHTML = '';

  if (!perfil || perfil.cards.length === 0) {
    listaContainer.innerHTML = `<span style="font-size: 12px; color: #9ca3af; font-style: italic;">${t('msg_no_cards_recent')}</span>`;
    paginacaoContainer.classList.add('hidden');
    return;
  }

  // Ordena do mais recente para o mais antigo
  const cardsOrdenados = [...perfil.cards].sort((a, b) => b.id - a.id);
  
  const totalPaginas = Math.ceil(cardsOrdenados.length / itensPorPaginaRecentes);
  if (paginaRecentesAtual > totalPaginas) paginaRecentesAtual = totalPaginas;
  if (paginaRecentesAtual < 1) paginaRecentesAtual = 1;

  const inicio = (paginaRecentesAtual - 1) * itensPorPaginaRecentes;
  const fim = inicio + itensPorPaginaRecentes;
  const itensPagina = cardsOrdenados.slice(inicio, fim);

  itensPagina.forEach(c => {
    const item = document.createElement('div');
    item.className = 'recent-card-item';
    // Exibe apenas a expressão original e o botão de lixeira (sem mostrar a tradução)
    item.innerHTML = `
      <span><strong>${c.expression}</strong></span>
      <button class="btn-delete-recent" onclick="excluirCartaoRecente(${c.id})" title="${t('title_delete_card')}">🗑️</button>
    `;
    listaContainer.appendChild(item);
  });

  if (cardsOrdenados.length > itensPorPaginaRecentes) {
    paginacaoContainer.classList.remove('hidden');
    indicadorPagina.innerText = `${paginaRecentesAtual} / ${totalPaginas}`;
  } else {
    paginacaoContainer.classList.add('hidden');
  }
}


function excluirCartaoRecente(idCartao) {
  const perfil = obterPerfilAtivo();
  if (!perfil) return;

  db.run("DELETE FROM cards WHERE id = ?", [idCartao]);
  salvarBancoNoStorage();

  atualizarListaRecentes();
  atualizarAlertaRevisao();
}

function mudarPaginaRecentes(direcao) {
  paginaRecentesAtual += direcao;
  atualizarListaRecentes();
}

function lidarComCadastro() {
  const perfil = obterPerfilAtivo();
  if (!perfil) return;

  const inputExp = document.getElementById('input-expression');
  const inputTrad = document.getElementById('input-translation');
  const exp = inputExp.value.trim();
  const trad = inputTrad.value.trim();

  if (!exp || !trad) {
    alert(t('alert_fill_both'));
    return;
  }

  const dataHoje = new Date().toISOString();

  // Inserção do cartão vinculada ao ID do perfil ativo
  db.run(`
    INSERT INTO cards (profile_id, expression, translation, repetitions, easinessFactor, interval, nextReviewDate)
    VALUES (?, ?, ?, 0, 2.5, 0, ?)
  `, [perfil.id, exp, trad, dataHoje]);
  
  salvarBancoNoStorage();

  inputExp.value = '';
  inputTrad.value = '';
  
  paginaRecentesAtual = 1;
  atualizarListaRecentes();
  atualizarAlertaRevisao();
}

function obterPalavrasDoDia() {
  const perfil = obterPerfilAtivo();
  if (!perfil) return [];
  const hoje = new Date();
  hoje.setHours(23, 59, 59, 999);
  return perfil.cards.filter(c => new Date(c.nextReviewDate) <= hoje);
}

function iniciarSessaoEstudo() {
  const filtrados = obterPalavrasDoDia();
  if (filtrados.length === 0) return;

  sessaoEstudo.cartoesAtuais = filtrados;
  sessaoEstudo.indiceAtual = 0;
  irParaTela('screen-study');
  renderizarCartaoAtual();
}

function renderizarCartaoAtual() {
  sessaoEstudo.cartaoVirado = false;
  document.getElementById('flashcard').classList.remove('flipped');
  document.getElementById('feedback-actions').classList.add('hidden');

  const cartao = sessaoEstudo.cartoesAtuais[sessaoEstudo.indiceAtual];
  document.getElementById('study-progress').innerText = t('msg_card_progress', sessaoEstudo.indiceAtual + 1, sessaoEstudo.cartoesAtuais.length);
  document.getElementById('card-front-text').innerText = cartao.expression;
  document.getElementById('card-back-text').innerText = cartao.translation;
}

function virarCartao() {
  if (sessaoEstudo.cartaoVirado) return;
  sessaoEstudo.cartaoVirado = true;
  document.getElementById('flashcard').classList.add('flipped');
  document.getElementById('feedback-actions').classList.remove('hidden');
}

function avaliarCartao(notaUsuario) {
  const perfil = obterPerfilAtivo();
  const cartaoSessao = sessaoEstudo.cartoesAtuais[sessaoEstudo.indiceAtual];
  
  const idx = perfil.cards.findIndex(c => c.id === cartaoSessao.id);
  if (idx !== -1) {
    const cartaoAtualizado = calcularAlgoritmoSM2(perfil.cards[idx], notaUsuario);
    
    db.run(`
      UPDATE cards 
      SET repetitions = ?, easinessFactor = ?, interval = ?, nextReviewDate = ?
      WHERE id = ?
    `, [
      cartaoAtualizado.repetitions, 
      cartaoAtualizado.easinessFactor, 
      cartaoAtualizado.interval, 
      cartaoAtualizado.nextReviewDate, 
      cartaoSessao.id
    ]);
    
    salvarBancoNoStorage();
  }

  sessaoEstudo.indiceAtual++;
  if (sessaoEstudo.indiceAtual < sessaoEstudo.cartoesAtuais.length) {
    renderizarCartaoAtual();
  } else {
    alert(t('alert_study_done'));
    atualizarAlertaRevisao();
    irParaTela('screen-home');
  }
}

function calcularAlgoritmoSM2(cartao, nota) {
  let reps = cartao.repetitions;
  let ef = cartao.easinessFactor;
  let inter = cartao.interval;

  if (nota >= 3) {
    if (reps === 0) inter = 1;
    else if (reps === 1) inter = 6;
    else inter = Math.round(inter * ef);
    reps += 1;
  } else {
    reps = 0;
    inter = 1;
  }

  ef = ef + (0.1 - (5 - nota) * (0.08 + (5 - nota) * 0.02));
  if (ef < 1.3) ef = 1.3;

  const prox = new Date();
  prox.setDate(prox.getDate() + inter);
  prox.setHours(0, 0, 0, 0);

  return { 
    ...cartao, 
    repetitions: reps, 
    easinessFactor: Number(ef.toFixed(2)), 
    interval: inter, 
    nextReviewDate: prox.toISOString() // CORREÇÃO: Salva como string padrão ISO para o SQLite
  };
}
