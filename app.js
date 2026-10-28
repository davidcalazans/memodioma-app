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
    "nav_settings": "Settings",
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
  },
    "es": {
    "profiles_title": "Perfiles",
    "news_title": "Novedades",
    "btn_create_profile": "+ Crear Perfil",
    "profiles_subtitle": "Elige un perfil para continuar estudiando",
    "review_alert_title": "Revisiones pendientes",
    "btn_study_now": "Estudiar Ahora",
    "add_card_title": "Añadir Palabra o Expresión",
    "placeholder_expression": "Expresión original",
    "placeholder_translation": "Traducción",
    "btn_add_card": "Añadir",
    "recent_inserted_title": "Últimas palabras registradas:",
    "tap_hint": "Toca para ver la traducción",
    "feedback_title": "¿Qué tan fácil te resultó recordar?",
    "btn_forgot": "Lo olvidé por completo ❌",
    "btn_hard": "Lo recordé con esfuerzo 🧠",
    "btn_easy": "¡Demasiado fácil! ⚡",
    "discord_title": "Comunidad",
    "discord_desc": "Únete al canal de conversación de Memodioma no Server Friends Around The World, enfocado en la conversación en inglés en Discord",
    "btn_access_discord": "Acceder a Discord",
    "settings_title": "Configuración",
    "settings_lang_label": "Idioma General de la App",
    "settings_backup_label": "Copia de Seguridad y Migración",
    "settings_backup_desc": "Exporta tus datos para no perder el progreso o carga una copia de seguridad de otro dispositivo.",
    "btn_export_data": "📤 Exportar Datos",
    "settings_import_label": "Importar archivo de copia de seguridad (.json)",
    "btn_import_data": "📥 Importar Datos",
    "donate_title": "¡DONA!",
    "donate_desc": "Este proyecto es mantenido de forma gratuita por <strong>David Calazans</strong> en GitHub y tu contribución de cualquier valor es un incentivo para futuras mejoras.",
    "donate_pix": "Clave Pix:",
    "find_me": "Encuéntrame aquí",
    "about_title": "SOBRE",
    "about_desc": "<strong>Memodioma App</strong> es una aplicación desarrollada exclusivamente para transformar la forma en que entrenas y dominas nuevos idiomas. Combinando ciencia cognitiva y practicidad, nuestra metodología acelera tu aprendizaje práctico a través de tres pilares fundamentales:<br><br>🧠<strong>Método SRS (Spaced Repetition System / Repetición Espaciada):</strong> No necesitas revisar la misma palabra todos los santos días hasta cansarte. Nuestro algoritmo inteligente calcula exactamente el momento en que tu mente está a punto de olvidar una información y la trae de vuelta para su revisión. Esto consolida el contenido en tu memoria a largo plazo con el menor esfuerzo posible.<br><br>🗂️<strong>Flashcards (Tarjetas de Memoria):</strong> Herramienta clásica y altamente eficaz de estudio activo. Cada tarjeta presenta un desafío en el frente (una pregunta, frase o imagen) y la respuesta en el reverso. Al forzar a tu cerebro a buscar la respuesta antes de voltear la tarjeta, fortaleces las conexiones neurales mucho más rápido que solo leyendo un libro.<br><br>✍🏻<strong>Chunks (Bloques de Lenguaje):</strong> En lugar de memorizar complejas reglas gramaticales o palabras sueltas que no tienen sentido por sí solas, aprendes a través de chunks. Son combinaciones naturales de palabras utilizadas frecuentemente por nativos (como \"by the way\", \"¿cómo te va?\" o \"take a look\"). Aprender en bloques te hace hablar de forma mucho más fluida, natural y sin trabarte para traducir mentalmente.",
    "nav_news": "Novedades",
    "nav_discord": "Discord",
    "nav_settings": "Ajustes",
    "modal_create_title": "Crear Nuevo Perfil",
    "modal_create_name_label": "Nombre del Perfil",
    "modal_create_name_placeholder": "Ej: Lucas - Inglés",
    "modal_create_native_label": "Tu idioma nativo",
    "modal_create_target_label": "Idioma que vas a estudiar",
    "btn_cancel_create": "Cancelar",
    "btn_confirm_create": "Crear",
    "modal_delete_title": "⚠️ ¿Eliminar Perfil?",
    "modal_delete_desc1": "¿Estás seguro de que deseas eliminar el perfil ",
    "modal_delete_desc2": "? Todo tu progreso de aprendizaje y tarjetas guardadas se borrarán permanentemente. <strong>Esta acción no se podrá deshacer.</strong>",
    "btn_cancel_delete": "Cancelar",
    "btn_confirm_delete": "Eliminar Permanentemente",
    
    // Alertas Dinâmicos
    "alert_import_select": "Por favor, selecciona un archivo .json para importar.",
    "alert_import_success": "¡Datos importados con éxito!",
    "alert_import_invalid": "Archivo inválido. Asegúrate de usar la copia de seguridad de la app.",
    "alert_import_error": "Error al leer el archivo. Puede que esté dañado.",
    "alert_create_name": "¡Introduce un nombre para el perfil!",
    "alert_create_diff": "El idioma nativo debe ser diferente al estudiado.",
    "alert_fill_both": "¡Completa ambos campos!",
    "alert_study_done": "🎉 ¡Revisiones completadas en este perfil!",
    "alert_card_added": "¡\"{0}\" añadida al perfil!",
    "msg_no_profiles": "Ningún perfil creado. ¡Haz clic en '+ Crear Perfil' para comenzar!",
    "msg_review_count": "Tienes {0} {1} para practicar hoy.",
    "word_single": "palabra lista",
    "word_plural": "palabras listas",
    "msg_card_progress": "Tarjeta {0} de {1}",
    "title_change_profile": "Cambiar Perfil",
    "title_delete_profile": "Eliminar Perfil",
    "msg_no_cards_recent": "Ninguna palabra registrada todavía.",
    "title_delete_card": "Eliminar Palabra"
  },
    "zh-CN": {
    "profiles_title": "个人资料",
    "news_title": "最新动态",
    "btn_create_profile": "+ 创建档案",
    "profiles_subtitle": "选择一个档案以继续学习",
    "review_alert_title": "待复习内容",
    "btn_study_now": "立即学习",
    "add_card_title": "添加单词或短语",
    "placeholder_expression": "原始内容",
    "placeholder_translation": "翻译",
    "btn_add_card": "添加",
    "recent_inserted_title": "最新添加的单词：",
    "tap_hint": "点击查看翻译",
    "feedback_title": "回忆起来有多容易？",
    "btn_forgot": "完全忘记了 ❌",
    "btn_hard": "费劲才想起来 🧠",
    "btn_easy": "太简单了！ ⚡",
    "discord_title": "社区",
    "discord_desc": "加入 Server Friends Around The World 中的 Memodioma 交流频道，专注于 Discord 上的英语口语交流",
    "btn_access_discord": "访问 Discord",
    "settings_title": "设置",
    "settings_lang_label": "应用全局语言",
    "settings_backup_label": "备份与迁移",
    "settings_backup_desc": "导出您的数据以防丢失进度，或从其他设备加载备份。",
    "btn_export_data": "📤 导出数据",
    "settings_import_label": "导入备份文件 (.json)",
    "btn_import_data": "📥 导入数据",
    "donate_title": "捐赠！",
    "donate_desc": "该项目由 <strong>David Calazans</strong> 在 GitHub 上免费维护，您的任何金额的捐赠都是对未来改进的鼓励。",
    "donate_pix": "Pix 密钥：",
    "find_me": "在这里找到我",
    "about_title": "关于",
    "about_desc": "<strong>Memodioma App</strong> 是一款专为改变您训练和掌握新语言的方式而开发的应用。结合认知科学与实用性，我们的教学法通过三大核心支柱加速您的实战学习：<br><br>🧠<strong>SRS 间隔重复系统 (Spaced Repetition System)：</strong> 您不需要每天枯燥地重复复习同一个单词。我们的智能算法会精准计算出您的大脑即将遗忘某个信息的临界点，并将其带回供您复习。这能以最少的精力将内容巩固到您的长期记忆中。<br><br>🗂️<strong>Flashcards 记忆卡片：</strong> 主动学习中经典且极其高效的的工具。每张卡片的正面显示挑战（一个问题、句子或图片），背面显示答案。通过强制您的大脑在翻转卡片前去搜寻答案，这比单纯看书能更快地强化神经连接。<br><br>✍🏻<strong>Chunks 语块学习：</strong> 与其去死记硬背复杂的语法规则或孤立且毫无意义的单词，不如通过语块来学习。它们是母语者经常使用的自然单词组合（比如 \"by the way\"、\"como vai?\" 或 \"take a look\"）。按语块学习能让您的表达更加流利、自然，而不会卡在脑内翻译的环节。",
    "nav_news": "动态",
    "nav_discord": "Discord",
    "nav_settings": "设置",
    "modal_create_title": "创建新档案",
    "modal_create_name_label": "档案名称",
    "modal_create_name_placeholder": "例如：Lucas - 英语",
    "modal_create_native_label": "您的母语",
    "modal_create_target_label": "要学习的语言",
    "btn_cancel_create": "取消",
    "btn_confirm_create": "创建",
    "modal_delete_title": "⚠️ 删除档案？",
    "modal_delete_desc1": "您确定要删除档案 ",
    "modal_delete_desc2": " 吗？您所有的学习进度和保存的卡片都将被永久删除。<strong>此操作将无法撤销。</strong>",
    "btn_cancel_delete": "取消",
    "btn_confirm_delete": "永久删除",
    
    // 动态提示
    "alert_import_select": "请选择一个 .json 文件进行导入。",
    "alert_import_success": "数据导入成功！",
    "alert_import_invalid": "无效文件。请确保使用的是本应用的备份文件。",
    "alert_import_error": "读取文件错误。文件可能已损坏。",
    "alert_create_name": "请输入档案名称！",
    "alert_create_diff": "母语必须与要学习的语言不同。",
    "alert_fill_both": "请填写这两个字段！",
    "alert_study_done": "🎉 该档案的复习已全部完成！",
    "alert_card_added": '"{0}" 已添加到档案中！',
    "msg_no_profiles": "尚未创建任何档案。点击“+ 创建档案”开始吧！",
    "msg_review_count": "您今天有 {0} 个 {1} 需要练习。",
    "word_single": "单词已就绪",
    "word_plural": "个单词已就绪",
    "msg_card_progress": "卡片 {0} / {1}",
    "title_change_profile": "切换档案",
    "title_delete_profile": "删除档案",
    "msg_no_cards_recent": "尚未注册任何单词。",
    "title_delete_card": "删除单词"
  },
    "fr": {
    "profiles_title": "Profils",
    "news_title": "Nouveautés",
    "btn_create_profile": "+ Créer un profil",
    "profiles_subtitle": "Choisissez un profil para continuer à étudier",
    "review_alert_title": "Révisions en attente",
    "btn_study_now": "Étudier maintenant",
    "add_card_title": "Ajouter un mot ou une expression",
    "placeholder_expression": "Expression originale",
    "placeholder_translation": "Traduction",
    "btn_add_card": "Ajouter",
    "recent_inserted_title": "Derniers mots enregistrés :",
    "tap_hint": "Appuyez pour voir la traduction",
    "feedback_title": "À quel point était-il facile de vous en souvenir ?",
    "btn_forgot": "J'ai complètement oublié ❌",
    "btn_hard": "S'en souvenir avec effort 🧠",
    "btn_easy": "Trop facile ! ⚡",
    "discord_title": "Communauté",
    "discord_desc": "Rejoignez le canal de discussion de Memodioma sur le Server Friends Around The World, axé sur la conversation en anglais sur Discord",
    "btn_access_discord": "Accéder à Discord",
    "settings_title": "Paramètres",
    "settings_lang_label": "Langue générale de l'application",
    "settings_backup_label": "Sauvegarde et migration",
    "settings_backup_desc": "Exportez vos données pour ne pas perdre votre progression ou chargez une sauvegarde depuis un autre appareil.",
    "btn_export_data": "📤 Exporter les données",
    "settings_import_label": "Importer un fichier de sauvegarde (.json)",
    "btn_import_data": "📥 Importer les données",
    "donate_title": "FAITES UN DON !",
    "donate_desc": "Ce projet est maintenu gratuitement par <strong>David Calazans</strong> sur GitHub et votre contribution, quel que soit son montant, est un encouragement pour de futures améliorations.",
    "donate_pix": "Clé Pix :",
    "find_me": "Retrouvez-moi ici",
    "about_title": "À PROPOS",
    "about_desc": "L'application <strong>Memodioma App</strong> est une application développée exclusivement pour transformer votre façon de vous entraîner et de maîtriser de nouvelles langues. En combinant science cognitive et aspect pratique, notre méthodologie accélère votre apprentissage pratique grâce à trois piliers fondamentaux :<br><br>🧠<strong>Méthode SRS (Spaced Repetition System / Répétition Espacée) :</strong> Vous n'avez pas besoin de réviser le même mot chaque jour jusqu'à l'épuisement. Notre algorithme intelligent calcule exactement le moment où votre esprit est sur le point d'oublier une information et la ramène pour révision. Cela consolide le contenu dans votre mémoire à long terme avec le moins d'effort possible.<br><br>🗂️<strong>Flashcards (Cartes mémoire) :</strong> Un outil classique et hautement efficace d'étude active. Chaque carte présente un défi au recto (une question, une phrase ou une image) et la réponse au verso. En forçant votre cerveau à chercher la réponse avant de retourner la carte, vous renforcez les connexions neuronales bien plus rapidement qu'en lisant simplement un livre.<br><br>✍🏻<strong>Chunks (Blocs de langue) :</strong> Au lieu d'apprendre par cœur des règles de grammaire complexes ou des mots isolés qui n'ont pas de sens seuls, vous apprenez à travers des chunks. Ce sont des combinaisons naturelles de mots fréquemment utilisées par les natifs (comme \"by the way\", \"comment ça va ?\" ou \"take a look\"). Apprendre par blocs vous permet de parler de manière beaucoup plus fluide, naturelle et sans bloquer pour traduire mentalement.",
    "nav_news": "Nouveautés",
    "nav_discord": "Discord",
    "nav_settings": "Paramètres",
    "modal_create_title": "Créer un nouveau profil",
    "modal_create_name_label": "Nom du profil",
    "modal_create_name_placeholder": "Ex : Lucas - Anglais",
    "modal_create_native_label": "Votre langue maternelle",
    "modal_create_target_label": "Langue que vous allez étudier",
    "btn_cancel_create": "Annuler",
    "btn_confirm_create": "Créer",
    "modal_delete_title": "⚠️ Supprimer le profil ?",
    "modal_delete_desc1": "Êtes-vous sûr de vouloir supprimer le profil ",
    "modal_delete_desc2": " ? Toute votre progression d'apprentissage et vos cartes sauvegardées seront définitivement supprimées. <strong>Cette action ne pourra pas être annulée.</strong>",
    "btn_cancel_delete": "Annuler",
    "btn_confirm_delete": "Supprimer définitivement",
    
    // Alertes dynamiques
    "alert_import_select": "Veuillez sélectionner un fichier .json à importer.",
    "alert_import_success": "Données importées avec succès !",
    "alert_import_invalid": "Fichier invalide. Assurez-vous d'utiliser la sauvegarde de l'application.",
    "alert_import_error": "Erreur lors de la lecture du fichier. Il est peut-être corrompu.",
    "alert_create_name": "Veuillez insérer un nom pour le profil !",
    "alert_create_diff": "La langue maternelle doit être différente de la langue étudiée.",
    "alert_fill_both": "Veuillez remplir les deux champs !",
    "alert_study_done": "🎉 Révisions terminées pour ce profil !",
    "alert_card_added": "« {0} » ajoutée au profil !",
    "msg_no_profiles": "Aucun profil créé. Cliquez sur « + Créer un profil » pour commencer !",
    "msg_review_count": "Vous avez {0} {1} à pratiquer aujourd'hui.",
    "word_single": "mot prêt",
    "word_plural": "mots prêts",
    "msg_card_progress": "Carte {0} sur {1}",
    "title_change_profile": "Changer de profil",
    "title_delete_profile": "Supprimer le profil",
    "msg_no_cards_recent": "Aucun mot enregistré pour le moment.",
    "title_delete_card": "Supprimer le mot"
  },
    "it": {
    "profiles_title": "Profili",
    "news_title": "Novità",
    "btn_create_profile": "+ Crea Profilo",
    "profiles_subtitle": "Scegli un profilo per continuare a studiare",
    "review_alert_title": "Ripassi in sospeso",
    "btn_study_now": "Studia Ora",
    "add_card_title": "Aggiungi Parola o Espressione",
    "placeholder_expression": "Espressione originale",
    "placeholder_translation": "Traduzione",
    "btn_add_card": "Aggiungi",
    "recent_inserted_title": "Ultime parole registrate:",
    "tap_hint": "Tocca per vedere la traduzione",
    "feedback_title": "Quanto è stato facile ricordare?",
    "btn_forgot": "Dimenticato del tutto ❌",
    "btn_hard": "Ricordato con sforzo 🧠",
    "btn_easy": "Troppo facile! ⚡",
    "discord_title": "Community",
    "discord_desc": "Entra nel canale di conversazione di Memodioma sul Server Friends Around The World, focalizzato sulla conversazione in inglese su Discord",
    "btn_access_discord": "Accedi a Discord",
    "settings_title": "Impostazioni",
    "settings_lang_label": "Lingua Generale dell'App",
    "settings_backup_label": "Backup e Migrazione",
    "settings_backup_desc": "Esporta i tuoi dati per non perdere i progressi o carica un backup da un altro dispositivo.",
    "btn_export_data": "📤 Esporta Dati",
    "settings_import_label": "Importa file di backup (.json)",
    "btn_import_data": "📥 Importa Dati",
    "donate_title": "DONA!",
    "donate_desc": "Questo progetto è mantenuto gratuitamente da <strong>David Calazans</strong> su GitHub e il tuo contributo di qualsiasi valore è un incentivo per miglioramenti futuri.",
    "donate_pix": "Chiave Pix:",
    "find_me": "Trovami qui",
    "about_title": "INFO",
    "about_desc": "L'applicazione <strong>Memodioma App</strong> è un'applicazione sviluppata esclusivamente per trasformare il modo in cui ti alleni e padroneggi nuove lingue. Combinando scienza cognitiva e praticità, la nostra metodologia accelera il tuo apprendimento pratico attraverso tre pilastri fondamentali:<br><br>🧠<strong>Metodo SRS (Spaced Repetition System / Ripetizione Dilazionata):</strong> Non hai bisogno di ripassare la stessa parola ogni santo giorno fino alla nausea. Il nostro algoritmo intelligente calcola esattamente il momento in che la tua mente sta per dimenticare un'informazione e la ripropone per il ripasso. Questo consolida il contenuto nella tua memoria a lungo termine con il minimo sforzo possibile.<br><br>🗂️<strong>Flashcards (Carte di Memoria):</strong> Strumento classico e altamente efficace di studio attivo. Ogni carta presenta una sfida sul fronte (una domanda, una frase o un'immagine) e la risposta sul retro. Forzando il tuo cervello a cercare la risposta prima di girare la carta, rafforzi le connessioni neurali molto più velocemente rispetto alla semplice lettura di un libro.<br><br>✍🏻<strong>Chunks (Blocchi di Linguaggio):</strong> Invece di memorizzare complesse regole grammaticali o parole isolate che non hanno senso da sole, impari attraverso i chunks. Sono combinazioni naturali di parole usate frequentemente dai madrelingua (come \"by the way\", \"come va?\" o \"take a look\"). Imparare a blocchi ti fa parlare in modo molto più fluido, naturale e senza bloccarti per tradurre mentalmente.",
    "nav_news": "Novità",
    "nav_discord": "Discord",
    "nav_settings": "Impostazioni",
    "modal_create_title": "Crea Nuovo Profilo",
    "modal_create_name_label": "Nome del Profilo",
    "modal_create_name_placeholder": "Es: Lucas - Inglese",
    "modal_create_native_label": "La tua lingua madre",
    "modal_create_target_label": "Lingua che studierai",
    "btn_cancel_create": "Annulla",
    "btn_confirm_create": "Crea",
    "modal_delete_title": "⚠️ Eliminare il Profilo?",
    "modal_delete_desc1": "Sei sicuro di voler eliminare il profilo ",
    "modal_delete_desc2": "? Tutti i tuoi progressi di apprendimento e le carte salvate saranno eliminati permanentemente. <strong>Questa azione non potrà essere annullata.</strong>",
    "btn_cancel_delete": "Annulla",
    "btn_confirm_delete": "Elimina Permanentemente",
    
    // Allerte Dinamici
    "alert_import_select": "Per favore, seleziona un file .json da importare.",
    "alert_import_success": "Dati importati con successo!",
    "alert_import_invalid": "File non valido. Assicurati di utilizzare il backup dell'app.",
    "alert_import_error": "Errore durante la lettura del file. Potrebbe essere danneggiato.",
    "alert_create_name": "Inserisci un nome per il profilo!",
    "alert_create_diff": "La lingua madre deve essere diversa da quella studiata.",
    "alert_fill_both": "Compila entrambi i campi!",
    "alert_study_done": "🎉 Ripassi completati in questo profilo!",
    "alert_card_added": '"{0}" aggiunta al profilo!',
    "msg_no_profiles": "Nessun profilo creato. Fai clic su \'+ Crea Profilo\' per iniziare!",
    "msg_review_count": "Hai {0} {1} da praticare oggi.",
    "word_single": "parola pronta",
    "word_plural": "parole pronte",
    "msg_card_progress": "Carta {0} di {1}",
    "title_change_profile": "Cambia Profilo",
    "title_delete_profile": "Elimina Profilo",
    "msg_no_cards_recent": "Nessuna parola ancora registrata.",
    "title_delete_card": "Elimina Parola"
  },
    "de": {
    "profiles_title": "Profile",
    "news_title": "Neuigkeiten",
    "btn_create_profile": "+ Profil erstellen",
    "profiles_subtitle": "Wählen Sie ein Profil aus, um mit dem Lernen fortzufahren",
    "review_alert_title": "Anstehende Wiederholungen",
    "btn_study_now": "Jetzt lernen",
    "add_card_title": "Wort oder Redewendung hinzufügen",
    "placeholder_expression": "Originaler Ausdruck",
    "placeholder_translation": "Übersetzung",
    "btn_add_card": "Hinzufügen",
    "recent_inserted_title": "Zuletzt registrierte Wörter:",
    "tap_hint": "Tippen, um die Übersetzung zu sehen",
    "feedback_title": "Wie leicht ist es Ihnen gefallen, sich zu erinnern?",
    "btn_forgot": "Komplett vergessen ❌",
    "btn_hard": "Mit Mühe erinnert 🧠",
    "btn_easy": "Viel zu einfach! ⚡",
    "discord_title": "Community",
    "discord_desc": "Treten Sie dem Konversationskanal von Memodioma auf dem Server Friends Around The World bei, der sich auf Englischkonversation auf Discord konzentriert",
    "btn_access_discord": "Discord beitreten",
    "settings_title": "Einstellungen",
    "settings_lang_label": "Allgemeine App-Sprache",
    "settings_backup_label": "Backup und Migration",
    "settings_backup_desc": "Exportieren Sie Ihre Daten, um Ihren Fortschritt nicht zu verlieren, oder laden Sie ein Backup von einem anderen Gerät.",
    "btn_export_data": "📤 Daten exportieren",
    "settings_import_label": "Backup-Datei (.json) importieren",
    "btn_import_data": "📥 Daten importieren",
    "donate_title": "SPENDEN!",
    "donate_desc": "Dieses Projekt wird von <strong>David Calazans</strong> auf GitHub kostenlos gepflegt. Ihr Beitrag in beliebiger Höhe ist ein Anreiz für zukünftige Verbesserungen.",
    "donate_pix": "Pix-Schlüssel:",
    "find_me": "Hier finden Sie mich",
    "about_title": "ÜBER UNS",
    "about_desc": "Die <strong>Memodioma App</strong> wurde exklusiv entwickelt, um die Art und Weise zu verändern, wie Sie neue Sprachen trainieren und meistern. Durch die Kombination von Kognitionswissenschaft und Praktikabilität beschleunigt unsere Methodik Ihr praktisches Lernen durch drei grundlegende Säulen:<br><br>🧠<strong>SRS-Methode (Spaced Repetition System / Spationierte Wiederholung):</strong> Sie müssen nicht jeden verdammten Tag dasselbe Wort wiederholen, bis Sie müde werden. Unser intelligenter Algorithmus berechnet genau den Moment, in dem Ihr Gehirn im Begriff ist, eine Information zu vergessen, und bringt sie zur Wiederholung zurück. Dadurch wird der Inhalt mit minimalem Aufwand in Ihrem Langzeitgedächtnis gefestigt.<br><br>🗂️<strong>Flashcards (Karteikarten):</strong> Ein klassisches und hochwirksames Werkzeug für aktives Lernen. Jede Karte zeigt eine Herausforderung auf der Vorderseite (eine Frage, einen Satz oder ein Bild) und die Antwort auf der Rückseite. Indem Sie Ihr Gehirn zwingen, nach der Antwort zu suchen, bevor Sie die Karte umdrehen, stärken Sie die neuronalen Verbindungen viel schneller, als wenn Sie nur ein Buch lesen.<br><br>✍🏻<strong>Chunks (Sprachbausteine):</strong> Anstatt komplexe Grammatikregeln oder einzelne Wörter zu pauken, die allein keinen Sinn ergeben, lernen Sie durch Chunks. Dies sind natürliche Wortkombinationen, die von Muttersprachlern häufig verwendet werden (wie \"by the way\", \"wie geht's?\" oder \"take a look\"). Das Lernen in Bausteinen lässt Sie viel flüssiger und natürlicher sprechen, ohne dass Sie bei der mentalen Übersetzung ins Stocken geraten.",
    "nav_news": "News",
    "nav_discord": "Discord",
    "nav_settings": "Konfig",
    "modal_create_title": "Neues Profil erstellen",
    "modal_create_name_label": "Profilname",
    "modal_create_name_placeholder": "Z. B.: Lucas - Englisch",
    "modal_create_native_label": "Ihre Muttersprache",
    "modal_create_target_label": "Sprache, die Sie lernen möchten",
    "btn_cancel_create": "Abbrechen",
    "btn_confirm_create": "Erstellen",
    "modal_delete_title": "⚠️ Profil löschen?",
    "modal_delete_desc1": "Sind Sie sicher, dass Sie das Profil löschen möchten ",
    "modal_delete_desc2": "? Ihr gesamter Lernfortschritt und die gespeicherten Karten werden dauerhaft gelöscht. <strong>Diese Aktion kann nicht rückgängig gemacht werden.</strong>",
    "btn_cancel_delete": "Abbrechen",
    "btn_confirm_delete": "Dauerhaft löschen",
    
    // Dynamische Warnungen
    "alert_import_select": "Bitte wählen Sie eine .json-Datei zum Importieren aus.",
    "alert_import_success": "Daten erfolgreich importiert!",
    "alert_import_invalid": "Ungültige Datei. Stellen Sie sicher, dass Sie das Backup der App verwenden.",
    "alert_import_error": "Fehler beim Lesen der Datei. Sie könnte beschädigt sein.",
    "alert_create_name": "Bitte geben Sie einen Namen für das Profil ein!",
    "alert_create_diff": "Die Muttersprache muss sich von der zu lernenden Sprache unterscheiden.",
    "alert_fill_both": "Bitte füllen Sie beide Felder aus!",
    "alert_study_done": "🎉 Wiederholungen in diesem Profil abgeschlossen!",
    "alert_card_added": '"{0}" zum Profil hinzugefügt!',
    "msg_no_profiles": "Noch kein Profil erstellt. Klicken Sie auf \'+ Profil erstellen\', um zu beginnen!",
    "msg_review_count": "Sie haben heute {0} {1} zum Üben.",
    "word_single": "Wort bereit",
    "word_plural": "Wörter bereit",
    "msg_card_progress": "Karte {0} von {1}",
    "title_change_profile": "Profil wechseln",
    "title_delete_profile": "Profil löschen",
    "msg_no_cards_recent": "Noch keine Wörter registriert.",
    "title_delete_card": "Wort löschen"
  },
    "ru": {
    "profiles_title": "Профили",
    "news_title": "Что нового",
    "btn_create_profile": "+ Создать профиль",
    "profiles_subtitle": "Выберите профиль, чтобы продолжить обучение",
    "review_alert_title": "Ожидают повторения",
    "btn_study_now": "Учиться сейчас",
    "add_card_title": "Добавить слово или выражение",
    "placeholder_expression": "Оригинальное выражение",
    "placeholder_translation": "Перевод",
    "btn_add_card": "Добавить",
    "recent_inserted_title": "Последние добавленные слова:",
    "tap_hint": "Нажмите, чтобы увидеть перевод",
    "feedback_title": "Насколько легко было вспомнить?",
    "btn_forgot": "Полностью забыл ❌",
    "btn_hard": "Вспомнил с трудом 🧠",
    "btn_easy": "Слишком легко! ⚡",
    "discord_title": "Сообщество",
    "discord_desc": "Присоединяйтесь к разговорному каналу Memodioma на сервере Friends Around The World, посвященному общению на английском языке в Discord",
    "btn_access_discord": "Войти в Discord",
    "settings_title": "Настройки",
    "settings_lang_label": "Общий язык приложения",
    "settings_backup_label": "Резервное копирование и миграция",
    "settings_backup_desc": "Экспортируйте свои данные, чтобы не потерять прогресс, или загрузите резервную копию с другого устройства.",
    "btn_export_data": "📤 Экспорт данных",
    "settings_import_label": "Импортировать файл резервной копии (.json)",
    "btn_import_data": "📥 Импорт данных",
    "donate_title": "ПОДДЕРЖАТЬ ПРОЕКТ!",
    "donate_desc": "Этот проект поддерживается бесплатно разработчиком <strong>David Calazans</strong> на GitHub, и ваш вклад на любую сумму станет отличным стимулом для будущих улучшений.",
    "donate_pix": "Ключ Pix:",
    "find_me": "Найти меня здесь",
    "about_title": "О ПРИЛОЖЕНИИ",
    "about_desc": "Приложение <strong>Memodioma App</strong> создано исключительно для того, чтобы изменить ваш подход к практике и освоению новых языков. Сочетая когнитивную науку и практичность, наша методика ускоряет ваше обучение на практике с помощью трех фундаментальных столпов:<br><br>🧠<strong>Метод SRS (Spaced Repetition System / Интервальные повторения):</strong> Вам не нужно зубрить одно и то же слово каждый божий день до изнеможения. Наш умный алгоритм рассчитывает именно тот момент, когда ваш мозг вот-вот забудет информацию, и возвращает ее на повторение. Это закрепляет материал в долговременной памяти с минимальными усилиями.<br><br>🗂️<strong>Flashcards (Флэш-карточки):</strong> Классический и высокоэффективный инструмент активного обучения. Каждая карточка содержит задание на лицевой стороне (вопрос, фразу или изображение) и ответ на обороте. Заставляя мозг искать ответ до того, как перевернуть карточку, вы укрепляете нейронные связи гораздо быстрее, чем при обычном чтении книги.<br><br>✍🏻<strong>Chunks (Лексические блоки):</strong> Вместо заучивания сложных грамматических правил или отдельных слов, которые не имеют смысла сами по себе, вы учитесь на примерах готовых блоков (chunks). Это естественные комбинации слов, часто используемые носителями языка (например, \"by the way\", \"как дела?\" или \"take a look\"). Обучение блоками помогает говорить гораздо более бегло, естественно и без заминок на мысленный перевод.",
    "nav_news": "Новости",
    "nav_discord": "Discord",
    "nav_settings": "Настройки",
    "modal_create_title": "Создать новый профиль",
    "modal_create_name_label": "Имя профиля",
    "modal_create_name_placeholder": "Например: Лукас - Английский",
    "modal_create_native_label": "Ваш родной язык",
    "modal_create_target_label": "Язык для изучения",
    "btn_cancel_create": "Отмена",
    "btn_confirm_create": "Создать",
    "modal_delete_title": "⚠️ Удалить профиль?",
    "modal_delete_desc1": "Вы уверены, что хотите удалить профиль ",
    "modal_delete_desc2": "? Весь ваш прогресс обучения и сохраненные карточки будут удалены безвозвратно. <strong>Это действие нельзя отменить.</strong>",
    "btn_cancel_delete": "Отмена",
    "btn_confirm_delete": "Удалить навсегда",
    
    // Динамические уведомления
    "alert_import_select": "Пожалуйста, выберите файл .json для импорта.",
    "alert_import_success": "Данные успешно импортированы!",
    "alert_import_invalid": "Неверный файл. Убедитесь, что используете резервную копию приложения.",
    "alert_import_error": "Ошибка чтения файла. Возможно, он поврежден.",
    "alert_create_name": "Введите имя профиля!",
    "alert_create_diff": "Родной язык должен отличаться от изучаемого.",
    "alert_fill_both": "Заполните оба поля!",
    "alert_study_done": "🎉 Повторения в этом профиле завершены!",
    "alert_card_added": '"{0}" добавлено в профиль!',
    "msg_no_profiles": "Профили не созданы. Нажмите «+ Создать профиль», чтобы начать!",
    "msg_review_count": "Сегодня у вас есть {0} {1} для практики.",
    "word_single": "готовое слово",
    "word_plural": "готовых слов",
    "msg_card_progress": "Карточка {0} из {1}",
    "title_change_profile": "Сменить профиль",
    "title_delete_profile": "Удалить профиль",
    "msg_no_cards_recent": "Слова еще не добавлены.",
    "title_delete_card": "Удалить слово"
  },
    "ko": {
    "profiles_title": "프로필",
    "news_title": "새로운 소식",
    "btn_create_profile": "+ 프로필 생성",
    "profiles_subtitle": "학습을 계속할 프로필을 선택하세요",
    "review_alert_title": "대기 중인 복습",
    "btn_study_now": "지금 학습하기",
    "add_card_title": "단어 또는 표현 추가",
    "placeholder_expression": "원문 표현",
    "placeholder_translation": "번역",
    "btn_add_card": "추가",
    "recent_inserted_title": "최근 등록된 단어:",
    "tap_hint": "번역을 보려면 탭하세요",
    "feedback_title": "기억해내기 얼마나 쉬웠나요?",
    "btn_forgot": "완전히 잊어버림 ❌",
    "btn_hard": "어렵게 기억해냄 🧠",
    "btn_easy": "너무 쉬움! ⚡",
    "discord_title": "커뮤니티",
    "discord_desc": "Discord에서 영어 회화에 집중하는 Server Friends Around The World 내 Memodioma 대화 채널에 참여하세요",
    "btn_access_discord": "Discord 접속하기",
    "settings_title": "설정",
    "settings_lang_label": "앱 전체 언어",
    "settings_backup_label": "백업 및 마이그레이션",
    "settings_backup_desc": "진행 상황을 잃지 않도록 데이터를 내보내거나 다른 기기의 백업을 불러오세요.",
    "btn_export_data": "📤 데이터 내보내기",
    "settings_import_label": "백업 파일(.json) 가져오기",
    "btn_import_data": "📥 데이터 가져오기",
    "donate_title": "후원하기!",
    "donate_desc": "이 프로젝트는 GitHub에서 <strong>David Calazans</strong>에 의해 무료로 유지 관리되고 있으며, 금액에 상관없이 여러분의 후원은 향후 개선을 위한 큰 격려가 됩니다.",
    "donate_pix": "Pix 키:",
    "find_me": "여기서 저를 찾아보세요",
    "about_title": "정보",
    "about_desc": "<strong>Memodioma App</strong>은 새로운 언어를 훈련하고 마스터하는 방식을 바꾸기 위해 독점적으로 개발된 애플리케이션입니다. 인지 과학과 실용성을 결합한 당사의 방법론은 세 가지 핵심 축을 통해 실전 학습을 가속화합니다:<br><br>🧠<strong>SRS 방법 (Spaced Repetition System / 간격 반복 시스템):</strong> 지칠 때까지 매일 똑같은 단어를 복습할 필요가 없습니다. 당사의 스마트 알고리즘은 뇌가 정보를 잊어버리기 직전의 정확한 타이밍을 계산하여 복습할 수 있도록 다시 가져옵니다. 이를 통해 최소한의 노력으로 장기 기억에 콘텐츠를 정착시킵니다.<br><br>🗂️<strong>Flashcards (플래시카드):</strong> 능동적 학습을 위한 클래식하고 매우 효과적인 도구입니다. 각 카드의 앞면에는 도전 과제(질문, 문장 또는 이미지)가, 뒷면에는 정답이 표시됩니다. 카드를 뒤집기 전에 뇌가 정답을 찾도록 강제함으로써, 단순히 책을 읽는 것보다 훨씬 빠르게 신경 연결을 강화합니다.<br><br>✍🏻<strong>Chunks (언어 덩어리):</strong> 복잡한 문법 규칙이나 단독으로는 의미가 없는 개별 단어를 암기하는 대신 덩어리(Chunks)를 통해 학습합니다. 이는 원어민들이 자주 사용하는 자연스러운 단어 조합입니다(\"by the way\", \"how's it going?\" 또는 \"take a look\" 등). 덩어리로 학습하면 머릿속으로 번역하느라 멈추지 않고 훨씬 더 유창하고 자연스럽게 말할 수 있게 됩니다.",
    "nav_news": "소식",
    "nav_discord": "디스코드",
    "nav_settings": "설정",
    "modal_create_title": "새 프로필 생성",
    "modal_create_name_label": "프로필 이름",
    "modal_create_name_placeholder": "예: Lucas - 영어",
    "modal_create_native_label": "모국어",
    "modal_create_target_label": "학습할 언어",
    "btn_cancel_create": "취소",
    "btn_confirm_create": "생성",
    "modal_delete_title": "⚠️ 프로필을 삭제하시겠습니까?",
    "modal_delete_desc1": "정말로 프로필을 삭제하시겠습니까? ",
    "modal_delete_desc2": " 저장된 모든 학습 진행 상황과 카드가 영구적으로 삭제됩니다. <strong>이 작업은 취소할 수 없습니다.</strong>",
    "btn_cancel_delete": "취소",
    "btn_confirm_delete": "영구 삭제",
    
    // 동적 알림
    "alert_import_select": "가져올 .json 파일을 선택해 주세요.",
    "alert_import_success": "데이터를 성공적으로 가져왔습니다!",
    "alert_import_invalid": "올바르지 않은 파일입니다. 앱의 백업 파일이 맞는지 확인해 주세요.",
    "alert_import_error": "파일을 읽는 중 오류가 발생했습니다. 파일이 손상되었을 수 있습니다.",
    "alert_create_name": "프로필 이름을 입력해 주세요!",
    "alert_create_diff": "모국어는 학습할 언어와 달라야 합니다.",
    "alert_fill_both": "두 필드를 모두 입력해 주세요!",
    "alert_study_done": "🎉 이 프로필의 모든 복습이 완료되었습니다!",
    "alert_card_added": '"{0}"이(가) 프로필에 추가되었습니다!',
    "msg_no_profiles": "생성된 프로필이 없습니다. 시작하려면 '+ 프로필 생성'을 클릭하세요!",
    "msg_review_count": "오늘 연습할 {1}이(가) {0}개 있습니다.",
    "word_single": "준비된 단어",
    "word_plural": "준비된 단어들",
    "msg_card_progress": "카드 {0} / {1}",
    "title_change_profile": "프로필 변경",
    "title_delete_profile": "프로필 삭제",
    "msg_no_cards_recent": "아직 등록된 단어가 없습니다.",
    "title_delete_card": "단어 삭제"
  },
    "ja": {
    "profiles_title": "プロフィール",
    "news_title": "新着情報",
    "btn_create_profile": "+ プロフィール作成",
    "profiles_subtitle": "学習を続けるプロフィールを選択してください",
    "review_alert_title": "保留中の復習",
    "btn_study_now": "今すぐ学習する",
    "add_card_title": "単語・表現の追加",
    "placeholder_expression": "元の表現",
    "placeholder_translation": "翻訳",
    "btn_add_card": "追加",
    "recent_inserted_title": "最近登録された単語：",
    "tap_hint": "タップして翻訳を表示",
    "feedback_title": "どれくらい簡単に思い出せましたか？",
    "btn_forgot": "完全に忘れた ❌",
    "btn_hard": "努力して思い出した 🧠",
    "btn_easy": "簡単すぎる！ ⚡",
    "discord_title": "コミュニティ",
    "discord_desc": "Discordでの英語の会話に特化した、Server Friends Around The World内のMemodioma会話チャンネルに参加しましょう",
    "btn_access_discord": "Discordにアクセス",
    "settings_title": "設定",
    "settings_lang_label": "アプリの総合言語",
    "settings_backup_label": "バックアップと移行",
    "settings_backup_desc": "進捗状況を失わないようにデータをエクスポートするか、別の端末からバックアップを読み込みます。",
    "btn_export_data": "📤 データをエクスポート",
    "settings_import_label": "バックアップファイル（.json）をインポート",
    "btn_import_data": "📥 データをインポート",
    "donate_title": "寄付する！",
    "donate_desc": "このプロジェクトはGitHub上で <strong>David Calazans</strong> によって無料のボランティアとして維持管理されており、金額を問わず皆様からのご支援は今後の改善への励みになります。",
    "donate_pix": "Pixキー：",
    "find_me": "ここで私を見つけてください",
    "about_title": "アプリについて",
    "about_desc": "<strong>Memodioma App</strong>は、新しい言語をトレーニングしてマスターする方法に革命を起こすために開発された専用アプリケーションです。認知科学と実用性を組み合わせた当社のメソッドは、3つの重要な柱を通じて実践的な学習を加速させます：<br><br>🧠<strong>SRSメソッド（Spaced Repetition System / 間隔反復システム）：</strong> 飽きるまで毎日同じ単語を復習する必要はありません。当社のスマートなアルゴリズムが、脳が情報を忘れそうになる正確なタイミングを計算し、復習のために呼び戻します。これにより、最小限の手間でコンテンツを長期記憶に定着させます。<br><br>🗂️<strong>Flashcards（暗記カード）：</strong> アクティブ・ラーニングにおいて古典的かつ非常に効果的なツールです。各カードの表面には課題（質問、フレーズ、または画像）が表示され、裏面に解答が表示されます。カードをめくる前に脳に答えを探させることで、単に本を読むよりもはるかに速く神経結合を強化します。<br><br>✍🏻<strong>Chunks（チャンク学習）：</strong> 複雑な文法規則や、それだけでは意味をなさない孤立した単語を丸暗記する代わりに、チャンク（言葉の塊）を通じて学びます。これらはネイティブスピーカーが頻繁に使用する自然な単語の組み合わせです（\"by the way\"、\"como vai?\"、\"take a look\"など）。塊で学ぶことで、頭の中で翻訳するために立ち止まることなく、はるかに流暢で自然に話せるようになります。",
    "nav_news": "ニュース",
    "nav_discord": "Discord",
    "nav_settings": "設定",
    "modal_create_title": "新規プロフィール作成",
    "modal_create_name_label": "プロフィール名",
    "modal_create_name_placeholder": "例：Lucas - 英語",
    "modal_create_native_label": "あなたの母国語",
    "modal_create_target_label": "学習する言語",
    "btn_cancel_create": "キャンセル",
    "btn_confirm_create": "作成",
    "modal_delete_title": "⚠️ プロフィールを削除しますか？",
    "modal_delete_desc1": "本当にプロフィールを削除してもよろしいですか？ ",
    "modal_delete_desc2": " 保存されているすべての学習進捗とカードが永久に削除されます。<strong>この操作は取り消すことができません。</strong>",
    "btn_cancel_delete": "キャンセル",
    "btn_confirm_delete": "永久に削除",
    
    // 動的アラート
    "alert_import_select": "インポートする .json ファイルを選択してください。",
    "alert_import_success": "データが正常にインポートされました！",
    "alert_import_invalid": "無効なファイルです。アプリのバックアップファイルであることを確認してください。",
    "alert_import_error": "ファイルの読み込み中にエラーが発生しました。ファイルが破損している可能性があります。",
    "alert_create_name": "プロフィール名を入力してください！",
    "alert_create_diff": "母国語と学習する言語は異なる必要があります。",
    "alert_fill_both": "両方のフィールドを入力してください！",
    "alert_study_done": "🎉 このプロフィールの復習がすべて完了しました！",
    "alert_card_added": '「{0}」がプロフィールに追加されました！',
    "msg_no_profiles": "プロフィールが作成されていません。「+ プロフィール作成」をクリックして開始してください！",
    "msg_review_count": "今日練習する{1}が {0} 個あります。",
    "word_single": "準備完了の単語",
    "word_plural": "準備完了の単語",
    "msg_card_progress": "カード {0} / {1}",
    "title_change_profile": "プロフィール変更",
    "title_delete_profile": "プロフィール削除",
    "msg_no_cards_recent": "まだ単語が登録されていません。",
    "title_delete_card": "単語を削除"
  },
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

async function exportarDados() {
  const dbData = localStorage.getItem('sqlite_memodioma_db');
  if (!dbData) {
    alert("Nenhum dado para exportar.");
    return;
  }

  // Verifica se está rodando no aplicativo nativo (Android/Capacitor)
  if (window.Capacitor && window.Capacitor.isNativePlatform()) {
    try {
      const Filesystem = window.Capacitor.Plugins.Filesystem;
      const Share = window.Capacitor.Plugins.Share;

      // Nome do arquivo gerado
      const fileName = `memodioma_backup_${new Date().getTime()}.json`;

      // 1. Escreve o arquivo no cache do aparelho nativamente
      const result = await Filesystem.writeFile({
        path: fileName,
        data: dbData,
        directory: 'CACHE', // Salva temporariamente para poder compartilhar
        encoding: 'utf8'
      });

      // 2. Chama a tela nativa de compartilhamento/salvar arquivo do Android
      await Share.share({
        title: 'Backup Memodioma',
        text: 'Aqui está o arquivo de backup dos seus estudos.',
        url: result.uri,
        dialogTitle: 'Salvar backup do Memodioma'
      });

    } catch (error) {
      console.error("Erro ao exportar no Android:", error);
      alert("Erro ao exportar arquivo nativo.");
    }
  } else {
    // Código original: Continua funcionando perfeitamente se você abrir no navegador WEB
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
