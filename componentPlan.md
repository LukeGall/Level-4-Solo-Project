## Rough plan for components and services for project

## Plan 1

The main components would be a Board component that would have a 2d array of pins and slots (retrieved from a service), which we can make as a board class.
Would then make components for every part that can be placed onto the board, store these in a folder for clear formatting, again these components should only deal with UI and interaction with the templates, logic should really be stored in services. 

Angular should use services to store and pass data (the board) to the components, this data should be updated by the service as well. So the components will be used almost solely for UI logic but the service should store any application logic. Maybe the classes too.

The board class should have an array of 'slots' where slot will be an interface that will be extended by either pin or componentSlot (compSlot). The basic interface will contain name, pin will extend this with an option to hold a gear, while compSlot will be able to store a component (bit,ramp etc)