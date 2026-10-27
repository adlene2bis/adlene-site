# Plan d’amélioration — Adlene_Site

## État du projet

Site statique HTML/CSS/JavaScript basé sur un thème Colorlib, avec feuilles Sass et quelques points d’entrée PHP. La structure actuelle est conservée. Le formulaire était incomplet : les champs ne portaient pas les noms attendus par `sendmail.php`. La rubrique « Expériences professionnelles » contient déjà une chronologie HTML détaillée ; le bloc `TimeLine` séparé affichait une image agrandie en popup.

## Étapes réalisées

- [x] Examiner les fichiers, les pages principales, les ressources et les fonctions existantes.
- [x] Corriger le formulaire de contact dans `index.html` : champs nommés, types adaptés, libellés accessibles, champs requis et limites de saisie.
- [x] Remplacer `sendmail.php` par un traitement serveur avec validation, protection contre l’injection d’en-têtes, filtre anti-robots simple et messages de retour.
- [x] Configurer l’envoi vers `adlene@benabbess.com` et permettre une réponse directe au correspondant via `Reply-To`.
- [x] Remplacer l’aperçu statique de « Time Line » par une frise HTML responsive, filtrable par période, avec les 14 expériences et les deux missions CAPGEMINI / BNP.
- [x] Prévisualiser et valider la frise sur ordinateur et mobile (validation d’Adlene).
- [x] Ajouter une règle Apache `.htaccess` de redirection HTTP vers HTTPS.
- [x] Configurer et valider dans Netlify Forms une notification e-mail du formulaire contact vers adlene@benabbess.com.

## Étapes restantes pour la mise en production

- [ ] Activer un certificat TLS valide pour le domaine chez l’hébergeur avant d’activer la redirection HTTPS.
- [ ] Vérifier que l’hébergement utilise Apache avec `mod_rewrite` (ou adapter la redirection si le serveur est Nginx ou géré par une plateforme).
- [ ] Vérifier que PHP est activé et que `mail()` est autorisé. Si l’hébergeur ne fournit pas de relais mail, configurer un SMTP authentifié côté serveur.
- [ ] Après déploiement, effectuer un envoi réel depuis le formulaire et vérifier la réception, les indésirables et l’adresse de réponse.
- [ ] Vérifier le parcours HTTPS, les liens et l’affichage mobile sur le domaine public.

## Autres améliorations proposées

- [x] Alléger l’aperçu `images/Timeline.jpeg` : largeur ramenée de 2 949 à 1 800 px, JPEG progressif optimisé, taille réduite d’environ 48 % (626 596 à 327 012 octets). Le PNG haute résolution reste utilisé à l’ouverture en grand.
- [x] Alléger les images les plus lourdes utilisées par les pages : variantes WebP pour les fonds, les visuels de projets et les aperçus; conserver les originaux derrière les liens d’agrandissement. Économie mesurée : environ 7,85 Mo sur les ressources de page uniques, plus 3,80 Mo sur l’image de partage social. Les originaux sont conservés.
- [x] Différer le chargement des images hors écran et compléter les textes alternatifs manquants sur les pages Loisirs et Compétences.
- [x] Ajouter des métadonnées SEO cohérentes (titres, descriptions, URL canonique et aperçu social) aux pages principales.
- [x] Corriger les liens incomplets ou anciens : ancres internes réelles, boutons fonctionnels conservés, suppression des liens statistiques factices, navigation des pages secondaires vers les sections de l’accueil et remplacement des URL obsolètes/HTTP.
- [x] Corriger les principaux problèmes d’accessibilité sans refaire le design : lien d’évitement, focus visible, noms accessibles, textes alternatifs et structure des titres.
- [ ] Vérifier manuellement au clavier et avec un lecteur d’écran dans un navigateur autorisé; compléter le contrôle du contraste.
- [ ] Réduire les fichiers et dépendances inutilisés, puis documenter une procédure simple de publication et de sauvegarde.
- [x] Ajouter une page de confidentialité accessible depuis le formulaire, avec les données utilisées, leur finalité, les destinataires, la conservation et les droits.
- [ ] Appliquer la suppression manuelle des soumissions Netlify et des copies e-mail au plus tard 12 mois après le dernier échange; Netlify ne le fait pas automatiquement.

## Limites connues

La redirection HTTPS ne peut fonctionner que si le certificat est déjà actif et si le serveur applique `.htaccess`. Le code PHP utilise la fonction standard `mail()` : la livraison réelle dépend de la configuration mail de l’hébergeur. Ces deux points nécessitent les informations et accès du compte d’hébergement, puis une vérification sur le domaine public.

## Évolutions demandées
- [x] Ajouter SAP Analytics Cloud (SAC), SAP Business Data Cloud (BDC) et SAP Business AI à Data Science sur Competences.html.
- [x] Remonter le nuage vers le haut de la zone de contenu en s’appuyant sur le décalage observé dans la capture locale.
- [x] Homogénéiser les six rubriques en deux rangées de trois colonnes égales sur grand écran, élargir la zone de contenu et garder « Connaissances théoriques » de FrameWork sur une ligne; condenser les descriptions AI.
- [x] Uniformiser l’interligne AI avec les autres listes et garder chaque élément Framework, y compris « Arcan / Magic Load (ETL maison de Boygues telecom) », sur une seule ligne.
- [x] Aligner Méthodologie, Web et AI en deuxième rangée, sans changer la colonne de Web; ovaliser le nuage de mots et varier les styles.
- [x] Ajouter en haut de Competences.html un nuage de mots responsive reprenant les principales technologies et outils du site.
- [x] Créer une rubrique AI : Intelligence Artificielle avec IA générative, agents, n8n, Skills, MCP, optimisation, adaptation, évaluation des modèles et Vibe coding.

- [x] Harmoniser la typographie des sous-titres Mission 1 et Mission 2 avec les titres de la chronologie professionnelle.
- [x] Corriger le début de la mission 2 CAPGEMINI / BNP à 10/2025.
- [x] Ajouter en tête de la chronologie l’expérience CAPGEMINI / BNP Nantes, avec ses deux missions et leurs dates.
- [x] Mettre à jour le libellé ETL en « ETL(TALEND/BO) » dans Mes compétences.
- [x] Ajouter SAP : SAC/BDC/SBAI dans Mes compétences avec une barre grise à 80 %.

## Correctif de rendu

- [x] Restaurer la structure HTML de la section Centres d'interets; son balisage manquant affectait l'affichage des sections suivantes.

- [x] Restaurer l'apercu de la timeline dans une popup, avec fermeture par clic exterieur, bouton Fermer et touche Echap.

- [x] Faire revenir au bloc d'accueil au clic sur le QR code agrandi dans le popup.
- [x] Ajouter le coeur et le compteur global, alimente par le serveur.


## Compteur global de coeurs

- [x] Remplacer le stockage local par un endpoint PHP partage avec stockage serveur protege et deduplication par cookie anonyme.
- [ ] Deployer sur un hebergement PHP et verifier que le dossier data/ est inscriptible par PHP.
- [ ] Verifier en production que les visiteurs voient le meme total et qu'un second clic depuis le meme navigateur ne l'augmente pas.

Le cookie anonyme permet une contribution unique par navigateur. Un visiteur peut recommencer apres suppression de son cookie ou avec un autre navigateur/appareil.

- [x] Ajouter un compteur d'aperçu local qui s'incrémente dans file://; le total global reste géré par l'endpoint PHP après publication.


## Deploiement du compteur global

- [x] Ajouter une fonction Netlify avec stockage Blobs persistant et ecriture conditionnelle pour eviter les pertes de votes concurrents.
- [x] Faire pointer le site sur /api/genial-counter et conserver une route equivalente pour Apache/PHP.
- [ ] Redployer le site avec la fonction Netlify et la dependance @netlify/blobs.
- [ ] Verifier le total sur plusieurs navigateurs apres publication.

## Liaison à Netlify

- [x] Vérifier que le projet Netlify `quirky-colden-0f9691` est accessible et que le dépôt cible `adlene2bis/adlene-site` apparaît dans le compte GitHub connecté.
- [x] Relier le projet Netlify à `adlene2bis/adlene-site` sur la branche `main`; Netlify indique maintenant « Deploys from GitHub ».
- [x] Configurer la publication à la racine (`.`) avec le répertoire de fonctions `netlify/functions`, puis vérifier que le premier déploiement est publié.
- [x] Vérifier que la route publiée `/api/genial-counter` répond et renvoie le compteur global (`count`) ainsi que l’état du visiteur (`voted`).
- [ ] Vérifier l’incrémentation après un clic réel et la cohérence du total entre plusieurs navigateurs.

## Publication corrigée sur Netlify

- [x] Publier `index.html` avec le libellé « ETL(TALEND/BO) » et la barre SAP à 80 %.
- [x] Publier la feuille de style au chemin attendu `css/style.css` afin que les ajustements de grille, d’interligne et de largeur de FrameWork s’appliquent réellement.
- [x] Vérifier le déploiement de production et le contenu des pages publiées.

- [x] Corriger la structure HTML de Competences.html pour garder le pied du menu dans la barre latérale et supprimer le grand espace au-dessus du nuage.

## Formulaire de contact Netlify

- [x] Identifier la cause du 404 : le formulaire de l’accueil envoyait les visiteurs vers `sendmail.php`, que l’hébergement statique Netlify n’exécute pas.
- [x] Raccorder le formulaire à Netlify Forms (`name="contact"`, `data-netlify="true"`, champ `form-name` et honeypot) et définir le retour vers la section Contact.
- [x] Publier `index.html`, `Competences.html` et `css/style.css` dans leurs emplacements GitHub corrects; Netlify a publié le commit `710dc9f`.
- [x] Soumettre un test depuis le site publié : le formulaire revient sur `/#contact` sans page 404.
- [x] Afficher un retour de confirmation au visiteur après le retour Netlify `?contact=success`.
- [x] Ajouter id `contact` et vérifier la confirmation dans la section Contact (déploiement `0fa639a`).
- [x] Confirmer que le formulaire de production est bien reconnu par Netlify Forms : les soumissions « contact » apparaissent dans les Verified submissions.
- [x] Configurer/vérifier dans le bon projet Netlify une notification **Email notification** pour `adlene@benabbess.com`, puis vérifier sa réception. Ce réglage est dans Netlify (Forms > Submission notifications) et n'est pas piloté par le HTML.
- [x] Confirmer avec Adlene que l'e-mail de test arrive bien dans la boîte de réception.

### Diagnostic notification e-mail (25/10/2026)

- Le formulaire en production reçoit les messages : une soumission récente apparaît dans Netlify Forms. Le formulaire publié expose `method=post`, les champs `form-name`, `name`, `email`, `subject`, `message` et le honeypot ; Netlify retire les attributs `data-netlify` de la page publiée après détection, ce qui est normal.
- La confirmation affichée par le site indique le retour après acceptation de la soumission ; elle ne prouve pas qu'une notification e-mail a été configurée ou livrée.
- Aucun code d'envoi d'e-mail n'a été modifié ou supprimé dans `index.html` pour les notifications Netlify : leur destinataire et leur activation se règlent dans le tableau de bord du site.
- Lors du premier contrôle, la session Netlify ouverte n'affichait aucun projet et refusait la page Forms. Adlene a ensuite confirmé que la notification e-mail fonctionne et arrive bien dans sa boîte.
- Aucun changement de code ni déploiement artificiel n'est appliqué pour la notification : sans accès au réglage du projet ou à un fournisseur d'e-mail et ses identifiants, un changement HTML ne peut pas faire arriver les messages dans la boîte de réception.


## Correction des liens (25/10/2026)

- Formation : le lien IGR-IAE Rennes pointe maintenant vers `https://www.igr.univ-rennes.fr/fr/`.
- Centres d’intérêts : Linux pointe vers `https://www.lemondeinformatique.fr/linux-101.html`; Salt pointe vers `https://saltproject.io/`.
- Botanique : remplacement de l’ancienne URL HTTP inaccessible par la page HTTPS actuelle `https://plantes-sauvages.com/`.
- Les titres d’expériences et étiquettes statiques ne sont plus de faux liens; le compteur, le menu, les accordéons et « Plus » gardent leurs actions et leurs cibles. Les icônes sociales sans profil connu ont été retirées; LinkedIn mène au profil déjà référencé sur le site.
- Les trois destinations demandées et la page botanique HTTPS ont été ouvertes et vérifiées. Certains serveurs externes (École Centrale de Nantes, LS2N et LinkedIn) n’ont pas pu être contrôlés automatiquement (délai, refus ou cache); leur inaccessibilité depuis l’outil ne suffit pas à les déclarer cassés.


## Accessibilité (25/10/2026)

- Navigation clavier : ajout d’un lien « Aller au contenu principal » sur les trois pages, rendu visible au focus; ajout d’un contour de focus contrasté sur les commandes interactives.
- Menu mobile : nom accessible explicite et état `aria-expanded` mis à jour à l’ouverture, à la fermeture, au clic extérieur et au défilement.
- Popup QR : dialogue annoncé comme ouvert/fermé, commande de retour à l’accueil activable au clavier, fermeture par Échap, focus placé dans la popup puis rendu à son déclencheur; tabulation contenue dans la popup.
- Images : remplacement des textes alternatifs génériques/manquants par des descriptions adaptées; image LinkedIn décorative car son lien porte déjà son nom accessible; portrait de la barre latérale exposé comme image. Aucun élément image informatif n’est dépourvu d’attribut `alt`; l’image vide de la popup reste masquée jusqu’à son ouverture.
- Titres et balisage : langue française déclarée; niveaux des titres d’accordéon alignés avec la section; titres vides remplacés par des espacements non sémantiques; correction d’un titre imbriqué invalide et de la galerie de loisirs; suppression d’un lien Matrix vide.
- Barres de compétences : chaque indicateur de progression possède un nom accessible associé à la compétence et à sa valeur.
- Contraste : conservation de la palette existante; le contour de focus bleu foncé est ajouté sur fond blanc pour bien distinguer l’élément actif.
- Contrôle effectué : revue statique du HTML, des attributs ARIA et des gestionnaires clavier; toutes les ancres locales des trois pages ont une cible et aucun saut de niveau n’a été relevé dans l’ordre des titres. La page locale `file://` n’a pas pu être inspectée par l’outil navigateur (protocole bloqué); la vérification visuelle avec lecteur d’écran, la navigation réelle au clavier et les contrastes restent à faire.


## Page de confidentialité (25/10/2026)

- Création de `confidentialite.html`, avec un lien visible sous le formulaire de contact et un retour direct vers ce formulaire.
- La notice décrit les champs nom/e-mail/objet/message, l’usage pour répondre, Netlify Forms et la notification vers `adlene@benabbess.com`. Elle mentionne aussi le cookie du compteur (un an), l’identifiant haché de déduplication et le chargement des polices Google Fonts.
- Délai annoncé : suppression des demandes et copies e-mail au plus tard 12 mois après le dernier échange, sauf obligation légale ou litige. La suppression doit être faite manuellement dans Netlify et la messagerie; cette routine reste à appliquer.
- Les transferts potentiels de Netlify hors du pays de collecte, les droits et la possibilité de saisir la CNIL sont indiqués.
- Vérification réalisée : les données décrites correspondent au formulaire, à la notification confirmée, au cookie/fonction du compteur et aux ressources externes présentes dans le code. Aucun déploiement n’a été effectué.


## Centres d’intérêts : filtres par thème (26/10/2026)

- [x] Remplacer les anciennes catégories « Graphic Design » et « Web Design » par « Software / Info », « Apps / AI », « Sciences / technique » et « Histoire / Art ».
- [x] Rendre les catégories interactives : « Tout » est sélectionné par défaut; les filtres masquent les autres cartes et annoncent le nombre de résultats.
- [x] Répartir Linux et les méthodes agiles dans Software / Info; Saltstack et l’IA dans Apps / AI; les fractales et la botanique dans Sciences / technique; l’histoire et la playlist Nostalgie dans Histoire / Art.
- [x] Réunir la carte IA dans la grille principale afin qu’elle soit visible avec l’affichage « Tout ».
- [x] Ajouter la carte « Musique : playlist Nostalgie », avec `images/playliste.png` et un lien direct vers la playlist Spotify fournie.
- [ ] Ajouter une carte n8n dès réception de la photo souhaitée par Adlene; destination prévue : [n8n.io](https://n8n.io/).


## Galerie Passion pêche (26/10/2026)

- [x] Remplacer l’ancienne disposition par une grande photo panoramique du coucher du soleil (`Peche1.jpg`) au-dessus d’une grille de six photos (`Peche2.jpg` à `Peche7.jpg`).
- [x] Afficher trois colonnes et deux lignes sur grand écran, puis adapter la grille aux écrans plus étroits.
- [x] Garder l’ouverture de chaque photo en pleine taille et ajouter des textes alternatifs descriptifs, un focus clavier visible et un zoom léger au survol.


## Galeries photo et natation (26/10/2026)

- [x] Créer `blog-capture.html` : l’image HEIC reçue sous le nom `img1.jpg` a été convertie localement en `img1-panorama.jpg` pour les navigateurs; `img2.jpg` à `img13.jpg` forment une grille de 3 colonnes et 4 lignes.
- [x] Créer `blog-nage.html` : `nag1.jpg` en panoramique, puis les trois photos de natation dans une grille de 3 colonnes et une ligne. Les fichiers fournis sont `nag2.png`, `nag3.png` et `nag4.png`; les extensions réelles sont conservées.
- [x] Relier l’activité « CAPTURE DE L’INSTANT » à `blog-capture.html` et « L’AME NAGEUSE » à `blog-nage.html` depuis la page d’accueil.


## Diaporama de la section Accueil (27/10/2026)

- [x] Afficher les neuf phrases progressivement en conservant toutes les phrases déjà apparues; l’image associée change à chaque étape dans une zone de taille fixe.
- [x] Utiliser les neuf images indiquées : cerveau, Big Data, illustration « Ne sois pas jaloux », Data Tech-lead, Data Engineer, Data Architect, Data Infrastructure Expert et Java/BI.
- [x] Adapter la disposition sur mobile; ajouter les commandes pour choisir une étape ou mettre le défilement en pause.
- [x] Afficher chaque image en entier dans le même cadre (`object-fit: contain`), sans recadrage.
- [x] Harmoniser le fond du diaporama avec la page (blanc) et agrandir l’espace d’image à côté du texte.
- [x] Agrandir encore la zone d’image : elle occupe maintenant les trois quarts de la grille sur grand écran et presque toute la hauteur disponible, tout en gardant l’image entière.
- [x] Agrandir encore le cadre des images et placer une icône LinkedIn cliquable sous le QR code « SCAN ME » dans la barre latérale.
- [x] Remplacer l’icône LinkedIn par `images/IN.png` en noir et blanc; reformater les neuf étapes d’accueil avec des phrases plus grandes, non grasses, et des puces pour les rôles; rééquilibrer la largeur du texte et placer les images à droite pour faciliter la lecture sur une ligne.
- [x] Renommer le titre de la présentation « Plus en détails » et réduire l’espace entre l’accueil et cette section en ajustant la hauteur d’accueil et le padding supérieur.
- [x] Réduire la hauteur du cadre image à environ un tiers de la fenêtre, retirer la hauteur minimale plein écran de l’accueil et corriger le padding de présentation après les règles du thème pour qu’elle remonte effectivement.
- [x] Forcer la phrase finale sur deux lignes; appliquer un zoom ×1,5 aux images; décaler le début du bloc Accueil vers la hauteur du nom dans la barre latérale.
- [x] Désactiver le zoom pour les images des étapes 6 à 9 afin de les montrer sans rognage; déplacer le logo LinkedIn au-dessus du nom dans la barre latérale.

## Formations Databricks et SAP (27/10/2026)

- [x] Ajouter en tête de la rubrique Formation le parcours Databricks à distance : Lakehouse, Spark, Unity Catalog, IA générative, prompts, RAG, agents, évaluation, gouvernance et LLMOps, illustré par `images/databricks.jpg`.
- [x] Ajouter le parcours SAP SAC / BDC / Business AI avec une synthèse des thèmes clés, les visuels `images/sac.jpg`, `images/bdc.png`, `images/BAI.jpg` et le lien du Campus Serge Kampf Les Fontaines.
- [x] Remplacer la mention « par ordre chronologique » par « formation initiale et formations continues »; dates ajoutées après confirmation : Databricks (2025), SAP (2026).
- [x] Formation SAP : organisme renommé « SAP/Capgemini »; visuels SAC, BDC et BAI agrandis à la même largeur de colonne que l’image Databricks et placés chacun à côté de leur descriptif.
- [x] Placer la formation SAP avant Databricks dans l’accordéon Formation.

## Menu latéral (27/10/2026)

- [x] Mettre à jour la rubrique active dès le clic puis à la fin du défilement animé; les rubriques sélectionnées deviennent bleues comme les autres entrées du menu.
