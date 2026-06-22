export type Lang = 'en' | 'fr' | 'ar'

export const translations = {
  en: {
    // Header
    headerSubtitle: 'AI · ENSIA · Algiers',
    talkButton: 'Talk to AI Rayane',
    talkButtonShort: 'AI Rayane',

    // Loading
    loadingSubtitle: 'Entering the digital universe...',

    // Hero
    heroTagline: 'AI & Software Engineering · ENSIA · Algiers',
    heroSub: 'ML · Full-Stack · Cybersecurity · 12+ projects',
    orbHint: '✦ click the orbs to explore ✦',

    // Stats
    statProjects: 'Projects',
    statInternships: 'Internships',
    statYear: 'Year @ ENSIA',

    // Orbs
    orbProjects: 'Projects',
    orbExperience: 'Experience',
    orbSkills: 'Skills',
    orbEducation: 'Education',
    orbContact: 'Contact',

    // Projects Panel
    projectsTitle: 'Projects',
    projectsSub: '14+ builds across AI, security, and web',
    projectFeatured: 'Featured',
    projectDescriptions: [
      'Production skin lesion classifier with Grad-CAM explainability, temperature calibration (ECE 0.030), and MC Dropout uncertainty quantification. EfficientNet-B0 on ISIC 2019 — 7 classes, 22K images, Apple M3 Max.',
      'Chrome Manifest V3 extension with 11 security layers for Gmail phishing detection. Gemini API for AI content analysis + DMARC/DKIM email authentication verification.',
      'ML pipeline classifying DNS traffic as tunneling or legitimate on a 250,000-record dataset. Random Forest, XGBoost, Logistic Regression evaluated with ROC curves and feature-importance analysis.',
      'Built and tuned forecasting and classification models for a competitive Kaggle time series challenge. Achieved 0.96 accuracy through careful feature engineering and model selection.',
      'End-to-end multi-drone delivery system optimizing routes, speeds, and altitudes. Compared MILP vs Ant Colony, Genetic Algorithms, and Simulated Annealing — SA won.',
      'Marketplace connecting home cooks with local customers. Cooks publish their menu, customers browse and order. Real-time sync with Supabase + Firebase Firestore.',
      'End-to-end platform extracting structured B2B data from 12,000+ exhibitor records using Google Cloud Vision + Claude AI for NLP parsing. Built as team lead at Temacina.',
      'Web application for managing clinic operations, including patients, appointments, and records. Streamlines scheduling and patient data management for dental practices.',
      'Collected a behavioral dataset and trained and compared multiple ML models to predict pain location and severity. Evaluated classifiers and regressors to find the best-performing approach.',
      'Designed and built 14 additional front-end websites covering responsive layouts, UI components, and interactive features — demonstrating versatility across different design systems.',
    ],
    projectTaglines: [
      'Medical AI · AUC-ROC 0.9630',
      'AI · Cybersecurity · Chrome Extension',
      'ML · Network Security · 250K dataset',
      'Kaggle Challenge · Time Series · 0.96 Accuracy',
      'Optimization · Metaheuristics',
      'Full-Stack Mobile · Flutter',
      'NLP · Data Engineering · 12K records',
      'Full-Stack · Clinic Operations',
      'ML · Healthcare · Classification & Regression',
      'UI/UX · 14 Websites',
    ],

    // Experience Panel
    experienceTitle: 'Experience',
    experienceSub: '3 internships · jury member · team lead · AI & data focus',
    experienceBullets: [
      [
        'Led 5-person team building an end-to-end OCR & NLP data extraction platform',
        'Extracted structured data from 12,000+ exhibitor records with Google Cloud Vision + Claude AI',
        'Shipped analytics dashboard — Django backend, Vue.js frontend',
        'Ran sprint planning, task delegation, and code review for the team',
      ],
      [
        'Applied classification, clustering, anomaly detection, and association rule mining on HR data',
        'Built models for candidate acceptance prediction and intelligent department assignment',
        'Benchmarked SVM, Random Forests, Decision Trees, and Gradient Boosting',
      ],
      [
        'Contributed to architecture design of the Multi-Service Network',
        'Hands-on experience in network core maintenance and telecom infrastructure',
      ],
      [
        'Served as jury member for the mobile development track',
        'Evaluated student projects on technical merit, innovation, and UX quality',
      ],
    ],
    experienceEducationDesc: 'National Higher School of Artificial Intelligence — top AI school in Algeria. Coursework: ML, Deep Learning, Data Mining, Time Series, OR, Network Security, Databases.',

    // Skills Panel
    skillsTitle: 'Skills',
    skillsSub: '50+ technologies across 5 domains',
    skillsAlsoIncludes: 'Also includes',
    langNative: 'Native',
    langFluent: 'Fluent',
    softSkills: ['Team Leadership', 'Agile/Scrum', 'Fast Learner', 'Technical Docs'],

    // Education Panel
    educationTitle: 'Education',
    educationSub: '4th year · expected 2027',
    educationSchoolDesc: "Algeria's premier AI school. 4th-year student building at the intersection of machine learning, systems, and creative problem solving.",
    educationBac: 'Baccalaureate · Science · Honors: Excellent',
    educationCoursework: 'Relevant coursework',
    educationCerts: 'Certifications & Awards',

    // Contact Panel
    contactTitle: 'Contact',
    contactSub: 'Open to opportunities, research, and collaboration',
    contactCTA: "Let's build something exceptional",
    contactCTADesc: '4th-year AI student at ENSIA, fluent in ML, full-stack, and cybersecurity. Fast learner, team leader, builder of real things.',
    contactCTAButton: 'Say hello →',
    contactEmailDesc: 'Best for opportunities & collaboration',
    contactGithubDesc: '12+ public projects',
    contactHFDesc: 'DermAI live demo + models',
    contactLocationDesc: 'Open to remote worldwide',

    // Chat
    chatOnline: 'online',
    chatThinking: 'thinking...',
    chatPlaceholder: 'Ask me anything...',
    chatWatermark: 'Answers from verified context only ·',
    chatEmailRayane: 'email Rayane',
    chatIntro: "Hi! I'm AI Rayane 👋 I'm a digital twin of Rayane Toumi — ENSIA AI student, ML engineer, and builder of a dozen+ projects. Ask me anything about my work, skills, or story.",
    chatSuggestions: [
      'Tell me about DermAI',
      "What's your strongest skill?",
      'Walk me through your internships',
      'What are you working on now?',
      'How did you learn ML?',
    ],
  },

  fr: {
    // Header
    headerSubtitle: 'IA · ENSIA · Alger',
    talkButton: 'Parler à AI Rayane',
    talkButtonShort: 'AI Rayane',

    // Loading
    loadingSubtitle: "Entrée dans l'univers numérique...",

    // Hero
    heroTagline: 'IA & Génie Logiciel · ENSIA · Alger',
    heroSub: 'ML · Full-Stack · Cybersécurité · 12+ projets',
    orbHint: '✦ cliquez les orbes pour explorer ✦',

    // Stats
    statProjects: 'Projets',
    statInternships: 'Stages',
    statYear: 'Année @ ENSIA',

    // Orbs
    orbProjects: 'Projets',
    orbExperience: 'Expérience',
    orbSkills: 'Compétences',
    orbEducation: 'Formation',
    orbContact: 'Contact',

    // Projects Panel
    projectsTitle: 'Projets',
    projectsSub: '14+ réalisations en IA, sécurité et web',
    projectFeatured: 'À la une',
    projectDescriptions: [
      "Classificateur de lésions cutanées avec explainabilité Grad-CAM, calibration de température (ECE 0.030) et quantification d'incertitude MC Dropout. EfficientNet-B0 sur ISIC 2019 — 7 classes, 22K images.",
      "Extension Chrome Manifest V3 avec 11 couches de sécurité pour la détection de phishing Gmail. Gemini API pour l'analyse IA + vérification d'authentification email DMARC/DKIM.",
      "Pipeline ML classifiant le trafic DNS (tunneling vs légitime) sur 250 000 enregistrements. Random Forest, XGBoost, Régression logistique évalués avec courbes ROC et analyse d'importance.",
      "Modèles de prévision et classification pour un défi Kaggle de séries temporelles multivariées. Précision de 0.96 grâce à l'ingénierie de features et la sélection de modèles.",
      "Système de livraison multi-drones optimisant routes, vitesses et altitudes. Comparaison MILP vs Colonie de Fourmis, Algorithmes Génétiques, Recuit Simulé — le RS a gagné.",
      'Marketplace connectant cuisiniers amateurs et clients locaux. Menu publié par les cuisiniers, commandes en temps réel via Supabase + Firebase Firestore.',
      "Plateforme bout-en-bout extrayant des données B2B structurées de 12 000+ fiches exposants avec Google Cloud Vision + Claude AI. Développé en tant que chef d'équipe chez Temacina.",
      "Application web de gestion de cabinet dentaire incluant patients, rendez-vous et dossiers médicaux. Optimise la planification et la gestion des données patient.",
      "Dataset comportemental collecté et plusieurs modèles ML entraînés pour prédire localisation et sévérité de douleur. Évaluation de classifieurs et régresseurs.",
      "14 sites web front-end conçus et développés couvrant layouts responsives, composants UI et fonctionnalités interactives — démontrant la polyvalence sur différents systèmes de design.",
    ],
    projectTaglines: [
      'IA Médicale · AUC-ROC 0.9630',
      'IA · Cybersécurité · Extension Chrome',
      'ML · Sécurité Réseau · 250K données',
      'Kaggle · Séries Temporelles · 0.96 Précision',
      'Optimisation · Métaheuristiques',
      'Mobile Full-Stack · Flutter',
      'NLP · Data Engineering · 12K enregistrements',
      'Full-Stack · Cabinet Dentaire',
      'ML · Santé · Classification & Régression',
      'UI/UX · 14 Sites Web',
    ],

    // Experience Panel
    experienceTitle: 'Expérience',
    experienceSub: "3 stages · membre du jury · chef d'équipe · IA & données",
    experienceBullets: [
      [
        "Dirigé une équipe de 5 personnes pour construire une plateforme OCR & NLP d'extraction de données",
        'Extrait des données structurées de 12 000+ fiches exposants avec Google Cloud Vision + Claude AI',
        'Livré un tableau de bord analytics — backend Django, frontend Vue.js',
        "Géré la planification des sprints, la délégation des tâches et la révision de code pour l'équipe",
      ],
      [
        "Appliqué classification, clustering, détection d'anomalies et règles d'association sur données RH",
        "Construit des modèles pour la prédiction d'acceptation de candidats et l'affectation intelligente de département",
        'Comparé SVM, Random Forests, Arbres de Décision et Gradient Boosting',
      ],
      [
        'Contribué à la conception de l\'architecture du Réseau Multi-Services',
        'Expérience pratique en maintenance du cœur réseau et infrastructure télécom',
      ],
      [
        'Membre du jury pour le track développement mobile',
        'Évaluation des projets étudiants sur le mérite technique, l\'innovation et la qualité UX',
      ],
    ],
    experienceEducationDesc: "École Nationale Supérieure d'Intelligence Artificielle — meilleure école IA d'Algérie. Cours: ML, Deep Learning, Data Mining, Séries Temporelles, RO, Sécurité Réseau, Bases de Données.",

    // Skills Panel
    skillsTitle: 'Compétences',
    skillsSub: '50+ technologies dans 5 domaines',
    skillsAlsoIncludes: 'Inclut aussi',
    langNative: 'Natif',
    langFluent: 'Courant',
    softSkills: ["Leadership d'équipe", 'Agile/Scrum', 'Apprentissage rapide', 'Documentation technique'],

    // Education Panel
    educationTitle: 'Formation',
    educationSub: '4ème année · diplôme prévu 2027',
    educationSchoolDesc: "La meilleure école d'IA d'Algérie. Étudiant en 4ème année travaillant à l'intersection du machine learning, des systèmes et de la résolution créative de problèmes.",
    educationBac: 'Baccalauréat · Sciences · Mention : Excellent',
    educationCoursework: 'Cours pertinents',
    educationCerts: 'Certifications & Prix',

    // Contact Panel
    contactTitle: 'Contact',
    contactSub: 'Ouvert aux opportunités, à la recherche et à la collaboration',
    contactCTA: "Construisons quelque chose d'exceptionnel",
    contactCTADesc: "Étudiant en IA en 4ème année à l'ENSIA, maîtrisant le ML, le full-stack et la cybersécurité. Apprenant rapide, chef d'équipe, constructeur de vraies choses.",
    contactCTAButton: 'Dire bonjour →',
    contactEmailDesc: 'Idéal pour les opportunités et la collaboration',
    contactGithubDesc: '12+ projets publics',
    contactHFDesc: 'Démo DermAI + modèles',
    contactLocationDesc: 'Ouvert au télétravail mondial',

    // Chat
    chatOnline: 'en ligne',
    chatThinking: 'réflexion...',
    chatPlaceholder: "Posez-moi n'importe quelle question...",
    chatWatermark: 'Réponses à partir du contexte vérifié ·',
    chatEmailRayane: 'contacter Rayane',
    chatIntro: "Bonjour ! Je suis AI Rayane 👋 Je suis le jumeau numérique de Rayane Toumi — étudiant en IA à l'ENSIA, ingénieur ML et créateur de dizaines de projets. Posez-moi n'importe quelle question !",
    chatSuggestions: [
      'Parle-moi de DermAI',
      'Quelle est ta meilleure compétence ?',
      'Décris tes stages',
      'Sur quoi travailles-tu maintenant ?',
      'Comment as-tu appris le ML ?',
    ],
  },

  ar: {
    // Header
    headerSubtitle: 'ذكاء اصطناعي · ENSIA · الجزائر',
    talkButton: 'تحدث مع AI ريان',
    talkButtonShort: 'AI ريان',

    // Loading
    loadingSubtitle: 'الدخول إلى الكون الرقمي...',

    // Hero
    heroTagline: 'هندسة الذكاء الاصطناعي والبرمجيات · ENSIA · الجزائر',
    heroSub: 'تعلم الآلة · Full-Stack · الأمن السيبراني · +12 مشروع',
    orbHint: '✦ انقر على الكرات للاستكشاف ✦',

    // Stats
    statProjects: 'مشاريع',
    statInternships: 'تدريبات',
    statYear: 'السنة @ ENSIA',

    // Orbs
    orbProjects: 'المشاريع',
    orbExperience: 'الخبرة',
    orbSkills: 'المهارات',
    orbEducation: 'التعليم',
    orbContact: 'التواصل',

    // Projects Panel
    projectsTitle: 'المشاريع',
    projectsSub: '+14 مشروع في الذكاء الاصطناعي والأمن والويب',
    projectFeatured: 'مميز',
    projectDescriptions: [
      'مصنف آفات جلدية إنتاجي مع قابلية التفسير Grad-CAM، معايرة درجة الحرارة (ECE 0.030)، وتحديد عدم اليقين MC Dropout. EfficientNet-B0 على ISIC 2019 — 7 فئات، 22K صورة.',
      'إضافة Chrome Manifest V3 مع 11 طبقة أمان للكشف عن التصيد الاحتيالي في Gmail. Gemini API لتحليل المحتوى بالذكاء الاصطناعي + التحقق من مصادقة البريد DMARC/DKIM.',
      'خط أنابيب ML لتصنيف حركة DNS (نفق مقابل شرعي) على 250,000 سجل. Random Forest وXGBoost والانحدار اللوجستي مع منحنيات ROC وتحليل أهمية الميزات.',
      'نماذج تنبؤ وتصنيف لتحدي Kaggle للسلاسل الزمنية متعددة المتغيرات. تحقيق دقة 0.96 عبر هندسة الميزات واختيار النماذج.',
      'نظام توصيل متعدد الطائرات المسيّرة يحسّن المسارات والسرعات والارتفاعات. مقارنة MILP مع مستعمرة النمل والخوارزميات الجينية والتبريد التدريجي.',
      'سوق يربط الطهاة المنزليين بالعملاء المحليين. نشر القوائم والطلبات في الوقت الحقيقي عبر Supabase + Firebase Firestore.',
      'منصة متكاملة لاستخراج البيانات المنظمة من +12,000 سجل عارض باستخدام Google Cloud Vision + Claude AI. بُنيت كقائد فريق في Temacina.',
      'تطبيق ويب لإدارة عيادة الأسنان شاملاً المرضى والمواعيد والسجلات. يُبسّط الجدولة وإدارة بيانات المرضى.',
      'جمع مجموعة بيانات سلوكية وتدريب ومقارنة نماذج ML للتنبؤ بموقع الألم وشدته. تقييم المصنفات والمنحدرات.',
      '14 موقع ويب front-end صُمِّمت وبُنيت تغطي تخطيطات متجاوبة ومكونات واجهة المستخدم والميزات التفاعلية.',
    ],
    projectTaglines: [
      'ذكاء اصطناعي طبي · AUC-ROC 0.9630',
      'ذكاء اصطناعي · الأمن السيبراني · إضافة Chrome',
      'ML · أمن الشبكات · 250K بيانات',
      'Kaggle · سلاسل زمنية · دقة 0.96',
      'تحسين · ميتاهيوريستيك',
      'تطبيق موبايل متكامل · Flutter',
      'NLP · هندسة البيانات · +12K سجل',
      'Full-Stack · عيادة الأسنان',
      'ML · الرعاية الصحية · تصنيف وانحدار',
      'UI/UX · 14 موقع',
    ],

    // Experience Panel
    experienceTitle: 'الخبرة',
    experienceSub: '3 تدريبات · عضو لجنة تحكيم · قائد فريق · ذكاء اصطناعي وبيانات',
    experienceBullets: [
      [
        'قيادة فريق من 5 أشخاص لبناء منصة متكاملة لاستخراج بيانات OCR و NLP',
        'استخراج بيانات منظمة من +12,000 سجل عارض باستخدام Google Cloud Vision + Claude AI',
        'تسليم لوحة تحليلات — خلفية Django، واجهة Vue.js',
        'إدارة التخطيط للسبرينت وتفويض المهام ومراجعة الكود للفريق',
      ],
      [
        'تطبيق التصنيف والتجميع وكشف الشذوذات وقواعد الارتباط على بيانات الموارد البشرية',
        'بناء نماذج للتنبؤ بقبول المرشحين وتعيين الأقسام بذكاء',
        'مقارنة SVM وRandom Forests وأشجار القرار وGradient Boosting',
      ],
      [
        'المساهمة في تصميم معمارية شبكة الخدمات المتعددة',
        'خبرة عملية في صيانة نواة الشبكة والبنية التحتية للاتصالات',
      ],
      [
        'عضو لجنة تحكيم في مسار تطوير تطبيقات الموبايل',
        'تقييم مشاريع الطلاب على الجدارة التقنية والابتكار وجودة تجربة المستخدم',
      ],
    ],
    experienceEducationDesc: 'المدرسة الوطنية العليا للذكاء الاصطناعي — أفضل مدرسة ذكاء اصطناعي في الجزائر. المقررات: ML، التعلم العميق، تنقيب البيانات، السلاسل الزمنية، بحث العمليات، أمن الشبكات، قواعد البيانات.',

    // Skills Panel
    skillsTitle: 'المهارات',
    skillsSub: '+50 تقنية في 5 مجالات',
    skillsAlsoIncludes: 'يشمل أيضاً',
    langNative: 'لغة أم',
    langFluent: 'طلاقة',
    softSkills: ['قيادة الفريق', 'Agile/Scrum', 'سريع التعلم', 'التوثيق التقني'],

    // Education Panel
    educationTitle: 'التعليم',
    educationSub: 'السنة الرابعة · التخرج المتوقع 2027',
    educationSchoolDesc: 'أفضل مدرسة للذكاء الاصطناعي في الجزائر. طالب في السنة الرابعة يعمل عند تقاطع تعلم الآلة والأنظمة وحل المشكلات الإبداعية.',
    educationBac: 'البكالوريا · علوم · مرتبة الشرف: ممتاز',
    educationCoursework: 'المقررات الدراسية',
    educationCerts: 'الشهادات والجوائز',

    // Contact Panel
    contactTitle: 'التواصل',
    contactSub: 'مفتوح للفرص والبحث والتعاون',
    contactCTA: 'لنبني شيئاً استثنائياً',
    contactCTADesc: 'طالب ذكاء اصطناعي في السنة الرابعة بـ ENSIA، متمكن من ML وFull-Stack والأمن السيبراني. سريع التعلم، قائد فريق، منشئ مشاريع حقيقية.',
    contactCTAButton: '← قل مرحباً',
    contactEmailDesc: 'للفرص والتعاون',
    contactGithubDesc: '+12 مشروع عام',
    contactHFDesc: 'عرض DermAI التجريبي + النماذج',
    contactLocationDesc: 'متاح للعمل عن بُعد عالمياً',

    // Chat
    chatOnline: 'متصل',
    chatThinking: 'يفكر...',
    chatPlaceholder: 'اسألني أي شيء...',
    chatWatermark: 'إجابات من سياق موثق فقط ·',
    chatEmailRayane: 'راسل ريان',
    chatIntro: 'مرحباً! أنا AI ريان 👋 أنا النسخة الرقمية من ريان توامي — طالب ذكاء اصطناعي في ENSIA، مهندس ML، وصانع أكثر من اثني عشر مشروعاً. اسألني أي شيء!',
    chatSuggestions: [
      'أخبرني عن DermAI',
      'ما هي أقوى مهاراتك؟',
      'اشرح لي تجارب التدريب',
      'ماذا تعمل الآن؟',
      'كيف تعلمت ML؟',
    ],
  },
} satisfies Record<string, Record<string, unknown>>

export type T = typeof translations.en
export type TKey = keyof T
