# Bomber Man
[Link to the Game](https://aionixx.github.io/BomberMan/)

[Link to the repository](https://github.com/AionixX/BomberMan/)

[Link to the designdocument](./Concept/Designdokument.pdf)

[Download the project as .zip](https://github.com/AionixX/BomberMan/raw/master/BomberMan.zip)

## Idea
I want to make a *Bomber Man* clone.

The Player starts on a map whith randomly generated Boxes, and enemys. These Boxes are destroyable with the bombs the player can place.

Enemys will try to kill the player with their bombs if the player gets in range.

If the Player kills an enemy, the player will gain score and a new enemy will be spawned.
The game is over once the player has lost all his three lives.

## Controlling
You can controll the player with the `W` `A` `S` `D` buttons on your keyboard for the movement and with `Space` to place a Bomb.

## Installing and interaction
To run this game locally, you just have to clone the repository and run `npx`. 
The interction is pretty easy. Just click on the start buttons and have fun!


## Checkliste für Leistungsnachweis
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 | Bomber Man
|    | Name                  | Dennis Hawran
|    | Matrikelnummer        | 262357
|  1 | Nutzerinteraktion     |The User can start the game with the mouse. In the game itself he controls the player with the `W` `A` `S` `D` and `Space` buttons to move around and place bombs. |
|  2 | Objektinteraktion     |Due to the collision checking, the player can't move through walls, boxes or bombs. Also the bombs use the collision checking to determine which boxes and players they hit to tell them to die.|
|  3 | Objektanzahl variabel |When the user starts the game, a random generated map gets initialized. the amount of boxes aswell as there position is variable. On runtime the new enemies are getting spawned randomly across the map|
|  4 | Szenenhierarchie      |The main parent is the Game.ts which starts the Game. Then there is a GameManager which holds all the game objects like the map, the player and the enemies.|
|  5 | Sound                 |There is some background music for the atmosphere. There are sound to give the player feedback aswell like footsteps, explosion sounds and die sounds.|
|  6 | GUI                   |The user can change the volume and start the game in the start screen.|
|  7 | Externe Daten         |There are a lot of things to adjust in the Data.json like map size, camera distance, amount of enemies, start level of the player and enemies etc.|
|  8 | Verhaltensklassen     |I have a few different classes with different behaviours. Some of them are `Bomb`, `Box`, `man`, `Explosion` or `Map`.|
|  9 | Subklassen            |The classes `BomberMan` and `EnemyMan` extend the `Man` class. `Man` can do everything they need to do except care about the input. So `BomberMan`cares about the user input and `EnemyMan` is a small AI which tells his parent class what to do.|
| 10 | Maße & Positionen     |Enemies and the player have the size `1` aswell as each tile. The map is centered so the camerea just have to look at the world position `0, 0, 0`.|
| 11 | Event-System          |The `GameManager` sends events to all instances and tell them to `upgrade`. Just classes which inherit from `Man` are using this event the increase their level.|

## Abgabeformat
* Fasse die Konzeption als ein wohlformatiertes Designdokument in PDF zusammen!
* Platziere einen Link in der Readme-Datei deines PRIMA-Repositories auf Github auf die fertige und in Github-Pages lauffähige Anwendung.
* Platziere ebenso Links zu den Stellen in deinem Repository, an denen der Quellcode und das Designdokument zu finden sind.
* Stelle zudem auf diese Art dort auch ein gepacktes Archiv zur Verfügung, welches folgende Daten enthält
  * Das Designdokument 
  * Die Projektordner inklusive aller erforderlichen Dateien, also auch Bild- und Audiodaten
  * Eine kurze Anleitung zur Installation der Anwendung unter Berücksichtigung erforderlicher Dienste (z.B. Heroku, MongoDB etc.) 
  * Eine kurze Anleitung zur Interaktion mit der Anwendung

## GameZone
Wenn Du dein Spiel bei der Dauerausstellung "GameZone" am Tag der Medien sehen möchtest, ergänze folgendes  
* Einen Ordner mit zwei Screenshots der laufenden Applikation in den Größen 250x100 und 1920x400 pixel sowie ein Textdokument mit den Informationen:
* Titel
* Autor
* Jahr und Semester der Entwicklung (Sose, Wise)
* Studiensemester
* Lehrplansemester
* Studiengang
* Veranstaltung im Rahmen derer die Entwicklung durchgeführt wurde
* betreuender Dozent
* Genre des Spiels
* ggf. passende Tags/ Schlagwörter zu dem Spiel
* Untertitel (max 40 Zeichen), der Menschen zum Spielen animiert
* Kurzbeschreibung (max 250 Zeichen), die kurz erklärt wie zu spielen ist
* Erklärung, dass die Fakultät Digitale Medien die Anwendung bei Veranstaltungen, insbesondere am Tag der Medien, mit einem expliziten Verweis auf den Autor, vorführen darf.