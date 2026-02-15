# Comptes-rendus de Muhammet BAYRAM, ressource R4.02 - Qualité de développement #

## Séance 1 ##

### Transparents 1 ###

Mes manipulations :

 - j'ai récupérer le repository PrivateBin
 - j'ai installé les dépendances avec make
 - et j'ai crée quelques secrets
 
Il y avait du code que voilà :

``` 
git clone git@github.com:floo51/PrivateBin.git
make install
make start
git status /*après l'arrêt du serveur mais il y a rien
car les fichiers où il y a le secret sont dans le .gitignore 

```
### Transparents 2 ###

Pour celui-ci, j'ai fait :

 - j'ai crée une branche et me suis mis dessus direct
 - dans le fichier lib/Config.php, j'ai modifié la langue par défaut
en français et le temps d'expiration.
- j'ai effectué 2 commits différents
- on revient à la branche main et on constate qu'il n'y a aucune
modification dans cette branch car on les a pas merge

```
git switch -C nouvelle-branche
nano lib/Configuration.php //on effectue les 2 modifications
git add -p lib/Configuration.php //on ajoute juste le fr
git commit -m "[MODIFY] Changement de la langue par défault"
git add -p lib/Configuration.php
git commit -m "[MODIFY] Temps d'expiration"
git switch main
```

### Transparents 3 ###

- Fusionnage de la nouvelle branche dans la main
- Les commits sont présents après le merge
- La branche reste tout de même présent, on peut la garder
ou la supprimer

```
git merge nouvelle-branche
git branche -d nouvelle-branche //optionnelle
```

### Transparents 4 ###

- Création d'une branche
- modification du temps d'expiration par défault à un mois
- commit
- dans le main, modification du temps d'expiration par défaut
à un jour
- commit
- on aura un merge à effectué ou nous devrons bien evidement le 
résoudre

```
git switch -C change-default-expiration
nano lib/Configuration.php // temps d'expiration = un mois
git add .
git commit -m "[MODIFY] temps d'expiration à un mois
git switch main
nano lib/Configuration.php // temps d'expiration = un jour
git add .
git commit -m "[MODIFY] Temps d'expiration à un jour
git merge change-default-expiration //conflit à résoudre
```

### Transparents 5 ###

- Récupération de la branche 
- repérer le commit
- lancement de git bisect
- indiqué le commit good ou bad

```
git checkout rename-to-charlebin
make start //le titre est charlebin
git bisect start
git bisect bad
git bisect good [ref-du-commit-fonctionnel]
make start
git bisect bad // jusqu'a trouvé le bon commit
git bisect good
git bisect reset
```

### Transparents 6 ###

- make test pour voir si le titre de la page est différent que 
PrivateBin
- trouver le bon responsable avec git bisect run et make test


```
git bisect start
git bisect bad
git bisect good [ref]
git bisect run make test
git bisect reset
```



## Séance 2 ##







## LINTS :

### PHP Lint
**Utilisation :**
Un seul fichier : `php -l cfg/conf.sample.php`
Plusieurs fichiers : `find . -type f -name '*.php' -exec php -l {} \;`

### PHP Code Sniffer
**Installation :**
Dans le projet : `composer require --dev "squizlabs/php_codesniffer=3.*"`

**Utilisation :**
`./vendor/bin/phpcs --extensions=php ./chemin`
Vérification du respect au PSR

### PHP Mess Detector
Détection de potentiel bugs dans le code ou du code non optimisé
**Installation :**
`composer require --dev "phpmd/phpmd=@stable"`

**Utilisation :**
` ./vendor/bin/phpmd ./chemin ansi codesize,unusedcode,naming`

Configurable avec ruleset.xml


