# Plan d’amélioration — Adlene_Site


## État du projet


Site statique HTML/CSS/JavaScript basé sur un thème Colorlib, avec feuilles Sass et quelques points d’entrée PHP. La structure actuelle est conservée. Le formulaire était incomplet : les champs ne portaient pas les noms attendus par `sendmail.php`. La rubrique « Expériences professionnelles » contient déjà une chronologie HTML détaillée ; le bloc `TimeLine` séparé affichait une image agrandie en popup.


## Étapes réalisées


- [x] Examiner les fichiers, les pages principales, les ressources et les fonctions existantes.
- [x] Corriger le formulaire de contact dans `index.html` : champs nommés, types adaptés, libellés accessibles, champs requis et limites de saisie.
- [x] Remplacer `sendmail.php` par un traitement serveur avec validation, protection contre l’injection d’en-têtes, filtre anti-robots simple et messages de retour.
- [x] Configurer l’envoi vers `adlene@benabbess.com` et permettre une réponse directe au correspondant via `Reply-To`.
- [x] Remplacer la popup de la timeline-image par un lien vers la chronologie HTML déjà présente dans « Expériences professionnelles ».
- [x] Ajouter une règle Apache `.htaccess` de redirection HTTP vers HTTPS.


## Étapes restantes pour la mise en production


- [ ] Activer un certificat TLS valide pour le domaine chez l’hébergeur avant d’activer la redirection HTTPS.
- [ ] Vérifier que l’hébergement utilise Apache avec `mod_rewrite` (ou adapter la redirection si le serveur est Nginx ou géré par une plateforme).
- [ ] Vérifier que PHP est activé et que `mail()` est autorisé. Si l’hébergeur ne fournit pas de relais mail, configurer un SMTP authentifié côté serveur.
- [ ] Après déploiement, effectuer un envoi réel depuis le formulaire et vérifier la réception, les indésirables et l’adresse de réponse.
- [ ] Vérifier le parcours HTTPS, les liens et l’affichage mobile sur le domaine public.


## Autres améliorations proposées


- [ ] Optimiser les images volumineuses (notamment les variantes `Timeline*.PNG`) et utiliser des formats WebP/AVIF avec dimensions adaptées.
- [ ] Ajouter des métadonnées SEO cohérentes (description, aperçu social, titre précis) et un favicon unique.
- [ ] Corriger les liens factices (`href="#"`), les URL anciennes en HTTP et les liens externes qui ne pointent plus vers des pages valides.
- [ ] Améliorer l’accessibilité : ordre des titres, textes alternatifs descriptifs, contraste et navigation clavier.
- [ ] Réduire les fichiers et dépendances inutilisés, puis documenter une procédure simple de publication et de sauvegarde.
- [ ] Ajouter une page de confidentialité si le site collecte des informations personnelles via le formulaire.


## Limites connues


La redirection HTTPS ne peut fonctionner que si le certificat est déjà actif et si le serveur applique `.htaccess`. Le code PHP utilise la fonction standard `mail()` : la livraison réelle dépend de la configuration mail de l’hébergeur. Ces deux points nécessitent les informations et accès du compte d’hébergement, puis une vérification sur le domaine public.


## Correctif de rendu


- [x] Restaurer la structure HTML de la section Centres d'interets; son balisage manquant affectait l'affichage des sections suivantes.


- [x] Restaurer l'apercu de la timeline dans une popup, avec fermeture par clic exterieur, bouton Fermer et touche Echap.

## Déploiement continu avec Netlify

- [x] Relier le dépôt GitHub `adlene2bis/adlene-site` au projet Netlify `quirky-colden-0f9691`, sur la branche `main`.
- [x] Configurer la publication depuis la racine du dépôt (`.`) et le dossier de fonctions `netlify/functions`.
- [x] Effectuer le premier déploiement de production : Netlify indique que le site est publié depuis GitHub.
- [x] Vérifier que `/api/genial-counter` répond avec le compteur (`count`) et l’état du visiteur (`voted`).
- [ ] Vérifier l’incrémentation après un clic réel et la cohérence du compteur entre plusieurs navigateurs.
- [ ] Remplacer le traitement PHP du formulaire par une fonction compatible avec Netlify et un relais SMTP, puis vérifier la réception des messages.
- [ ] Vérifier HTTPS, les liens et l’affichage mobile sur le domaine public.
