# Examen 

### Question 1 : La blockchain est un réseau a) populaire b) fermé c) décentralisé d) intelligent

### Réponse Question 1 :

Blockchain est un réseau décentralisé. 



### Question 2 : Quelles technologies sont généralement utilisées par une blockchain ? </br> a) La cryptographie asymétrique b) le "hachage" cryptographique c) Les réseaux peer-to-peer d) Toutes les réponses précédentes

### Réponse Question 2 :

Toutes les réponses précédentes sont correctes.

## Question 3 : Dans un système d'accounting, comment sont gérés les soldes des utilisateurs ? a) Par un registre centralisé b) Par un registre distribué c)Par un ensemble de transactions non dépensées d) Par des contrats intelligents

### Réponse Question 3

Les soldes des utilisateurs sont gérés par un registre distribué.

## Question 4 : Laquelle de ces propositions décrit le mieux la Proof of Work ? a) Un mécanisme de consensus basé sur la résolution de puzzles cryptographiques b) Un mécanisme de consensus basé sur la possession de monnaie c) Un mécanisme de consensus basé sur la confiance d) Un mécanisme de consensus basé sur le temps

### Réponse Question 4

La Proof of Work est un mécanisme de consensus basé sur la résolution de puzzles cryptographiques.


## Question 5  : Quel est le rôle des mineurs dans une blockchain ? a) Verifier les transactions et créer de nouveaux blocs b) Génerer des nouveaux tokens c) Gérer des contrats intelligents d) Maintenir un registre centralisé

### Réponse Question 5

Les mineurs vérifient les transactions et créent de nouveaux blocs.


## Question 6 : Qu'est ce qu'un bloc dans une blockchain ? a) Un groupe de transactions b) Un noeud du réseau c) Une fonction de hachage 

### Réponse Question 6

Un bloc est un groupe de transactions.


## Question 7 : Quel algorithme de consensus est utilisé par Bitcoin ? a) Proof of Work b) Proof of Stake c) Delegated Proof of Stake 

### Réponse Question 7

Bitcoin utilise la Proof of Work.


## Question 8 : Quel est le principal objectif des signatures dans une blockchain ? a) Authentifier l'identité de l'émetteur b) Chiffrer les données de transaction c) Compresser les données de transaction d) Générer un nouvel identifiant pour la transaction

### Réponse Question 8

Le principal objectif des signatures dans une blockchain est d'authentifier l'identité de l'émetteur.


## Question 9 : Analysez ce code cf. [Exam.sol](Exam.sol), décrivez le et proposez un usage de ce dernier. 

### Réponse Question 9

Ce [smart contrat](Exam.sol) est un écrit en solidity et à pour but d'être utilisé dans un système d'examen:
- Le contrat a a plusieurs variables d'état : 
    - `teacher` : qui est l'adresse de l'enseignant
    - `totalMarks` : qui est le nombre total de points
    - `passingMarks` : qui est le nombre de points minimum pour réussir
- On a une structure de type mapping qui associe chauque étudiant à son nombre de points
- On a le constructeur du contrat qui est appelé quand on le crée. Il l'adresse du `teacher`avec l'adresse de celui qui déploie le contrat avec `msg.sender` puis il initialise les variable `totalMarks` et `passingMarks`
- On a une fonction `submitMarks` qui permet à un `teacher`de soumettre les notes d'un étudiant en vérifiant que celuu qui est appelé est bien l'enseigant avec 'require(msg.sender == teacher) et aussi que la note est supérieur au total possibles avec `require(StudentMarks <= totalMarks)`. Avec le `mapping marks` elle enregistre la note de l'étudiant.
- On a une fonction `getMarks` pour récuperer la note d'un étudiant
- On a une fonction `isPass` pour vérifier si un étudiant a réussi ou pas

Pour l'utilisation, le contrat pourrait etre déployé par un enseignant pour gérer les notes de son examen, il pourrait soumettre les notes avec `submitMarks` et les etudiants pourraient vérifier leur note avec `getMarks` et `isPass` pour savoir s'ils ont réussi.



## Question 10 : À quoi sert `uint public passingMarks;` ? 

### Réponse Question 10

L'instruction `uint public passingMarks;` déclare une variable publique `passingMarks` dans le contrat Solidity Exam. Elle représente la note minimale requise pour réussir l'examen. Elle est initialisée dans le constructeur du contrat et on peut la consulter publiquement grâce à une fonction getter que Solidity génère automatiquement. 



## Question 11 : Décrivez les étapes qui permettent d'utiliser ce code en "production". 

### Réponse Question 11

Pour utiliser ce code en production, il faut suivre les étapes suivantes (en utilisant hardhat):

- Créer un nouveau projet hardhat avec `npx hardhat init`
- Ajouter le fichier Exam.sol dans le dossier `contracts`
- Modifier le fichier `hardhat.config.js` pour activer la compilation du contrat
- Modifier le fichier `scripts/deploy.js` pour déployer le contrat
- Compiler le contrat avec `npx hardhat compile`
- Déployer le contrat avec `npx hardhat run scripts/deploy.js`
- Utiliser le contrat déployé en interagissant avec lui via une interface utilisateur ou un script web3.js


## Question 12 : Peut-on librement utiliser la fonction `submitMarks` ? Pourquoi ?

### Réponse Question 12

Non et pour deux raisons:
- la première c'est qu'on a `require(msg.sender == teacher, "Only teacher can submit marks");` qui est une condition qui vérifie que l'expéditeur du message (donc celui qui appelle la fonction) est l'enseignant. Donc seul l'enseignant peut soumettre des notes.

- la deuxième c'est qu'on a `require(studentMarks <= totalMarks, "Marks cannot be greater than total marks");` : qui est cette fois une condition qui vérifie que les notes de l'étudiant ne dépassent pas les notes totales ce qui assure que les notes soumises sont valides.


## Question 13 : À quoi sert la fonction `getMarks` ? Qui peut l'appeler ?

### Réponse Question 13

La fonction `getMarks` est utilisée pour obtenir les notes d'un étudiant spécifique. Elle prend l'adresse de l'étudiant en paramètre et renvoie les notes de cet étudiant.

Ici, la fonction getMarks est marquée comme `external`, ce qui signifie qu'elle ne peut être appelée que de l'extérieur du contrat. Donc, n'importe qui peut appeler cette fonction pour obtenir les notes d'un étudiant spécifique.



## Question 14 : Identifiez deux moyens d'améliorer cette fonction, proposez un noveau code source pour la fonction améliorée.


### Réponse Question 14

Il pourrait y avoir donc deux moyens d'améliorer cette fonction:

- la première serait d'ajouter une fonctionnalité pour que seul l'enseignant ou l'étudiant concerné puisse voir la note comme ça si certains d'entre eux ne veulent pas partager ou ont honte, ils peuvent la garder pour eux. 

- la seconde serait d'ajouter une vérification pour s'assurer que l'étudiant a bien été noté avant de retourner sa note parce que là, si une note n'a pas été attribuée à un étudiant, la fonction retournera simplement 0 et l'etudiant peut croire qu'il a eu 0.

 le code de la fonction ressemblerait donc à ça :

```solidity
function getMarks(address student) external view returns (uint) {
    require(marks[student] != 0, "Student has not been graded yet");
    require(msg.sender == teacher || msg.sender == student, "Only the teacher or the student can view the marks");
    return marks[student];
}
```


## Question 15 : Expliquer en quoi la blockchain serait un avantage pour le contexte d'utilisation du code présenté.


### Réponse Question 15

Il y a plusieurs raisons pour lesquelles la blockchain serait un avantage pour le contexte d'utilisation de ce code : 

- On peut parler de la transparence et la sécurité dans le sens où on a toutes les notes qui soumises qui sont stockées sur la blockchain, ce qui signifie qu'elles sont publiques et transparentes donc personne ne peut modifier les notes une fois qu'elles sont soumises. En plus, il n'y a que le professeur qui peut soumettre les notes.

- On peut parler de l'automatisation car le smart contrat gère tout seul le process de soumission des notes et détermine lui même si l'etudiant à réussi ou non.



## Question 16 : Nous souhaitons pouvoir changer de professeur comment faire ?

### Réponse Question 16

On pourrait ajouter une fonction `changeTeacher` qui est bien évidemment appelé par le professeur actuel pour éviter que n'importe qui puisse modifier ça. Cela pourrait s'écrire comme ça :

```solidity
function changeTeacher(address newTeacher) external {
    require(msg.sender == teacher, "Only the current teacher can change the teacher");
    teacher = newTeacher;
}
```








