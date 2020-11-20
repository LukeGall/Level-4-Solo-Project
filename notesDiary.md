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
* Make confirmation component
* Make puzzle board.ts - done
* Add set of pieces to board object and make pieces enum - done
* Move create piece to board.ts - done
* set up delete piece function - done
* Set up locked var on piece to determine if it can be clicked and deleted - done;
* Create createPuzzle service
Board service needs to set board instead of just having a base one, meaning the functionality of the service can be used for different board, in our case a puzzle board. - done
* Make sure pieces doesn't use click in it's process marble - done

Make puzzle component
* Will include board plus selection bar and buttons for lock in
* Will need a prompt box to give instructions when creating
* Confirmation component will have a form in it so use a service for this

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
