## Rough plan for components and services for project

## Plan 1

The main components would be a Board component that would have a 2d array of pins and slots (retrieved from a service), which we can make as a board class.
Would then make components for every part that can be placed onto the board, store these in a folder for clear formatting, again these components should only deal with UI and interaction with the templates, logic should really be stored in services. 

Angular should use services to store and pass data (the board) to the components, this data should be updated by the service as well. So the components will be used almost solely for UI logic but the service should store any application logic. Maybe the classes too.

The board class should have an array of 'slots' where slot will be an interface that will be extended by either pin or componentSlot (compSlot). The basic interface will contain name, pin will extend this with an option to hold a gear, while compSlot will be able to store a component (bit,ramp etc)


## Plan for marbles

Should first add two new objects, one to represent the marble dispensers at the top and another to represent the flippers at the bottom of the game board. 

The marble object should contain 3 properties, one for colour, one for direction (left / right) another for position which will be (x,y) related to the position it in on in the board

The board class will be updated to contain the dispensers and triggers which will handle UI logic and the trigger class will call the release marble function held in boardService. The board will contain a list of marbles it holds and will release a marble in play when the trigger fuction is called. 

dispenser should be a component{
    colour: String (but later actual color value)
    marbles: Marble (Will be updated and pulled from the board parent object using observables)
}

flipper should be a component{
    colour: String
    trigger()
}

marble {
    direction: Enum left = -1, right = 1
    colour: string (but later actual value)
    position:Pos (x, y related to the board slots array)
}

board object{
    blueMarbles : Marble[]
    redMarbles : Marble[]
    inPlayMarble: Marble;
}

board service {
    trigger(colour) : Marble
    processMarble(Marble)
}
