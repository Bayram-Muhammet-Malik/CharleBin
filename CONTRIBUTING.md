# COMMENT CONTRIBUER AU PROJET CHARLEBIN

## Qui est concerné ?
Toutes personnes voulant corriger un bug ou ajouter une fonctionnalité intéressante.

## Comment faire
Vous pouvez tout simplement faire un pull-request pour votre fonctionnalité.
Vous devez bien expliquer le code et vous devez répondre à mes questions si besoins.




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


