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

### Transparents 1 ###

- Création d'un repository sur GitHub : CharleBin
- branchage du PrivateBin au nouveau repository
- push tout le main dans ce repository

```
git remote set-url origin 
https://github.com/Bayram-Muhammet-Malik/CharleBin.git

git push
```

### Transparents 2 ###

- Modifications de PrivateBin en CharleBin dans lib/Configuration.php
- Le changement aparaîtra en locale après `git pull`


### Transparents 3 ###

- Ouvrir une pull request pour supprimer le footer de PrivateBin
- Fait dans GitHub



### Transparents 4 ###

- un README.md pour expliquer ce que CharleBin fait
- un contributing.md pour les PR
- une template de PR



## Séance 3 ##

### Transaprents 1 ###

- Installation des 3 linters
- Configurations des différents linters
- création d'une target dans makfile
- correction de 5 erreurs



```
composer require --dev "squizlabs/php_codesniffer=3.*"

composer require --dev "phpmd/phpmd=@stable"

php -l cfg/conf.sample.php`

./vendor/bin/phpcs --extensions=php ./test //PSR

touch ruleset.xml
nano ruleset.xm
./vendor/bin/phpmd ./test ansi codesize,unusedcode,naming
```


## Séance 4 ##

### Transparents 1 ###

- Installation de copilot sur VSCode
- réecriture de la méthode formatHumanReadableTime avec copilot
- les suggestions de copilot ne sont pas très pertinentes sauf
au moment ou on le guide bien

```
public static function formatHumanReadableTime(int $value, string $unit)
{
    switch ($unit) {
        case 'sec':
        case 'second':
        case 'seconds':
            $unit = 'second';
            break;

        case 'min':
        case 'minute':
        case 'minutes':
            $unit = 'minute';
            break;

        default:
            // On enlève un éventuel "s" final pour avoir l'unité au singulier
            $unit = rtrim($unit, 's');
            break;
    }

    return I18n::_(
        ['%d ' . $unit, '%d ' . $unit . 's'],
        $value
    );
}

```

### Transparents 2 ###

- Trouver le mot de passe entrée dans le champ password
- Il se trouve dans la balise avec id=passwordinput et il dans value



## Séance 5 ##

### Transparents 1 ###

- Installation de Cypress
- Ecriture du test e2e


```
npx cypress install
npx cypress open

nano cupress/e2e/spec.py.js

```

`
describe('template spec', () => {
  it('passes', () => {

    let msg = 'mon message';
    let mdp = 'mdp';
    cy.visit('http://localhost:8080/');

    //on ecrit le message et mdp
    cy.get('#message').type(msg);
    cy.get('#passwordinput').type(mdp);

    //click sur envoyer
    cy.contains('Envoyer').click();

    //lorsque la nouvelle page apparait avec l url
    cy.get('#pasteurl').invoke('attr', 'href').then((pasteUrl) => {
      cy.reload(true);
      cy.visit(pasteUrl);

      cy.get('input#passworddecrypt').type(mdp); // on ecrit le mdp
      cy.contains('Déchiffrer').click();

      // on compare le msg
      cy.get('#prettyprint').should('contains.text', msg);

    });
  })
})


`
