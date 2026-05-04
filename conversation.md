# Conversation — projet `jeu`

Log des échanges liés au dossier `C:\Users\jccrespo\Documents\Claude code et codex\jeu`.
Mis à jour automatiquement à chaque modification de fichier dans ce dossier.

---

## Session 2026-04-22

### 1. Création du dossier
**User** : créer un nouveau dossier dans `C:\Users\jccrespo\Documents\Claude code et codex` (appel le jeu)
**Assistant** : Dossier `jeu` créé.

### 2. Demande initiale — jeu narratif adulte explicite
**User** : Demande d'un jeu narratif interactif (HTML/CSS/JS) avec thèmes NTR, gangbang, humiliation, soumission, contenu sexuel explicite, corruption mentale progressive, etc.
**Assistant** : Refus de produire le contenu sexuel explicite centré sur humiliation/dégradation. Proposition d'alternative : visual novel psychologique adulte, sombre, suggestif mais non-explicite, avec mêmes mécaniques de stats, corruption, multiples fins, etc.

### 3. Abandon du jeu narratif
**User** : « si tu ne fais pas de scene hot ce n'est pas la peine »
**Assistant** : OK, pas de jeu narratif. Attente de nouvelle demande.

### 4. Nouvelle demande — Survivors gothique
**User** : Mini-jeu HTML/CSS/JS complet, inspiré de Vampire Survivors, direction artistique Underworld (vampires/lycans/hybrides).
Cahier des charges détaillé :
- Boucle courte et addictive, montée en puissance visible
- Contrôles ZQSD/WASD/flèches + joystick mobile + dash
- 3 personnages (Deathborne, Selene Noire, Hybride Renégat)
- 5 familles d'ennemis (traqueurs, brutes, tireurs, hybrides, ombres)
- 6 armes (pistolets, lames orbitantes, onde, sceau, rayon, éclats)
- Évolutions d'armes (Arsenal du Crépuscule, Danse des Ténèbres, Marée Hématite, Lance d'Abysse, Cercle Profane)
- Passives (dégâts, crit, zone, cadence, régen, armure, vol de vie...)
- Mécanique signature : Soif de Sang (jauge → mode berserker)
- Dash avec i-frames
- Boss cycliques (Alpha Lycan, Matriarche, Seigneur Nocturne)
- UI dark, typographie Cinzel, HUD stylé, écran titre, sélection perso, game over
- localStorage pour meilleur score
- Audio WebAudio synthétisé (musique + SFX)
- Un seul fichier HTML

**Assistant** : Fichier créé → `nocturne.html`
- Canvas 2D avec DPR, screen shake, flash, slow-mo, particules, floating damage
- Monde à grille gothique + pluie + étoiles, caméra qui suit
- 6 armes + 5 évolutions fonctionnelles (recettes dans `EVO_RECIPES`)
- 3 bosses avec patterns distincts (charge, summons, téléport)
- 14 passifs
- Joystick virtuel bottom-left + bouton dash mobile
- HUD complet (HP, XP, Soif de Sang, timer, kills, palier, loadout, dash, boss bar)
- Bannières d'événement, pause (touche P ou bouton), mute (M)
- Sauvegarde : meilleur score, temps, niveau, kills, total kills, perso préféré, mute

### 5. Demande — sauvegarde conversation
**User** : « sauvegarde également [notre] conversation chaque fois que tu fais des modifications »
**Assistant** : OK. Ce fichier `conversation.md` sera mis à jour à chaque modif future dans le dossier `jeu`. Préférence enregistrée en mémoire durable.

### 6. Itération v2 — sprites, pacing, dopamine
**User** : Demande majeure de polish :
1. Remplacer les formes basiques par de vrais sprites canvas composites (joueur + 5 ennemis + 3 bosses)
2. Accélérer fortement la progression XP (niveaux plus fréquents, surtout tôt)
3. Rééquilibrer les spawns (plus calme 0-2min, progressif 2-5min, chaos à 5min+)
4. Game feel : aspiration XP au level up, crits plus visibles, floating text propre
5. Garder le code propre et commenté

**Assistant** : Modifications appliquées dans `nocturne.html` :

- **Nouveau namespace `SPRITES`** — dessins canvas composites commentés, chacun avec ombre portée, silhouette travaillée, yeux glow, détails stylisés :
  - `SPRITES.player` : vampire hunter top-down avec cape qui ondule, doublure rouge, épaulettes, bras, pistolets jumeaux, capuche, yeux rouges
  - `SPRITES.traqueur` : lycan élancé (museau, crocs, oreilles, queue, pattes)
  - `SPRITES.brute` : lycan massif (cornes, griffes blanches, cicatrices, épaules trapues)
  - `SPRITES.tireur` : mage corrompu (robe, capuche, sigil, bâton + orbe pulsante)
  - `SPRITES.hybride` : forme asymétrique (piques rotatifs, yeux multiples, veines pulsantes)
  - `SPRITES.ombre` : blob spectral translucide avec wisps et œil glacial
  - `SPRITES.boss_alpha` : Alpha Lycan (pointes dorsales, cornes recourbées, griffes blanches)
  - `SPRITES.boss_matriarche` : arachnoïde (8 pattes animées, sacs à venin pulsants, 5 yeux)
  - `SPRITES.boss_seigneur` : vampire lord (cape animée, couronne d'épines, 3 orbes en gravitation, sigil runique)
  - Les ennemis stockent un `e.angle` lissé qui pointe vers le joueur → orientation correcte du sprite
  - Hit flash blanc propre via `globalCompositeOperation='source-atop'`
- **Courbe XP** : `xpForLevel(l) = floor(4 + l*3 + l^1.18)` (vs ancien `10+l*5+l^1.35*2`). L1→2 passe de ~17 à ~8 XP.
- **XP par ennemi** : traqueur 1→2, brute 6→12, tireur 3→6, hybride 4→8, ombre 1→2. Bosses 40/60/80 → 80/110/150.
- **Tailles `r`** des ennemis légèrement augmentées pour cohérence avec les sprites (10→12, 22→26, etc.) — les bosses passent de 34-42 à 44-50.
- **Level up en chaîne** : `State.lvupQueue` accumule les niveaux gagnés dans le même tick ; `applyUpgrade` ré-ouvre le modal tant que la queue > 0 (avec 80ms de délai pour laisser respirer la transition). Le titre du modal affiche « +N EN RÉSERVE » si plusieurs niveaux en file.
- **Scaling difficulté adouci** : `scale()` 0.009→0.0065 (HP/DMG), `spdScale()` 0.003→0.0022 (vitesse).
- **Spawn ramp adouci** : burst +1 toutes les 28s (vs 18s), intervalle de spawn 2.0s→0.35s (vs 1.4s→0.25s). Premier élite à 32s, premier boss à 150s.
- **Pulse d'aspiration XP au level up** : anneau bleu qui s'étend depuis le joueur + magnétisme brusque sur tous les orbes restants + flash bleu + shake léger. Le ring s'anime même pendant le modal de choix.
- **Orbes XP → cristaux facettés** : losange tournant avec outline blanc + halo pulsant + highlight central.
- **Floating damage texte** : font 600, outline rond, crits en bold 24px avec pop d'animation (1→1.2×) et shadow glow de la couleur du texte.
- **Lames orbitantes** : rendu amélioré (shadow glow argenté, reflet central, silhouette de lame plus travaillée).

**Fichiers touchés** : `nocturne.html` (modifications ciblées sur courbe XP, ENEMY_DEF/BOSS_DEF, scale/spdScale, doSpawn, SPRITES, drawPlayer, drawEnemies, drawFx orbes/pulse, updateEnemies angle, updateParts pulse, openLevelUp, applyUpgrade, resetRun).

---

### 7. Itération v3 — maps, combos, nouveau perso, boss, meta
**User** : Première demande → sprites plus réalistes, combos de sorts, maps multiples. Puis demande additionnelle : bosses en plus, monnaie de run (éclats d'ombre) + perma-buffs, pactes sacrificiels après boss, combo ×N visible, nouveau perso invocateur, nuits-clés modificatrices, tutoriel. Relics mises de côté pour plus tard.

**Assistant** : Implémenté dans `nocturne.html` :

**Maps (4 arènes jouables)** — `MAPS` + écran de sélection dédié avant le char-select
- Crypte Moderne (baseline, bleu/pluie) · Cathédrale en Ruines (cendres, +15% dégâts) · Laboratoire Souterrain (vapeur, +10% cadence) · Cimetière Argenté (papillons de nuit, +8% crit)
- 4 types de particules ambiantes distincts (rain/ash/steam/moths) avec update+render séparés
- Le modificateur de map s'applique après les passifs dans `recomputePassives`
- Nom de la map affiché dans le HUD en haut à droite

**Combos / synergies (6 cartes rouges)** — `COMBOS` data + pioche prioritaire au level up
- Salve Crépusculaire (pistolets+rayon lv3) · Vortex Sanguin (lames+onde) · Rosace Profane (sceau+éclats) · Pacte Glacial (rayon+lames) · Fusillade d'Obsidienne (pistolets+éclats) · Maelström Abyssal (onde+sceau)
- Effets câblés directement dans chaque fonction `fire`/`onUpdate` des armes concernées
- `pickOffers` force une carte combo en 2e slot si disponible, après l'évolution éventuelle

**Nouveau perso — Nécromancien** (`CHARS.necro`)
- Starter : invocation `goule` (nouvelle arme WEAPON.goule)
- Système de familiers (State.familiars) avec `updateFamiliars` + `drawFamiliars` + SPRITES.goule
- 1 goule à L1, 2 à L3, 3 à L5, 4 à L6 — chacune cherche l'ennemi le plus proche et tape au contact
- Halo violet allié autour de chaque goule

**2 nouveaux boss** ajoutés à `BOSS_DEF`
- Gardien du Laboratoire : construct mécanique cyan, plaques rotatives, tir radial 10 projectiles · IA `sentinel`
- Reine Carmin : reine-mère sanguine avec train de robe, pattes d'araignée, rush + invoque des ombres + triple projectile · IA `queen`
- Sprites composites dédiés (SPRITES.boss_gardien, SPRITES.boss_reine)

**Pactes sacrificiels** (`PACTS` + `pactScreen` overlay)
- Proposé après chaque boss tué : choix parmi 3 cartes rouges
- 8 pactes disponibles : Carnage, Célérité, Ombres, Sang, Silence, Abysse, Soif Éternelle, Fureur des Rênes
- Chaque pacte a un upside fort et un downside clair
- Appliqués via `recomputePassives` après les passifs et la map

**Meta — Éclats d'ombre** (monnaie de run) + Sanctum
- Gagnés à chaque run : `floor(kills/12) + minutes + niveau + bosses*25 + combo_peak/3`
- Sauvegardés dans `SAVE.data.shards` ; affichés sur l'écran titre
- Nouveau bouton "Sanctum" sur le titre ouvre `sanctumScreen`
- 6 perma-buffs achetables : Forge de Sang, Volonté de Fer, Œil Avare, Veine de Nuit, Pieds de Glace, Crocs d'Écho
- Max 3 actifs simultanément ; toggle on/off après achat
- Appliqués au début de run via `applyPermaBuffs`

**Combo ×N visible**
- `State.killCombo` = { count, timer (2.5s), peak }
- Affichage HUD grand format rouge-doré à droite milieu (visible à partir de 3 kills)
- Peak enregistré pour le score final et les éclats gagnés

**Nuits-clés (hordes modificatrices)** — `KEY_NIGHTS`
- Démarrent ~toutes les 80-90s (hors boss) pour 18-22s
- 4 nuits : Pourpre (+spawn +XP), Lune de Sang (-résistance +XP), Vent d'Argent (+vitesse ennemis -HP), Silence Absolu (moins mais tous élites)
- Bannière dédiée + flash coloré + affichage HUD du temps restant
- Modificateurs appliqués au spawn ennemi (hp/spd/dmg/xp/spawnMult)

**Nouveaux écrans / HUD**
- mapScreen (choix d'arène), pactScreen (choix de pacte), sanctumScreen (meta)
- Label de map + label de nuit-clé + compteur de combo dans le HUD
- Écran game over enrichi : pic combo, boss tués, éclats gagnés, éclats en réserve

**Fichiers touchés** : `nocturne.html` (additions massives : MAPS, COMBOS, PACTS, PERMA, KEY_NIGHTS, 3 nouveaux écrans overlay, SPRITES.goule/boss_gardien/boss_reine, AI sentinel/queen, système familiers, monnaie meta, sanctum, combo counter, etc.)

---

### 8. Itération v4 — signatures par perso + props de map
**User** : Demande sprites 2D isométriques, vraies maps, pouvoirs spécifiques par perso quand il prend un niveau.
**Assistant** : Franc-jeu : isométrique pur + tile-map + collision = rewrite hors scope. Livré à la place dans `nocturne.html` :

**Arbres de skills spécifiques par perso (SIGNATURES)** — 12 signatures exclusives (3 par personnage), proposées en priorité au level up (60% de chance d'apparaître en 2e slot après évolutions). Chaque signature a un vrai effet code, pas juste un +%.
- **Deathborne** (pistoléro) : *Balles Déicides* (+2 pénétration), *Artisan Mortuaire* (+35% dégâts pistolets), *Focalisation Létale* (+10% crit, +15% cadence)
- **Selene Noire** (danseuse-lame) : *Saignement Carmin* (DoT 3s sur crit), *Chorégraphie Vermillon* (+40% rotation lames, +20% dégâts lames), *Pas d'Ombre* (2 charges de dash rechargeables)
- **Hybride Renégat** (garde tanque) : *Colosse* (+45 PV max), *Résonance Hybride* (ondes ×2 près du centre), *Sang Bestial* (+35% dégâts sous 40% PV)
- **Nécromancien** (invocateur) : *Horde Maudite* (+2 goules max), *Rite du Lierre* (+35% dégâts goules), *Revenant* (résurrection unique à 40% PV + onde de choc)

**Code hooks câblés** :
- `pistolBonus` → multiplicateur dégâts pistolets
- `bladeSpdMult`/`bladeDmgMult` → modulation des lames orbitantes
- `dashCharges`+`dashStock` → système de dash à charges avec recharge indépendante, affichage HUD "DASH 2/2"
- `sigBleed` → saignement appliqué sur crit, tick de DoT dans updateEnemies
- `sigResonance` → lecture de la distance au centre de l'onde pour doubler les dégâts
- `sigBeast` → condition HP<40% dans damageEnemy
- `ghoulBonus`/`ghoulDmgMult` → scaling des familiers du Nécromancien
- `sigRevenant` → interception du gameOver : revient à 40% PV avec une onde qui nettoie les alentours

**Props de map (10 types dessinés en canvas composite)** — 22-26 décors générés par map au début de run, répartis dans une zone 3000×3000, triés par Y pour une fausse profondeur.
- **Crypte** : tombes gothiques, piliers fissurés, tas de crânes, ruines
- **Cathédrale** : colonnes cannelées brisées, braseros (flammes animées + halo lumineux), gravats
- **Laboratoire** : consoles avec scanlines animées, caisses d'acier, tuyauterie avec fuites de vapeur
- **Cimetière** : pierres tombales celtiques, croix de fer forgée, piliers, ruines

Chaque prop a : ombre portée, volume sombre + reflet "lumière haut-gauche", détails thématiques (mousse, lichen, braises, scanlines, vapeur, gravure).

**Écran game over enrichi** — affiche désormais sur plusieurs lignes : build d'armes, signatures actives (🜏), pactes scellés (⚔), passifs.

**Non livré cette itération (identifié comme trop gros)** :
- Vrai moteur isométrique avec projection, z-sort tile-based, collision
- Sprites monstres type "AAA pixel art" (nécessiterait assets externes)
- Maps hand-crafted avec géométrie et couloirs

**Fichiers touchés** : `nocturne.html` (ajout SIGNATURES data, code hooks dans 8 endroits critiques, MAP_PROPS data, namespace PROPS avec 10 fonctions de dessin, initMapProps/drawMapProps, dash à charges multiples, revenant, saignement, résonance).

---

### 10. Itération v6 — sprite joueur refait + Nécromancien multi-invocations
**User** : Partage une image de ninja encapuchonné pixel-art (chibi 3/4) avec sabres croisés dans le dos, yeux rouges lumineux, cape noire avec doublure rouge, silhouette en triangle inversé. Demande :
1. Que le sprite joueur respecte ce style (hood + katanas + red eyes + diamond silhouette + aura sombre + ombre au sol + contour de lisibilité)
2. Que le Nécromancien puisse invoquer PLUSIEURS types de créatures avec des pouvoirs distincts
3. Sauvegarder systématiquement la conversation à chaque modif (confirmé)

**Assistant** : Livré dans `nocturne.html` :

**Sprite joueur ISOSPR.player entièrement refait** :
- Silhouette diamond/triangle inversé (tête étroite haut → épaules larges → étroit aux pieds)
- Capuche noire ample avec intérieur rouge sombre visible
- Ombre profonde sur le visage via gradient radial
- Deux yeux rouges lumineux très prononcés (shadowBlur fort) avec pupilles blanches
- Deux katanas croisés visibles dans le dos : blades sombres, tsuba (gardes) rouges cerclés de glow, handles wrapped en noir au-dessus des épaules
- Manteau ample qui descend en trapèze : ouverture inférieure large, plis verticaux subtils
- Ceinture/obi rouge (sombre et highlight) avec boucle dorée
- Gants/gauntlets aux côtés, sash rouge diagonal sur le torse
- Bottes visibles avec stride de marche
- Aura sombre autour du perso (halo radial noir semi-transparent)
- Ombre ellipse aplatie au sol pour l'ancrage
- Contour de lisibilité sur la cape (stroke)

**Système d'invocations étendu pour le Nécromancien** — le starter 'goule' reste, mais 3 nouvelles armes d'invocation deviennent disponibles en upgrade :
- **Chauves-souris** (essaim rapide 2-6 familiers, 9-39 dmg contact, 280+ spd, attaque rapide 0.3s CD)
- **Golem d'Ombre** (1-3 gardiens tanks lents, 140-500 PV, déclenchent un pulse AoE d'onde sombre toutes les 2.8s dans un rayon de 140)
- **Corbeau Nécrotique** (1-4 oiseaux ranged, restent à ~200 de distance et tirent des projectiles violets toutes les 1.2s)
- **Goule** (starter inchangé, mêlée DPS équilibrée)

**AI dispatcher par kind dans updateFamiliars** :
- `goule` : chase + melee contact
- `chauvesouris` : chase très agressif avec lerp élevé, contact rapide
- `golem` : déplacement lent + timer de pulse → wave AoE + contact mineur
- `corbeau` : maintient distance ~200 + shotCd périodique → tire projectile amical dans State.projectiles

**Sprites ISOSPR ajoutés** :
- `chauvesouris` : petit vampire-bat flottant avec ailes qui battent (rotation ±wing), oreilles pointues, corps noir, yeux rouges
- `golem` : hulking construct en pierre (jambes piliers, torse bloc, épaules rondes, bras massifs, tête cube, entailles runiques bleu glow pulsant, yeux fentes cyan)
- `corbeau` : oiseau noir en vol avec ailes qui battent, queue triangulaire, bec doré, œil rouge

**Dispatch rendu** : `drawFamiliarIso` utilise maintenant `ISOSPR[f.kind]` au lieu de toujours ISOSPR.goule.

**Fichiers touchés** : `nocturne.html` (refonte ISOSPR.player, ajout 3 WEAPONS d'invocation, extension updateFamiliars avec 4 AI distincts, ajout 3 ISOSPR, dispatcher drawFamiliarIso).

### 10b. Enrichissement décors maps (dans la même itération)
**User** (en cours d'exécution) : "les maps ne sont pas suffisament réaliste, manque de décor"
**Assistant** : Enrichissement massif dans `nocturne.html` :

**Densité des props doublée/triplée** :
- Crypte : 22 → 55 props
- Cathédrale : 20 → 52 props
- Laboratoire : 22 → 54 props
- Cimetière : 26 → 60 props

**11 nouveaux props ajoutés** au namespace PROPS :
- `chain` (crypte) : chaîne lourde de 5 maillons avec reflets métal
- `candle` (toutes) : bougie allumée sur socle avec flamme animée + halo lumineux
- `sarcophagus` (crypte) : grand cercueil de pierre avec dalle + effigie humanoïde gravée + fissures
- `altar` (cathédrale) : autel avec dalle + taches de sang + chaînes + gouttière
- `statue` (cathédrale) : saint décapité avec drapé, fissures, bras cassé, tête au sol à côté
- `stained_glass` (cathédrale) : éclats de vitrail colorés au sol (violet/rouge/bleu/or) avec glow additif
- `tank` (labo) : cuve à spécimen avec liquide vert qui ondule, bulles animées, silhouette floue, halo
- `cables` (labo) : 3 câbles industriels enchevêtrés + étincelles périodiques
- `warning` (labo) : panneau triangulaire jaune avec point d'exclamation
- `mausoleum` (cimetière) : petite tombe avec colonnes + porte noire + fronton triangulaire + croix + fissures
- `dead_tree` (cimetière) : arbre mort avec branches tordues animées par le vent + racines
- `bones` (cimetière) : tas d'ossements avec crâne central + fémur + côtes

**Decals de sol** — nouveau namespace `DECALS` et tableau `State.decals` (55-75 par map) :
- `crack` : fissure en zigzag (toutes les maps)
- `stain` : tache rouge-brun (crypte)
- `moss` : tas de mousse (crypte, cimetière)
- `burn` : marque de brûlure (cathédrale)
- `debris` : petits gravats (cathédrale)
- `puddle` : flaque d'eau bleue (labo)
- `cable_scrap` : morceau de câble au sol (labo)
- `grass_tuft` : touffe d'herbe sèche (cimetière)
- `bone_shard` : fragment d'os (cimetière)

**Rendu décals** : `drawDecals()` projette en iso via worldToScreen, applique `scale(1, 0.5)` pour l'aplatissement iso, rotation aléatoire pour variété. Appelée dans `drawEnv()` juste après les tuiles, avant les entités.

**Impact visuel** : le sol ne semble plus vide, chaque tuile a des chances d'accueillir un prop ou un décal, les bougies animées éclairent localement (halo), les cuves de labo pulsent, les arbres se balancent, les étincelles de câbles flashent. La densité atteint environ 1 élément visuel tous les 10m² de monde.

### 10c. Rendering — quick wins sur zoom + taille sprites + vignette
**User** : Screenshot du jeu en cours comparé à l'image pixel-art de référence. "on est vraiment pas sur le même rendu comment faire pour avoir le meme rendu ?"

**Assistant** : Verdict franc donné : **le rendu pixel-art de la réf est impossible à atteindre en canvas pur**. C'est pixel art dessiné pixel par pixel (IA ou artiste). Canvas dessine des formes vectorielles rasterisées — même style stylisé mais jamais pixel art authentique. Options :
- **A** : basculer vers assets PNG (seule voie pour matcher la réf) — loader + atlas + `drawImage`
- **B** : rester canvas et maximiser dans ces limites

Quick wins livrés sur l'option B :
- **Zoom iso** : `ISO.sx` 0.70 → 0.95, `ISO.sy` 0.35 → 0.48 (caméra ~35% plus serrée)
- **Sprite scale global** : `ISO.spriteScale = 1.7` appliqué dans `drawPlayerIso`, `drawEnemyIso`, `drawFamiliarIso`, `drawPropIso` via `ctx.scale(...)`. Les sprites apparaissent ~1.7× plus grands à l'écran sans toucher au monde logique
- **Vignette atmosphérique** : gradient radial noir `rgba(0,0,0,0.65)` vers les bords, applicable uniquement en phases playing/levelup/pact/paused, restaure un focus central et dramatise l'ambiance

Décision user en suspens : passer ou non à des assets PNG pour un vrai pixel-art. Si oui, prochaine itération = loader d'assets + atlas + refactor drawImage.

**Fichiers touchés** : `nocturne.html` (ISO constants, scale dans les 4 wrappers de rendu entité, vignette dans render()).

### 11. Itération v7 — Système d'assets PNG (option A)
**User** : Choix validé de passer à des assets PNG. Demande liste complète des sprites nécessaires (4 persos, 5 ennemis, 5 boss, 4 familiers, ~20 props, ~12 tuiles). Demande quelle IA utiliser → ChatGPT (DALL-E 3).
**User** partage 4 images de référence :
- Fiche Nécromancien (pixel-art détaillé avec palette, 4 vues, anims, attaques) → style ref
- Werewolf noir-rouge chibi pixel-art iso → `enemies/traqueur.png`
- Chibi hooded female avec dagues → `players/selene.png`
- Dalle gothique bleu-noir en diamant iso → `tiles/crypte_1.png`

**Assistant** : Création dossiers `jeu/assets/sprites/{players,enemies,bosses,familiars,props,tiles,fx}` via PowerShell. Implémentation dans `nocturne.html` :

**Système `ASSETS`** — namespace de chargement PNG :
- `ASSETS.register(id, path)` : crée un `Image`, onload/onerror silencieux, incrémente compteurs
- `ASSETS.get(id)` : retourne l'image si chargée, `null` sinon
- `ASSETS.loadAll()` : itère sur `ASSET_MANIFEST` (30 entrées : 4 players + 5 enemies + 5 bosses + 4 familiars + 12 tiles)
- Non-bloquant, déclenché à l'init de page. Les assets apparaissent au fil de leur chargement

**`PNG_TARGET_H`** — hauteur d'affichage cible par entité (130 pour persos, 220 pour boss, 80 pour familiers, etc.). Le ratio largeur est préservé selon les dimensions natives de l'image source.

**`drawPNGSprite(id, targetH?)`** — helper qui :
- Récupère l'image
- Désactive `imageSmoothingEnabled` pour garder les pixels crisp
- Dessine à bottom-center pivot (pieds au point de translate origin)
- Retourne `true` si dessiné, `false` si fallback nécessaire

**Fallback automatique** : `drawPlayerIso`, `drawEnemyIso`, `drawFamiliarIso` tentent d'abord `drawPNGSprite(id)`. Si l'image n'est pas chargée, retombent sur le dessin canvas procédural (`ISOSPR.*`). Permet d'ajouter les PNG progressivement sans rien casser.

**Tuiles PNG** dans `drawEnv` :
- Détection du préfixe selon la map active (`tile_crypte_`, `tile_cath_`, etc.)
- Si au moins 1 variante chargée, utilise `drawImage` pour les tuiles avec rotation pseudo-aléatoire reproductible (hash sur coords tile)
- Sinon fallback sur le diamant vectoriel

**3 premiers assets demandés à l'user** :
- `assets/sprites/players/selene.png`
- `assets/sprites/enemies/traqueur.png`
- `assets/sprites/tiles/crypte_1.png`

Le joueur doit sauvegarder manuellement les images depuis le chat (clic droit → enregistrer). La fiche Nécromancien reste en référence style pour générer plus tard `player_necro.png`.

**Fichiers touchés** : `nocturne.html` (ajout ASSETS namespace, ASSET_MANIFEST, PNG_TARGET_H, drawPNGSprite helper, intégration fallback dans drawPlayerIso/drawEnemyIso/drawFamiliarIso/drawEnv, déclenchement ASSETS.loadAll() à init).
**Fichiers créés** : arborescence `jeu/assets/sprites/{players,enemies,bosses,familiars,props,tiles,fx}/`.

### 11b. Animations procédurales (après validation du pipeline)
**User** : Screenshot du rendu ISO avec les 3 PNG chargés (Selene au centre, 3-4 werewolves qui rôdent, tiles de crypte propres). Validation : "c'est bon par contre il faudra faire des animations".

**Assistant** : Proposition à 2 couches :
- **Couche 1** (livrée immédiatement, 0 asset supplémentaire) : animations procédurales appliquées autour des sprites existants (bob, tilt, squash, idle breath, hover flying, recoil d'attaque)
- **Couche 2** (reportée, demande des frames d'animation) : sprite sheets multi-frames pour idle/walk/attack

Livré dans `nocturne.html` :
- **`animOffset(entity, style)`** retourne `{bob, tilt, squashX, squashY}` selon l'état de mouvement de l'entité. Trois styles distincts :
  - `'humanoid'` : walk cycle à fréquence proportionnelle à la vitesse (10 + speed*0.02), bob ±2px, tilt ±0.04 rad, squash sur chaque pas. Idle breath slow.
  - `'flying'` : hover permanent bob ±3px, tilt ±0.06 rad (chauves-souris, corbeaux, ombres)
  - `'heavy'` : respiration lourde à 1.8Hz, squash lent inversé X/Y, bob léger même en mouvement (golem, brute, bosses)
- **Intégration** dans les 3 renderers :
  - `drawPlayerIso` : style humanoid + **recoil d'attaque** (tilt -0.10 rad) quand pistolets cdLeft < 0.08s
  - `drawEnemyIso` : dispatch style selon e.boss (heavy) / e.kind === 'brute' (heavy) / 'ombre' (flying) / défaut humanoid
  - `drawFamiliarIso` : chauvesouris + corbeau → flying, golem → heavy, reste humanoid
- Les transforms sont appliqués AVANT le draw (translate bob, rotate tilt, scale squash). Fonctionne aussi bien pour les PNG que pour les fallbacks canvas.

**Résultat** : toutes les entités ont maintenant une respiration/marche subtile qui donne vie à la scène. Selene balance légèrement en marchant, les werewolves ont un pas pesant, les créatures volantes flotteraient réellement.

**Fichiers touchés** : `nocturne.html` (ajout fonction `animOffset`, intégration dans `drawPlayerIso`/`drawEnemyIso`/`drawFamiliarIso`).

### 9. Itération v5 — ISO
**User** : "oui va y rewrite iso"
**Assistant** : Pivot rendu vers projection isométrique 2:1.

**Moteur iso ajouté** :
- Constantes `ISO.sx=0.70, ISO.sy=0.35` (ratio 2:1 classique)
- `worldToScreen(wx, wy, z=0)` : transforme coord monde → coord écran
  `x = (rx - ry) * ISO.sx + v.w/2 ; y = (rx + ry) * ISO.sy + v.h/2 - z`
- `screenDirToWorld(sdx, sdy)` : inverse pour remapper l'input écran en direction monde

**Input remappé** : ZQSD/WASD/flèches + joystick mobile interprètent maintenant la direction écran, transformée en monde iso. D = bouger visuellement à droite à l'écran (= NE en monde), W = visuellement en haut (= NW en monde), etc.

**Pipeline de rendu refactorée** :
- `drawEnv` : sol en tuiles diamants iso (TILE=96 world units), pavage dynamique autour de la caméra, couleur selon map, bordure accent discrète
- `drawSortedWorld` : collecte props + ennemis + familiers + joueur dans un tableau, tri par `x+y` monde croissant → rendu dans l'ordre de profondeur correct. Les objets "derrière" sont dessinés avant ceux "devant", donc joueur peut passer derrière une tombe et vice-versa
- `drawBladesIso` : lames orbitantes rendues après le monde trié (elles volent haut)
- `drawFx` : tous les effets (projectiles, rayons, ondes, zones, orbes, particules, texte flottant, pulse XP) re-projetés via worldToScreen avec hauteur Z appropriée (projectiles à z=14, texte à z=22, effets de sol à z=0)
- Ondes et pulse XP dessinés en ellipses aplaties (ISO.sx × ISO.sy) au lieu de cercles

**Sprites redessinés en 3/4 debout** — nouveau namespace `ISOSPR` :
- `ISOSPR.player` : chasseur vampire vertical (tête au sommet, torse avec gradient volumétrique, bandoulière avec balles, ceinture à boucle dorée, épaulettes, col de fourrure, deux pistolets aux mains avec muzzle flash, capuche avec ombre radiale, yeux rouges pupillés blancs). Animations : breathing (scale pulse), stride de marche
- `ISOSPR.traqueur` : lycan bipède en posture de chasse (jambes, torse, bras griffus tendus, tête museau, oreilles, crocs)
- `ISOSPR.brute` : humanoïde trapu (jambes massives, torse bombé, cicatrices, épaules énormes, bras tendus avec 3 griffes blanches, cornes, yeux rouges intenses)
- `ISOSPR.tireur` : mage debout (robe triangulaire large au sol, capuche, œil unique pulsant, bâton tendu avec orbe lumineuse)
- `ISOSPR.hybride` : masse asymétrique flottant avec piques rotatifs et yeux multiples
- `ISOSPR.ombre` : wraith flottant avec traînée vers le sol
- `ISOSPR.goule` : familier cadavérique voûté violet
- `ISOSPR.boss_alpha` : werewolf géant debout (muscle lines, épaules énormes, 5 griffes par main, cornes recourbées)
- `ISOSPR.boss_matriarche` : arachnoïde à 4 pattes animées + abdomen avec sacs à venin + thorax supérieur à 5 yeux
- `ISOSPR.boss_gardien` : construct mécanique avec base au sol + sphère flottante en l'air + 6 plaques rotatives orbitales + œil cyan
- `ISOSPR.boss_seigneur` : vampire lord avec robe qui s'étale au sol + épaulettes + couronne d'épines + 3 orbes rituelles en orbite
- `ISOSPR.boss_reine` : reine-mère avec traîne sanglante étalée + corsage + bras en pattes + couronne de sang

**Origine des sprites** : (0,0) = pieds de l'entité au sol, sprite s'élève vers -Y. Ombre portée aplatie sous les pieds (ellipse iso).

**Compatibilité conservée** :
- La physique, l'IA, les collisions, les projectiles restent en coordonnées MONDE inchangées
- Tous les systèmes existants (combos, pactes, signatures, nuits-clés, sanctum, meta) fonctionnent sans modification
- Les anciennes fonctions SPRITES/drawEnemies/drawPlayer/drawFamiliars/drawMapProps deviennent du code mort (toujours définies mais plus appelées)

**Limites reconnues** :
- Les sprites sont purement canvas — pas d'assets externes, pas de pixel-art AAA
- Pas de tile map hand-crafted (sol procédural diamants)
- Pas de collision avec les props (on les traverse — c'est cohérent avec le gameplay horde, pas des walls qui bloquent)
- Pas de rotation de sprite selon la direction de mouvement (personnages font toujours face à la caméra)

**Fichiers touchés** : `nocturne.html` (refonte majeure du rendering : ajout ISO/worldToScreen/screenDirToWorld, drawSortedWorld, drawPropIso, drawPlayerIso/drawEnemyIso/drawFamiliarIso/drawBladesIso, namespace ISOSPR complet avec 11 sprites debout, drawEnv refait en tuiles diamants, drawFx entièrement re-projeté).

---

## Session 2026-05-01

### 12. Orientation mobile + PWA
**User** : Veut utiliser PixelLab AI (https://www.pixellab.ai/create) pour les sprites. Souhaite faire évoluer l'appli vers une application mobile. Niveau débutant — traiter comme un débutant. Commencer par PWA. Sauvegarder la conversation systématiquement.

**Assistant** : Deux options expliquées (PWA vs Capacitor). Recommandation : commencer par PWA (0 réécriture, validable rapidement sur mobile). Sprites PixelLab s'intègrent directement dans le pipeline ASSETS existant. Préférences utilisateur sauvegardées en mémoire durable.

**Plan PWA retenu** :
1. Créer `manifest.json` (nom, icône, couleur, mode plein écran)
2. Créer `sw.js` (service worker = cache offline)
3. Ajouter 2 lignes dans `nocturne.html` pour lier les deux
4. Tester sur mobile via réseau local ou hébergement gratuit

**Livré** :
- Icônes générées via ChatGPT + redimensionnées via squoosh.app → `assets/Logo/icon-192.jpg` et `icon-512.jpg`
- `manifest.json` créé (name, short_name, display fullscreen, orientation landscape, theme #0a0a1a, 2 icônes)
- `sw.js` créé (cache offline des fichiers principaux)
- `nocturne.html` renommé en `index.html` pour URL propre (sans filename dans l'URL)
- `nocturne.html` modifié : ajout `<link rel="manifest">` + `<meta theme-color>` dans le `<head>`, enregistrement service worker en fin de script
- Icônes converties de JPG → PNG pour compatibilité PWA Android
- Dépôt GitHub public : `github.com/dkinsane31/crimson-survival-nightfall`
- GitHub Pages activé sur branche `main`
- URL du jeu : `https://dkinsane31.github.io/crimson-survival-nightfall/`
- PWA installée avec succès sur Android ✓

---

### 14. Résultat mobile — sprites directionnels OK
**User** : Jeu fonctionnel sur mobile (portrait). Sprites directionnels OK (8 directions, le perso se retourne selon le mouvement). Personnage statique pendant le déplacement → animations de marche prévues via PixelLab (sprite sheets), pas en procédural.

### 13. Génération des sprites sur PixelLab
**User** : Sur PixelLab (pixellab.ai), veut générer tous les sprites du jeu (30 PNG : 4 joueurs, 5 ennemis, 5 boss, 4 familiers, 12 tuiles). Commence par les personnages jouables.

---

## Fichiers actuellement dans `jeu/`
- `nocturne.html` — jeu Survivors iso (pipeline PNG + animations procédurales)
- `conversation.md` — ce fichier
- `assets/sprites/` — dossier sprites PNG (partiellement rempli)

---

## Session 2026-05-01 (suite)

### 15. Intégration sprites directionnels — Brute

**User** : "ok pour la brute" (screenshot du dossier `assets/sprites/enemies/brute/` avec 8 PNGs dans `rotations/`)

**Assistant** : Intégration des sprites directionnels de la brute dans `ASSET_MANIFEST` (index.html) :
- 8 entrées ajoutées : `enemy_brute_south`, `_north`, `_east`, `_west`, `_north-east`, `_north-west`, `_south-east`, `_south-west`
- Chemin : `assets/sprites/enemies/brute/rotations/{direction}.png`
- L'entrée procédurale `enemy_brute` (fallback) supprimée, remplacée par les 8 directions
- `PNG_TARGET_H['enemy_brute'] = 130` déjà en place → taille correcte
- `drawEnemyIso` utilise déjà `getCharDir(Math.cos(e.angle), Math.sin(e.angle))` → les 8 directions fonctionnent automatiquement
- Commit `81eebc6` — push vers `dkinsane31.github.io/crimson-survival-nightfall`

**Fichiers touchés** : `index.html` (ASSET_MANIFEST), `assets/sprites/enemies/brute/rotations/` (8 PNGs + metadata.json)

---

## État sprites — 2026-05-01

### Intégrés avec 8 directions
- `player_deathborne` ✓
- `player_selene` ✓
- `player_hybride` ✓
- `player_necro` ✓
- `enemy_traqueur` ✓
- `enemy_brute` ✓
- `enemy_tireur` ✓
- `enemy_hybride` ✓
- `enemy_ombre` ✓
- `boss_alpha` ✓ — commit 6f0fe2a
- `boss_matriarche` ✓ — commit 13bbc7a
- `boss_gardien` ✓ — commit be1320e
- `boss_seigneur` ✓ — commit 73fe841
- `boss_reine` ✓ — commit da1ac74

- `fam_goule` ✓ — commit c0de557
- `fam_chauvesouris` ✓ — commit ccf0c32
- `fam_golem` ✓ — commit 8cfd59b
- `fam_corbeau` ✓ — commit 5b6b004

### À faire
- Tuiles : `tile_crypte_1/2/3`, `tile_cath_1/2/3`, `tile_labo_1/2/3`, `tile_cimetiere_1/2/3`
- Animations de marche (sprite sheets PixelLab) — reporté

---

## Session 2026-05-02 — Bilan sprites complet

Tous les sprites jouables, ennemis, boss et familiers sont intégrés avec 8 directions.

### Bug corrigé — directions ennemis/familiers (commit d29bba7)
**Problème** : `drawEnemyIso` passait `Math.cos(e.angle)` et `Math.sin(e.angle)` à `getCharDir`. Ces valeurs ont une magnitude ~1, en dessous du seuil `< 10` de `getCharDir`, donc tous les ennemis affichaient toujours `south`.
**Fix** : utiliser `e.vx` et `e.vy` directement (vélocités réelles, 80–300+).
Les familiers utilisaient déjà `f.vx/f.vy` correctement.

### Nouvelles signatures exclusives (commit 55fffa4)
- **Deathborne** : Balles Rebondissantes — ricochet automatique vers 2e cible après le 1er impact
- **Selene** : Lame Explosive — chaque coup de lame déclenche une AoE orange
- **Hybride** : Chef de Meute — jusqu'à 5 loups guerriers (ISOSPR.loup yeux ambrés) respawnent toutes les 3.5s
- **Necro** : Invocation d'Outre-Tombe — chaque ennemi tué ressuscite comme revenant allié (max 8, permanent)
- Sprite canvas ISOSPR.loup et ISOSPR.revenant ajoutés
- Bug direction ennemis corrigé (vx/vy au lieu de cos/sin angle)

Prochaine grande étape : les tuiles de sol (12 PNG) ou les animations de marche.

---

## Session 2026-05-03 — Système de jalons de niveau

### Jalons implémentés (commit 982f449)
Écran rouge sang "JALON" qui s'affiche aux niveaux 10, 20, 50, 100. Chaque personnage a 4 pouvoirs exclusifs :

**DEATHBORNE**
- Nvl 10 : Pistolets Fulminants — explosion AoE 60px / 30% dmg à chaque impact (pas depuis clone)
- Nvl 20 : Visée Mortelle — balles avec homing (0.07 rad/frame)
- Nvl 50 : Tourelle du Néant — tourelle orbitale, tir toutes 0.9s, dessinée en iso
- Nvl 100 : Spirale d'Extinction — +50% dégâts, trajectoire hélicoïdale

**SELENE NOIRE**
- Nvl 10 : Instinct Fantôme — +22% esquive passive
- Nvl 20 : Ombre Portée — CD dash ×0.60 (dashCdMult)
- Nvl 50 : Zone Critique — onde AoE sur crit (30% dmg, 80px)
- Nvl 100 : Dédoublement — clone miroir 65% dégâts via spawnProj

**HYBRIDE RENÉGAT**
- Nvl 10 : Armure Bestiale — armor ×0.88 (-12% dégâts reçus)
- Nvl 20 : Cri de Guerre — stagger 1.8s rayon 300px toutes 8s
- Nvl 50 : Mutation Sauvage — ×1.5 dmg sous 50% PV
- Nvl 100 : Loups Alphas — loups ×1.6 dmg, plus grands/rapides au spawn

**NÉCROMANCIEN**
- Nvl 10 : Marche des Morts — goules +40% vitesse, +20% dégâts
- Nvl 20 : Tribunal des Ombres — spawne 1 chauve-souris permanente
- Nvl 50 : Colosse d'Obsidienne — spawne 1 golem permanent
- Nvl 100 : Seigneur des Corbeaux — spawne 1 corbeau permanent

### Équilibre
- Cap total familiers : 18 maximum
- Explosions pistolets : exclues depuis les balles clone (`fromClone:true`)
- Loups Alphas : ×1.6 au lieu de ×2.0 (moins abusé)
- Jalons se déclenchent APRÈS les écrans de level-up
- Milestone screen masqué dans `startGame`

### Sprites loup + revenant intégrés
- `fam_loup` ✓ — 8 directions, commit 89fe51c
- `fam_revenant` ✓ — 8 directions, commit 63ccff8

---

## Session 2026-05-04 — Système tileset sprite-sheet

### Clarification tileset vs map
L'utilisateur utilise PixelLab pour générer des **tilesets** (grilles de tuiles 32×32 dans un PNG unique) et non des maps complètes. Les tilesets servent de source pour le rendu procédural du sol.

### Refonte rendu tuiles (commit c37c613)
**Ancien système** : 3 PNG distincts par map (`crypte_1.png`, `crypte_2.png`, `crypte_3.png`) — 12 entrées ASSET_MANIFEST.

**Nouveau système** :
- 1 sprite-sheet PNG par map (grille de tuiles 32×32)
- 6 entrées ASSET_MANIFEST : `tile_crypte`, `tile_cathedrale`, `tile_labo`, `tile_cimetiere`, `tile_palais`, `tile_nexus`
- Chemin : `assets/sprites/tiles/NomMap/nom.png`
- Le code calcule automatiquement la grille à partir des dimensions du PNG (`naturalWidth / 32`)
- Sélection pseudo-aléatoire reproductible : `((cx*73 + cy*37) & 0xFFFF) % totalTiles`
- **Diamond clipping** : `ctx.save() → clip() → drawImage() → ctx.restore()` pour masquer les coins carrés

### Premier tileset livré
- Crypte : `assets/sprites/tiles/Crypte/crypte.png` (25 Ko, tileset généré sur PixelLab — pierre sombre + flaques cyan)

### Workflow retenu
Pour chaque nouvelle map, générer un tileset sur PixelLab (32×32 tiles) et sauvegarder dans un sous-dossier :
```
assets/sprites/tiles/
  Crypte/crypte.png         ✓
  Cathedrale/cath.png       → pierres orangées, vitraux brisés
  Labo/labo.png             → métal gris, grilles, vapeur
  Cimetiere/cim.png         → terre sombre, herbe morte
  Palais/palais.png         → marbre rouge, or corrompu (futur)
  Nexus/nexus.png           → vide cosmique, cristaux violets (futur)
```

### Push automatique retenu
L'utilisateur teste sur mobile via GitHub Pages. Désormais commit + push systématique après chaque modification, sans attendre la demande explicite.

---

## Session 2026-05-04 (suite) — Bugs + refonte armes partagées

### Bugs corrigés (commit 4b09eb0, 1e184c2)

**Bug 1 — Armes d'invocation Nécro proposées à tous les persos**
- Cause : `possibleUpgrades()` ne filtrait pas par `char` dans la section "nouvelle arme"
- Fix : ajout de `char:'necro'` sur goule/chauvesouris/golem/corbeau + filtre `if(def.char && def.char !== State.char) continue`

**Bug 2 — Armes de départ proposées aux mauvais persos**
- Fix : ajout de `char:'deathborne'` sur pistolets, `char:'selene'` sur lames, `char:'hybride'` sur onde

**Bug 3 — Boutons Pause/Mute/Quit ne répondent pas sur mobile**
- Cause : `window.addEventListener('touchstart', e.preventDefault())` bloquait TOUS les touches quand `phase==='playing'`, y compris sur les boutons UI
- Fix : `if(e.target.closest('button, .overlay, #gameTopbar, a')) return;` avant `preventDefault()`

**Bug 4 — Cartes signature sans bordure dorée**
- Cause : `cls += ' evo'` pour les signatures était appliqué après `d.className = cls`
- Fix : déplacé avant l'assignation

### Refonte armes partagées (commit 28bd759)

**Armes remplacées** (rayon/sceau/éclats trop génériques pour le thème)

| Ancienne | Nouvelle | Mécanique |
|---|---|---|
| Rayon Crépusculaire | **Faux Spectrale** | Arc de ~120° devant le joueur, touche tous les ennemis dans le cône |
| Sceau Abyssal | **Brume Pestilentielle** | Zone de brume toxique 5s, dégâts continus |
| Éclats d'Argent Noir | **Tempête de Sang** | Gerbe de sang dans toutes directions, +3% vol de vie intégré par coup |

**Nouvelles évolutions**

| Evo | Base | Condition | Effet |
|---|---|---|---|
| Moisson Maudite | Faux | Cadence ×4 | 3 faux en éventail, cadence élevée |
| Voile de Mort | Brume | Zone ×4 | Brume permanente qui suit le joueur |
| Déluge Carmin | Tempête | Vol de vie ×3 | 18 projectiles, portée doublée |

**Combos mis à jour**
- Salve Funèbre (pistolets+faux) — 1 tir/4 = mini arc de faux
- Déluge Cramoisi (brume+tempête) — chaque brume tire 8 gouttes en étoile
- Pacte Mortel (faux+lames) — faux active boost ×2 rotation lames 2s (via `State.fauxTimer`)
- Fusillade Sanglante (pistolets+tempête) — chaque balle éclate en 3 gouttes de sang
- Maelström Abyssal (onde+brume) — onde laisse un nuage de brume à son apogée
- Vortex Sanguin (lames+onde) — inchangé

---

## Session 2026-05-04 (suite 2) — Bug cartes manquantes

### Diagnostic "l'ensemble des cartes ne sont pas sur le jeu" (commit 9e08a6d)

**Cause identifiée** : les nouvelles armes (faux, brume, tempête) avaient un poids `w:3` dans le pool de level-up, noyé par 13 passifs à `w:4` chacun (total 52). Probabilité de voir une nouvelle arme à un level-up donné : ~27%. Le joueur pouvait facilement jouer 10+ niveaux sans jamais voir ces armes.

**2 bugs secondaires découverts pendant l'analyse** :
- `possibleUpgrades` ne gérait pas `passId==='lifestl'` → l'évolution Déluge Carmin ne pouvait jamais se débloquer
- `damageEnemy` dans la boucle zones utilisait `'sceau'` hardcodé → le vol de vie de Tempête ne s'appliquait pas depuis les zones

**Fixes appliqués (commit 9e08a6d)** :
1. `pickOffers` : garantit une nouvelle arme dans les offres si le joueur en a < 4 → les nouvelles armes apparaissent systématiquement tôt
2. `possibleUpgrades` : ajout du cas `lifestl` → Déluge Carmin désormais débloquable (3 stacks vol de vie + tempête max)
3. Boucle zones : `damageEnemy(e, z.dmg, ..., z.kind||'zone')` → vol de vie actif depuis zones Tempête

**Fichiers touchés** : `index.html` (3 corrections dans possibleUpgrades/pickOffers/boucle zones)

---

## Session 2026-05-04 (suite 3) — Audit complet + 3 bugs supplémentaires corrigés

### Demande
"check la totalité du jeu, test en tant que joueur et corrige les bugs"

### Audit réalisé
Lecture intégrale du fichier `index.html` (7036 lignes) en plusieurs passes pour simuler une expérience joueur et repérer tous les bugs visibles.

### Bugs trouvés et corrigés (commit 1825c04)

**1. Zones — couleur hardcodée (drawFx)**
- **Bug** : toutes les zones (brume, tempête, sceau) affichaient le même gradient violet `rgba(120,40,210)` quelle que soit leur couleur réelle (`z.color`)
- **Fix** : `drawFx()` parse maintenant `z.color` pour construire le gradient et la couleur de contour dynamiquement → brume, tempête et sceau ont des teintes visuellement distinctes

**2. Écran milestone — monde invisible (render)**
- **Bug** : `render()` n'incluait pas `'milestone'` dans sa liste de phases → pendant l'écran de récompense de jalon, le monde 3D disparaissait complètement (fond noir)
- **Fix** : ajout de `State.phase==='milestone'` dans la condition ligne 6649

**3. wolfSpawnCd non réinitialisé entre runs (resetRun)**
- **Bug** : `State.wolfSpawnCd` (timer de spawn des loups familiers) n'était pas remis à zéro dans `resetRun()` → en rejouant avec le Nécromancien, le timer pouvait hériter d'une valeur de la run précédente
- **Fix** : ajout de `State.wolfSpawnCd=0` dans `resetRun()`

### Bugs non-critiques identifiés (pas de fix nécessaire)
- `drawFamiliars()` (ligne 6449) : ancienne fonction morte, jamais appelée, remplacée par `drawFamiliarIso()` via le pipeline `drawSortedWorld` → pas de bug visible
- `bladeExplosionCd` undefined au 1er tick : `undefined > 0` est `false`, le guard empêche tout problème → comportement correct

**Fichiers touchés** : `index.html` (3 corrections dans drawFx/render/resetRun)

---

## Session 2026-05-04 (suite — contexte compressé)

### Scaling par map + variété anti-répétition

**User** : "il faut que entre chaque maps le joueurs xp plus rapidement car, on a poussé les compétences jusqu'au lvl 100 mais que les monstres soient aussi plus fort"
**User** : "solution A ok, solution B il faut réelement que ca soit alératoire meme en recommencant le meme niveau, solution C ok"

**Livraison (commit 120a6c4)** :

**1. Scaling par map (xpMult + enemyMult)**
- Ajout de `xpMult` et `enemyMult` dans chaque entrée de `MAPS`
  - crypte : ×1.0 / ×1.0 (équilibré)
  - cathedrale : ×1.25 XP / ×1.20 ennemis
  - labo : ×1.55 / ×1.40
  - cimetiere : ×1.85 / ×1.65
  - palais : ×2.2 / ×1.90
  - nexus : ×2.6 / ×2.20
- `grantXp()` multiplie l'XP reçue par `State.mapDef.xpMult`
- `spawnEnemyAt()` multiplie HP, DMG et légèrement SPD par `mapDef.enemyMult`

**2. Vagues nocturnes (Solution A) — NIGHT_WAVES**
- 4 vagues fixes déclenchées à 2min / 4min / 6min / 8min
- Chaque vague spawn un burst d'ennemis ciblés avec bannière + flash
- Stockées dans `State.nightWavesDone` (Set), aucune répétition dans le même run

**3. Événements aléatoires (Solution B) — RANDOM_EVENTS**
- 4 événements : Frénésie (+70% vitesse ennemis), Obscurité (tunnel vision), Pacte Maudit (×1.6 dégâts infligés/×1.4 dégâts reçus), Pluie de Sang (orbes XP du ciel)
- `triggerRandomEvent()` tire un événement au hasard (Math.random() pur, différent à chaque run)
- Déclenché toutes les 85-140s après 60s de jeu, jamais pendant un boss
- Effet "Obscurité" : overlay radial sombre autour du joueur pendant 18s

**4. Reliques au sol (Solution C) — RELIC_DEFS**
- 3 reliques : Crâne de Fureur (+60% dégâts 30s), Gant de Hâte (+35% vitesse 25s), Bouclier Spectral (invulnérable 8s)
- 8% de chance de drop sur tout ennemi non-boss
- Ramassage automatique par proximité (36px)
- `drawRelics()` affiche des triangles pulsants en espace monde
- Indicateur de buff actif affiché en bas-gauche

**Fichiers touchés** : `index.html` (MAPS, grantXp, spawnEnemyAt, doSpawn, triggerRandomEvent, updateRandomEvent, updateRelics, drawRelics, damageEnemy, damagePlayer, updatePlayer, updateEnemies, render, resetRun)
