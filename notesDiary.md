## Notes

This diary style note file is an idea that was suggested by my research methods and techniques course. It will mainly just be a place to write notes and put any ideas I have on a page.

## 2 Nov 2020

I will try and spend most of my project work today on designing wireframes for the look and feel of the main board style page. It will only really contain the board and the piece selection menu held on the left mainly. Wireframes could also possibly be made for the idea of loading in a different puzzle, so maybe it could have a list to select from different puzzles which then can be loaded into the main board page which I'll focus on cleaning up this week.

A couple of wireframes have been made so far, 2 for the main home page and one for how the board component should be cleaned up. I think I'm leaning more towards the second design as I prefer the focus on the virtual board with the idea to have menus that can be hidden away. These may be easier to work with different sized displays as well. The board component just needs its ratio fixed with a nicer display to have the numbers inside the colour marble they represent. 

## 3 Nov 2020
Will focus on making another wireframe for the main page that will aim to improve on the 2 initial designs made yesterday. 
Wireframe 1 is a fairly basic design which is based on common web apps made during level 2. The top level nav bar is not something I like too much but the 2 side bars for the board are quite nice.
Wireframe 2 is slightly cleaner design but the second part should maybe not be connected to the side nav bar and ensure that these can be pulled in and out when the user wishes. The left part of the sidebar (the bit with pieces in it) could maybe be left as it will change based on the page? For example if it is default puzzles this should be a list of puzzles which when selected will display the board in the centre which will act as it starting board? Plus piece conditions.

I like my third design a lot more than the first two, it looks much cleaner and is much more focused on the board itself than the other parts, like options etc. Think the idea of a sliding menu with nav is a nice touch too.

## 4 Nov 2020
Will rewrite a few of my paper summaries today to make them more suitable for the lit review, will try and work on the appearance of the site for a couple of hours at least too, probably focusing on getting the side nav bar as a first important part.

Header has been created that contains the title, menu icon and a link the github source code. The default theme was always changed. 

## 5 Nov 2020
Want to get as much of wireframe 3 implemented today and then move onto the board wireframe if possible. Don't really want to spend more than this week on appearance so I can get more of the logic done for the other main features of the app, so hopefully it goes well and has no major set backs. 

A bit slow on making the nav bar and side bar but happy with the results, made a few silly errors trying to remember some css but got there in the end. Plan to get the board done tomorrow and I'm fairly confident it'll look quite nice at the end of it. 


## 6 Nov 2020

Plan to get the rest of the board finished looking nice today, then can maybe take a step back and look at where else the project should go, check my plan and update it to reflect the progress made during this week but hopeful the project will continue to go well without too many hiccups.

Board is looking good, just got one small bit to do with the collected marble counter then I'll be happy to move onto another section of the project. 

The board and the main screen now match the wireframe I made at the start of the week which is awesome, a bit slow in parts as I needed to re learn some basic css and get it working nicely with a sliding view but happy with the result so far. Next week will be concerned with more logic I think. 

Adding an option for blue and red marbles to be added and removed from the dispensers. A button has been added to remove the board of pieces as well.

## 9 Nov 2020

The lit review for RMT has been finished, while not 100% part of the project it still took a lot of time away from dev work and I tried to make it as relevant as possible to the work I'm doing, so I plan to use a lot of the research I gained as justification for the use of this web app and why it can be important for people to use. 

I should spend some time today and this week working out the exact architecture of my current code and developing a refactor plan, doesn't need to be hugely in depth just needs to help make the next feature easier to add and maintain. Tests should be made after the plan for some features to make sure I don't break anything when I refactor. SVG graphics should be added so the pieces look better than just text. 

A UML style diagram has been made for the boardService and the angular components that it is injected into. Some major smells that can be identified from this include how large the board service is and the number of methods it includes. A lot of components uses this service which is okay but a lot of components uses just getMarbleInPlay so it can show if a marble is in it's position. Could maybe have the marble as an input value instead, might be a good idea, will use the lifecycle hook for the marble instead of having the components being dependant on the boardService. For some of the components in the comp-slot piece, there is a lot of repeated code that could probably be made into one component that uses the piece's methods to change it's values? Should the board class itself be dealing with a gearBit spin or maybe the service should be dealing with the change?

One refactor that can definitely occur will involve the different components being changed into one main piece component that will call the individual piece click functions, might need to keep the separate component for the gearBit component however to ensure it works when it gets clicked.

For the boardService, could take some of the methods out of the service and have them in the board class itself so it's more manageable? Then the boardService would be able to interact with different boards more easily without needing to change a ton of stuff. 

Need to look at boardService and see what methods can be pulled out, if done then look at the implementations and fix anything. Create another diagram for the boardPieces interface and those classes for example. The methods in the board service are all related to the board class so it would be difficult to pull this out without creating strong coupling between two classes, might be better to move some of the methods from the service into the board object class instead. 

# Refactor plan

* Send the child component the marble in play from the board component - doesn't work
* One component for all the pieces, that just uses the piece functions for any clicking or SVG icons - implemented
* For gearBits it may still need to be a separate component as it will need to access the board service
* Pin and comp slot component could maybe be moved together, but might be difficult to ensure that pins don't get pieces - Not worth the effort of implementation 
* boardPiece should have an image and a click function, this will act as a changeDirection for some pieces - done
* General improvements in the board service, maybe put it in a module so it is only created when accessing a page and it's board?
* Maybe have a look at @Output as a way to send data up from components to its parent (so compSlots up?)

# 10 Nov 2020

Not going to have too much time to do work today but I plan to start the initial tests and find if any major issues appear. Tests went pretty well for the first day, got some decent unit tests done for the app component and the board service. The component was a bit harder to test as the html elements where required to be found and captured and I struggled to get button prompts to work but that might be meant for e2e tests instead. Board service was much easier and a good selection of tests where made for it. Tomorrow should make some more tests plus some e2e tests as the most important ones. 

## 11 Nov 2020

More tests should be made today, focusing on e2e as those will be the best ones that won't change after refactoring is done, unlike say the board service tests. All initial (major) unit tests have been made, around 30 in total, more can probably be made but they wouldn't be as important. 

Had some errors with e2e tests at the start, but should be easy to get some more in tomorrow so I'm not too worried. 

## 12 Nov 2020

Plan to get a few more e2e tests in but maybe not spend too much time on it as the refactoring is the most important part of it all. Implemented the start of the refactor plan which involved getting rid of board piece components and making a general one which is nice. Tried having the marble as an constructor property but it didn't work. Change it to an input property of the board component and that worked, meaning the components of pieces don't need to use the board service. All board service logic has been moved to the board class, this is as it's that objects data and if we need a different type of board down the line it means the board service can still use it.

## 13 Nov 2020

Going to have a more chill day today and focus on getting the images to appear on the board, this might take some time as I'm rubbish at drawing but the code isn't too bad. All the SVGs have been finished, just need to sort the marble being visible when falling. All the SVGs are up, one way to improve the board in it's current state is to have the images instead of names (or both) on the selection bar, should also include some sort of tutorial for the pieces. 


## 16 Nov 2020
Don't have too much time to get a ton of project stuff done today but can certainty write up my plan for the next section of the project - puzzle creation. Most of the ideas seem good so far, just need to implement them this week and hopefully there isn't too many issues with it.

Rough Puzzle creation plan (not in order)
* MakePuzzle component - done
* Make confirmation part - done
* Make puzzle board.ts - done
* Add set of pieces to board object and make pieces enum - done
* Move create piece to board.ts - done
* set up delete piece function - done
* Set up locked var on piece to determine if it can be clicked and deleted - done;
* Create createPuzzle service - done
Board service needs to set board instead of just having a base one, meaning the functionality of the service can be used for different board, in our case a puzzle board. - done
* Make sure pieces doesn't use click in it's process marble - done

Make puzzle component
* Will include board plus selection bar and buttons for lock in - done
* Will need a prompt box to give instructions when creating - done
* Confirmation component will have a form in it so use a service for this - done

Puzzle board will extend the current board
* Two new slot arrays for starting setup and final set up -done
* Will have a set of pieces that are allowed - done
* Board object should have the set of pieces then selection component can use this - done

Puzzle board.ts
* startingSlots[][] -> used when resetting the board and will make these pieces locked - done
* pieces: record type - done
* solutionSlots[][] -> used if someone is stuck -done
* needs a finial marble pair solution that is used to check it later on -done
* update updateList to check if current pair equals the output needed - done

Create puzzle service
* sets the starting, final and marbles- done
* then can create a puzzle object which has a puzzle board plus name description etc - done

The makePuzzle service will create a puzzle object which will get saved to a firebase server that can then be accessed using either the default puzzles page or the online puzzles page but there will need to be a new page to access and play a puzzle which may get done this week. 
 
* Change a lot of the components to using Output() instead of board service. Will help lead to more reusability later on. - done

Should first reorganise the app folders, to make it more readable 
All components should be in a component folder, and objects should be in an object folder, services can also be placed in their folder as well.

## 19 Nov 2020

Forgot to make an entry yesterday. The day went okay got a good amount of progress but had a really frustrating error to do with passing the Map object of pieces to numbers down to the selection nav bar that was rather frustrating tbh. Got it eventually after using an angular pipe but before hand it was throwing errors about a child component changing the parents data, which goes against angular practices and would lead to more errors down the line. Will be spending the day continuing with the checklist of things to do with the make puzzle, hopefully not too many issue arise. 

Delete functionality is in now, can either make a new delete Piece or just send the heldPiece as null, meaning it will delete. Think it's better to make an explicit delete piece, to reduce sending nulls around.  

Got a large amount ticked off the list for the make puzzle, think there may be an issue with the general lay out of the app as components such as comp slot and pin are using the board service but they should really be using output so that the parent component which may be the using the make puzzle component, as if I put a puzzle board into the new section but then comp slots will use the board service click instead of the new puzzle service click, so focus on that tomorrow. 

## 20 Nov 2020
Plan to continue with the puzzle board making today focusing on getting the components up and running and reducing the need for components to use the board services if possible.

The board service was deleted as all data that is used by classes comes from their parent component. This is better practice and was a good way to reactor it down. Can now make a puzzle successfully so will focus on focus on making a confirmation component that will get the details of the puzzle so it can then be saved on firebase server. Very happy with progress.


## 23 Nov 2020
Very happy where the project is currently, will continue the pieces needed to make a puzzle, might start the process of getting a firebase connected to the app and then having the puzzles saved in JSON format or another way.

Didn't get on too making the puzzle saved to firebase but will work on that later on this week. Got puzzles saved correctly and can now play them.

* Need to make playPuzzle component that removes somethings from the make puzzle component like the prompt maybe
* DIsplay the expected output maybe in the prompt?
* Just display marble amount don't bother making it with buttons

* Get firebase installed first so then I don't need to make a puzzle every time I want to check something  


## 24 Nov 2020
First and only main focus of today is getting the firebase set up, anything else is a bonus, once that is done. It'll be much easier to make it easier to access puzzles etc and make sure nothing breaks. 

Got the database connected and can successfully upload the data. Have an issue where map data doesn't get sent up so need to change that to Arrays and then re convert them when I download the board. When the board is downloaded all it's type information is lost so need to cast everything back into it's correct type otherwise the board breaks.

## 25 Nov 2020
Changed it so that the data is sent up as a JSON string, meaning the representation of the data doesn't need to change. Only issue is that when the data is sent up the type information is lost so need to parse the data back it's it's type when it gets downloaded. 

Data can now be uploaded and downloaded correctly. I should spend the rest of the day making sure it is easy and fun to play a puzzle and flesh out the component responsible for playing it.

15 puzzles have been uploaded 

# 26 Nov 2020
Theming has been overhauled plus the play puzzle component has all been finished, I like the current look of the app quite a lot. Will move on to making the list of puzzles nice tomorrow then maybe some auth after that 

# 27 Nov 2020
The list of puzzles has been made to look really nice and it allows people to see the description, starting slots and expected results.

Will move onto making more puzzles this weekend then move onto the tutorial page next week. But the project feels mostly done now. 

Move pieces in order of difficulty 

Make a list of things that can be improved with the app

* More tests and possible refactors 
* Flesh out issues I found from notes - important
* User page? Maybe ability to save user data (Not important)

Completed 
* Maybe save boards with JSON? - done
* Make plain board have a cool puzzles examples - done
* Make SVGs have a white outline to improve visibility - done
* Make more SVGs for marble position for a piece - done
* Add authentication - done
* Loading bar for default and online puzzles - done
* Dark theme button - done
* Add difficulty filter to puzzles - done 
* Add the rest of the default puzzles - done
* Show solution button for play puzzle - done
* Reset marbles button for puzzle board- done
* Make tutorial page - done
* Home page - done
* Github io - done
* Split bottom bar into two colours- done

# 2 Dec 2020

Using a mat 'chip' system to allow users to select between one or multiple different difficulties, hopefully works out well tomorrow. A bit of a process atm tho

# 3 Dec 2020

Last couple of days has been plain sailing with the list of improvements, will focus on making more notes the coming days. The difficulty filter has been completed using a mat-chip system and some functions to make sure it only adds the values allowed. No major issues, just focused on catching the changes at the removal and addition of items, could have changed the functions to be more efficient in removal but I don't think it would be worth it.

Having a look at the main Turing Tumble page, the examples should be copied and viewable on the home or plain board page.

Change the sidenav to let non logged in people use default puzzles

# Tutorial page notes 
Use a tab style system, general instructions, components, making puzzles

General instructions should talk about the selection bar with the components being 1 colour and the options being another, these components (other than the gear) can be placed on a comp slot etc. Talk about deleting a piece, if the ball falls off the ball will stop etc, Go through a list of the options. 

The Component tab should have a table of the pieces, what they look like and a short description of what it does. 

# 4 Dec 2020

Board should have some sort of marble details panel which can say when a marble has fallen, what position it is in etc. 

The tutorial page has been created, I'm happy with it's output and think it focusing on the important elements of information without it being too fancy or anything.

# 7 Dec 2020

The list of possible features has been updated for the last 2 weeks of the project, I will spend most of these two weeks focusing on making the best code I can, but will want to spend some time near the end doing documentation and getting it all ready for the dissertation next semester. One of my friends was kind enough to play about with the app over the weekend and gave a few suggestions that I will add below

* Fix double scroll bar - done
* Can Toggle to say play / pause - done
* Make title a little bit further away from the hamburger icon - done
* Fix typos - done
* Possible re design of homepage - done

Bugs
* Reset board doesn't reset last row of components - done
* Toggle spam - done 
* Fix interceptor stuff - done
* Footer on puzzle pages - done
* Icons still not all there on web - done
* Auth not working on web, just had to add domain to firebase - done

Improvements 
* Could maybe make a step backwards button (think focusing on the write up and objectives of the project are more important than adding cool features)
* Maybe interactive tutorial but not high priority 

Mostly dealing with bug fixes today, happy with how it progressed and what I got done. The Auth issue with github pages is a strange one that I'll hopefully get done tomorrow. 

One problem involves data saved for the original puzzles, when downloading them, they keep the data they were sent up with, so assets, inPlay etc that when fixed later, can't easily be updated again without re - updating all of them. So need to ad hoc fix them when they are pulled down, which is rather annoying. The readonly var modifier should work on typescript when using object assign but it doesn't.   

# 8 Dec 2020

Authentication was fixed, I forgot to add the correct domain to the firebase authentication section, so it didn't allow login from that domain. 

Trigger buttons are now disabled when they can't be clicked, i.e. the ball is in play and not paused. 

Interceptor glitches were fixed. A possible in play marble viewer was looked at but decided against after quick implementation as it didn't seem like a needed feature. 

Going to spend some time on the home page redesign instead. 

Home redesign is going well, think I'll change the featured puzzles to featured board examples instead, meaning I can reduce download and have a nice link to some cool boards instead I think. 

# 9 Dec 2020

The home redesign is currently going well, this morning will be spent making the featured examples.

Example boards took much longer to make than expected, pretty long work to get all the pieces in the right place and working, but that's done so i'll add them to the home page

Uploading and saving a board of JSON works nicely, has some error handling so people won't be able to upload anything but text files that the JSON can parse.

The plain board page has been updated with buttons to save and upload a board. 

# 11 Dec 2020

After a fairly slow morning fixing all the broken tests, trying to get all the import stuff working, the rest of the day will be spent working on more tests, focusing on the classes over the components.

All the classes now have a good set of tests, will focus on some component and end to end tests next week or this weekend, then spend a little bit of time cleaning up the code


# 14 Dec 2020

After some play testing by my family over the weekend a few extra bugs were found and then fixed. Other suggestions have been taken on board and will be worked on today, including some more points in the tutorial page

Additions to tutorial page has been made plus some bug fixing.

The app is all finished just a few more tests to add tomorrow then can focus on fleshing out the documentation and start writing out notes for the dissertation. 

# 15 Dec 2020

A few more e2e tests should be make today then I'll focus on cleaning up the code and trying to reduce duplication and any unneeded comments or console logs.

Clean up of code complete, it will still be a little rough around some of the edges but it's at the stage where it is not enough value from the amount of effort needed to completely refactor it all. 

Online and default puzzles are now just middle men components to the puzzle list component, reducing a lot of code duplication. Should really have gotten router para to work but I couldn't get that to work in time.

## List of problems I faced during Development 

# Issues experienced during development

### Passing Router parameters

One way originally attempted to reduce the amount of duplicated code between the 'Original puzzles' and 'Online Puzzles' was to have both pages use the same component but for it to pass a different parameter to the component based on the 'routerLink' clicked by a user on the navigation bar. Meaning a button titled 'Original puzzles' would router to a puzzle-list component but also pass a string 'original-puzzles' as the path to access the correct list of puzzles from the Firebase server. The same would have been done for the 'Online puzzles' page, however when passing this parameter to the router it would work when clicked originally and display the correct list, but if a user was to navigate from 'Original puzzles' to 'Online puzzles' the routerOutlet would still point to the same component and would not call 'ngOnIt' which was the lifecycle function required to pull the data from the Firebase backend. It would be entirely possibly to fix this error and ensure that whenever the url parameters changed it would update the component view but due to my limited experience with Angular I decided the effort required to fix this and gain a better design wasn't worth it compared to the fix of still having a puzzle-list component containing all the main logic but then having the 'Original puzzles' and 'Online puzzles' just act as intermediary components passing the correct 'Input()' to the puzzle list component. 

### Converting data pulled from backend server

During the design of the application, I decide to focus on leaving the data and methods to modify that data within the variety of typescript classes created and maintained in the 'Classes' folder. This includes the Board, PuzzleBoard and Puzzle class for example. This let me focus on the development and design knowledge I had of working with the OO paradigm. Meaning all the data related to a board was stored within the board class and any methods required to update the board i.e. dropMarble which would release a new marble and have it fall down the board, was also stored. This presented no problems for the majority of development and I am still confident I made the right design decision. However when it came to uploading data to a backend server to Firebase, some issues arose. One issue was that the data stored in the Firebase server would lose it's type information. This meant that when I downloaded a puzzle for the user to play and send it to the board component to display this data and the options the user has to interact with the board. The data would throw an error as all the methods required to implement the board logic was unavailable as all the data downloaded was stored in base Javascript Objects instead of the created custom types. This was likely due to my inexperience of working in a web environment and focusing too much on using Typescript custom classes.

To fix this issue of losing all type information of the classes, I had to set up converter functions in a service class that would take the data and then recursively call Object.assign() function from the base JS library which would create a class instance then copy all the data from the passed value. This solution worked well given the circumstances but does lead to some slow down when pulling the data from the server.

One issue with this method however is that all properties are sent up and then downloaded later, even properties that are static among instances, e.g. the path to a pieces SVG icon. This caused issues later down the line once all original puzzles were uploaded but the asset path later changed so when downloading and parsing the objects, the specific pieces needed to have their properties correctly updated. This is not the most efficient fix to the problem but it more time effective than reuploading all the puzzles made previously. I had originally tried to solve this issue by having the different properties on the typescript class as 'readonly' so that when Object.assign() was applied to a version of the class it wouldn't rewrite this data, but this was sadly not the case so the previously mentioned method had to be used. 

### Storing the data held by a puzzle object
A puzzle is represented by a class which contains a title, description, difficulty and a PuzzleBoard object. The first three objects are merely simple strings however the last object contains a puzzleBoard which contains all the data required to store a board with pieces, solution pieces, amount of marbles available to a player etc. This class is quite large with a lot of relevant data. When i originally tried to upload the data to a Firebase database I just sent the entire object up as stored, this caused a few problems, mainly that Firebase has a (sensible) feature where it will not stored a field that has a 'null' value. However my classes use 'null' to represent an empty board slot (which is common) or fields that will be updated when they are used i.e. inPlayMarble field. This lead to a lot of data that was lost when I tried to download the data I required from the server. I originally tried to refactor the code to reduce the amount of null values in the objects can including Empty values for classes, i.e. a object which would represent an empty slot. However this was time consuming and lead to a lot of errors when trying to implement this with the current design so a solution was to send the data up as a JSON string, which stored all the data, including the nulls as is and meant I could keep the current representation of different fields. The use of null as 'empty' is not a desirable practice but was found to be the most effective and understandable in the contexts they were used in, so I decided they were acceptable in this circumstance.

### New GearBit when turned
One of the requirements and most important part of logic for the Turing Tumble is the feature of having GearBits and Gears connected together meaning the turning of one GearBit will also turn a connected GearBit. This feature is the main function that makes the board game 'Turing Complete'. This was quite a difficult feature to implement and the original version of it had the GearBit object themselves calling the function in the board service which would check if it needed to change it's direction, however this caused warnings from the Angular system as a child component would have it's data changed after the View had been rendered to the screen so would go against the View lifecycle implemented by the Angular system. This meant that the function would require to create a new GearBit object instead of editing an existing rendered one, bypassing the View lifecycle. However once refactoring was completed and the functionality was moved towards just the board object instead of being in the GearBit class, the objects can be successfully have the direction changed without needing to be remade. It also was fixed once the Pieces, in this case a GearBit was given to the Piece components as Input from the parent component which stored the board, meaning the View hierarchy was preserved as a parent would edit a child, whereas before a child component would edit it itself and try to update the parent class as well causing warnings.

### Map Object passing
I had an error where I would want to send an angular component a Map object containing a list of pieces and the amount available for a player in a puzzle, this was a Map of type String to Int. This property of the PuzzleBoard object was passed as an input parameter to the Selection Bar component, however this caused some strange errors where Angular would say a child process was changing parents data, which I couldn't work out for a while until I found a Angular pipe that was the correct way to pass key/value data, a very strange error that took much longer than I would like to fix it.

### Sets not checking objects
For the implementation of GearBit functionality, a function was made to find the set of all connected GearBits, these GearBits were connected by Gear components are were found using a version of breadth first search that stored the visited Gears and GearBits and stored it in a set. One issue that was found was the lack of complete understanding of a JS Set, Angular uses Typescript which is a super set of JS which includes explicit typing of variables and makes it easier to create custom classes. The version of the JS set caused issues however as it wouldn't be able to distinguish between different instances of a custom class, so when the same Gear or GearBit piece was added to the visited set, JS wouldn't check if they were the same as no two instances of an object match even if they are actually pointing at the same instance. This caused issues when clicking a GearBit as it wouldn't exit the loop trying to find all connected pieces, so the visited set would be added to infinitely.  So to get around this error I had to use JSON.stringify to turn the object into a JSON string that could then be stored in a set and used correctly in the breadth first search algorithm. 

### Map Objects not getting sent to Firebase
As previously mentioned to get around the issue of storing the puzzles in Firebase, the object was sent up as a string of JSON which could later be downloaded and converted into it's correct type. One issue found was that the JSON.stringify method wouldn't correctly turn a Map object into it's JSON counterpart so would just leave it out, this lead to issues of puzzles not being correctly uploaded so the Map object had to get converted into an array before upload then re converted into a JS map object when downloaded.       




### Semester 2

## Notes on Hall of fame dissertation, don't need every section and can add more

## Abstract

Nothing too surprising here, write at the end like always and draw on main conclusions found during the paper. 

## Introduction

# Motivation
Why is this project important, why did I make a virtual turing tumble. I can go into detail about some of the research I did about educational games but focus on having an easy way to access and use the game compared to the physical version. Focus on why someone might want to play with this game or why a class may use it.

# Goals
List main goals for the project and give a good paragraph to the exact reason why it is a goal, can put a few design decisions in this part i.e. included a tutorial. Talk about the logic of turing tumble, what should work, what shouldn't etc. Allow students to use it, save puzzles etc


## Background

Provide information on the background of the Turing Tumble and some of the logic of the game here

Talk about the 2 (or three) existing virtual versions of the game and disadvantages of them

JsTumble, virtual turing tumble and possibly the VR one but I can't use that one so probably not too important. *PUT IN REFS*

Include picture of the pretty one

## Analysis / Reqs

Include a list of functional reqs of the project, might be a good place to start off with. Talk about the main objective, simulate a turing tumble board so needed to easily allow the building of the board but also the understand exactly how the game works when the marble falls so speed controls etc

Make sure to have non-functional reqs as well and to not get them confused with the functional reqs

# Chosen limitations

Any parts of the game that I simplified for the user, not too many but can talk about how balls 'fall' I suppose, didn't allow for edit of the board etc
Maybe talk about why I didn't add animation but maybe not. Can maybe talk about why I didn't end up having enough time to make phones use it?

# Changes to spec

Not much change tbh, possibly that I got some basic levels of animation done (svg turning) and that puzzles were indeed added even tho they weren't a 100% required feature

## Design

This will be quite a big section about exactly how I decided to design the various elements of the app so how to represent a marble, components etc 

components, puzzles, board how and why I made them as classes with focused types

talk about pins vs comp slots, ramps versus bits etc. Puzzle boards vs normal boards

Talk about UI in this part too, can talk about why I used material UI (ref) for consistency and visual appeal, which is required in a game designed to keep users engaged

Talk about home page, side nav bar, puzzle making etc

Can add wireframes here too

Add a section as to why I choose Angular compared with React or a desktop application

## Implementation (biggest section)

Can include pictures of the final app and talk about the UI implementation using mat ui possibly 

# Aesthetics 

Talk about why Mat ui was used, it's a Google standard, it focuses on clean and crisp appearance while trying to stay as simple as possible. Include pictures of components and the board with components

# Features

How the different features were implemented, exact class details here I imagine

# Deployment

Why did I put it online instead of having it as a desktop application

## Evaluation

Get results from surveys 

Or talk about issues that I have found i.e. when does marble 'fall'

talk about the limitations ie that ideally this can be used in more than one session and that it takes some time to read the tutorial and play through the puzzles to really understand the game

How to verify the non-functional reqs of the app

Write about unit tests and end to end tests here

## Conclusion

Summary, how the features went, what more can be added and reflection on the project as a whole

## Appendices

Include surveys at end 

Include results of these surveys as well


## Surveys notes

Can be a survey but should also supply a task for them to do i.e. play with a plain board and make it go down the screen, make a basic puzzle etc and ask questions on how easy they found it

Can maybe look to monitor some peers while they do this and take some notes for UI stuff mainly 

An unmonitored user test maybe?

Should create a list of tasks for the users to perform with the website, focus on the main features of the site. After making the list of tasks, a survey should be added afterwards to ask about the general feel and how they found the site to use and if it helped them understand how to play the game and the educational use of the Turing Tumble.

Task 0 - Open and navigate to the tutorial page (Can spend a little time reading the tutorial 5 mins)

In monitored evaluation can also provide more help to this


Task 1 - Create an example using the plain board
Click ramp and add to the comp slot under the blue arrow, then trigger the marble. Notice which direction the marble goes in, click the ramp to change it's direction. 
Fill in the rest of the board like this. Then display basic ramp pattern and ask them to run through this task and notice balls falling and then spiting out of the top

Make them use the reset marble option and add more marbles to the top

Task 1 - cont, display basic bit pattern as shown and focus on how bits 'save' state (maybe add a bit here about why this is important)

Get them to add GearBits and Gear in a patten and explain how GearBits can add complex logic to allow the Turing Tumble to be Turing complete. (Monitored task online)

Task 2 - Load example 3 addition and give basic recap on binary and how it faces down, then after that make them play the pattern
After they click on the button they can then trigger the blue marble and follow the marble down the screen. Ask then to pause execution, play and step forward and increase the speed.

Task 3 - Play a puzzle 
In the difficulty filter, filter the list to patterns with difficulty of 3 & 4, click on say puzzle #15 show the different tabs then delete the filter and move back to puzzle #2

Allow the user to complete the puzzle with their basic knowledge of the game, ask them to try and delete pieces when they place them and then try to place more pieces then allowed 

Task 4 (Optional) - Ask them to create a puzzle, based on ramps and bits (give them a starting set up), then ask them to confirm these pieces, add the final pieces and run the puzzle, then submit a form at the end.


## User Evaluation form notes

First page will the ethical consent which I will write up soon

Task 1

Did you complete this task?

Have you heard of a Turing Tumble before?

How easy was it to select and place pieces onto the board?

Would you suggest an improvement to placing pieces on the board?

How easy was it to understand when a marble 'fell' based on the interface?

How easy was it change the direction of a piece on the board?

How it clear how many marbles where collected at the bottom of the screen?

Do you have an suggestions to improve the experience of the previous task?

<!-- Monitored question -->
How intuitive was it that two Gearbits were connected?

Do you have any suggestions to improve the use of GearBits?

Task 2

Did you complete this task?

Has this task helped you understand the concept of bits and registers better?

How easy are the piece icons to uniquely identify?

How easy was it to understand the different playback options available?

Do you have an suggestions to improve the playback features or ease of understanding the pieces?

Task 3

Did you complete this task?

How clear was the puzzle list?

Was the information relevant to choose a puzzle?

How useful was the difficulty filter?

Would you suggest any other types of filters or search features?

How clear was it that some pieces couldn't be changed or deleted?

How clear was it that you only had a certain number of pieces to complete the puzzle?

Do you think these puzzles would assist in learning the Turing Tumble?

Task 4 (extra)

Did you complete this task?

How clear was the create starting set up phase?

Was it easy to come up with a puzzle by thinking of the solution?

Would you want a different way of creating a puzzle?

Would you want to add any more information to your puzzle's description?

Any more suggestions to add?

~20 (+5) mins 


From quick evaluation from friend on task sheet. It was proposed that too much information was given to perform the tasks and that some of the help should be cut out to reduce it feeling like a tutorial. This will lead to more accurate responses for how easy it is to navigate or place pieces without explicit instructions on how to do it.

# 15 Jan 2021

Plan to write up the ethics brief and debrief for the evaluation tasks. - done

After that work on the documentation for the various parts of the code on the main wiki. 

After that start writing part of the dissertation, maybe the implementation part just to get something written down for it. 

# 20 Jan 2021

Continuing on with the documentation on the wiki, taking longer than expected but is handy as it reminds me of all the different parts in the code and helps give the big picture before trying to start the implementation stage

* It looks as if the Pin and CompSlot component can be refactored into one, might want to give this a try at some point. *

# 21 Jan 2021

Create the form with questions, make consent form, checklist needs to be signed. 

Get all those sorted and sent away with list of who to do the monitored questions

Consent forms sent out, I shall wait for all the responses and then start the evaluation stage

A typo in the tutorial should be fixed

# 22 Jan 2021
For the monitored experiments, use a table that has the number of times the participant needed help and any suggestions or questions they have.


# 27 Jan 2021

Notes about the evaluation section

First paragraph should be why I carried out evaluation, at this point I will have a list of goals that I will want to meet, so the evaluation will be needed for this. Should also include some details about the Unit Testing that was performed and what I managed 

Unit testing
Unit testing and e2e tests, what was tested, what wasn't why? etc
Include coverage report

Include the task spec at the start of the monitored and unmonitored and can talk about the extra task for monitored and why it was left for just the monitored part

Monitored user test 

Who, why, talk about the task sheet length etc, as the tutorial sheet should give all the explanation that is needed. 

Task explanation, talk about each task and what they had to do and why

Monitoring

Talk about how the tasks where monitored using a Zoom call and was recorded, questions, notes of when they went wrong etc

Talk about the evaluation questions. What they were about why they were added etc, how long form answers were given about certain features of the program 

Results

List the suggested improvements given by the users

Improvements that I noticed after observing the users

Then go into details of what the evaluation responses showed

limitations of the study, online, who is the main target audience?
Really need more time with the game to understand how likely they would be to keep coming back and using the website for a prolonged period of time
They didn't all know how the board game worked so some didn't understand how the parts all worked etc

Some users asked lots of help to clearly gain more information about how exactly the game worked while others were happy to quietly work away at the tasks without much issue. As I couldn't' physically observe the user it was difficult to know how many times they exactly read the task sheet so the times asked for help was only when the user audibly asked questions. Other times 2 users played the puzzle incorrectly so help had to be given to tell them how to play it properly.

Can include some tables of feature ease of use

Unmonitored user test part


A part on future work, personal evaluation on sections that could be improved



After eval part written up, should look at getting a list of functional and non-functional reqs. Once these have been written up need to talk about how these are meet, from either the unit testing or the user evals

How good is the program? 


For next time, focus on going through the implementation stage




