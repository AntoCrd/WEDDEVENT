# Wedd Event Visual — site vitrine

Site statique (HTML / CSS / JS vanilla) pour Wedd Event Visual, agence
événementielle en Maine-et-Loire.

## Pages

- `index.html` — page d'accueil générale (Mariage + Événement pro).
- `mariage.html` — page dédiée à l'univers Mariage (hero, prestations,
  storytelling, forfaits Silver/Gold/Diamond/Sur Mesure, témoignages,
  process, partenaires, FAQ, RDV conseil).

## Lancer le projet en local

Aucune dépendance à installer. Depuis la racine du projet :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000/index.html` ou
`http://localhost:8000/mariage.html`.

## Structure

```
index.html
mariage.html
css/
  style.css      — design system partagé (tokens, header, boutons, hero,
                    marquee, sections, cartes, footer, curseur personnalisé)
  mariage.css    — composants propres à la page Mariage (grille inversée,
                    scroll-bend, forfaits, carousel, FAQ, CTA final)
js/
  main.js        — mécaniques partagées (nav mobile, reveal au scroll,
                    compteurs, aperçu image au survol, header sticky)
  mariage.js     — Lenis (smooth scroll), GSAP ScrollTrigger (effet de
                    courbure des images), accordéon FAQ, carousel avis
```

## Où modifier le contenu

- **Textes** : directement dans `index.html` / `mariage.html`, section par
  section (chaque section est commentée, ex. `<!-- ============ FORFAITS ============ -->`).
- **Photos** : chaque `<img>` pointe pour l'instant vers des photos
  Unsplash de démonstration — à remplacer par vos visuels (mêmes
  proportions recommandées : 4/5 pour les portraits, 4/3 pour les
  paysages, 16/9 pour les fonds plein cadre).
- **Forfaits** (`mariage.html`, section "Nos formules") : chaque carte
  `.pricing-card` contient un nom, une accroche et une liste `<ul>` — à
  éditer librement, dans l'ordre voulu.
- **Avis clients** : dans les blocs `.testimonial-card` (accueil) et
  `.carousel-slide` (page Mariage) — remplacer le texte entre guillemets
  et le nom en pied de citation.
- **FAQ** : chaque `.faq-item` contient une question (`.faq-question`) et
  une réponse (`.faq-answer-inner p`) — dupliquer un bloc pour en ajouter.
- **Couleurs / typographies** : tout se pilote depuis les variables CSS en
  haut de `css/style.css` (bloc `:root`) — palette noir & blanc avec un
  accent beige (`--accent`).

## Formulaire de contact

Le formulaire (`#contact-form`) valide les champs côté front et affiche
un message de confirmation, mais n'envoie rien pour l'instant — à
brancher sur un `mailto:`, un service comme Formspree, ou une API dédiée
dans `js/main.js` (fonction `contactForm.addEventListener('submit', ...)`).

## Accessibilité & performance

- Respect de `prefers-reduced-motion` (désactive le smooth scroll Lenis,
  les animations GSAP et les animations CSS).
- Navigation clavier complète (focus visible, lien d'évitement).
- Images en `loading` natif du navigateur — pensez à ajouter
  `loading="lazy"` sur les images sous la ligne de flottaison une fois
  vos vrais visuels en place.
