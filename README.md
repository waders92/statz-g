# statz-g

**MEAN** stack application used as a platform to learn *NgRx*.

Application uses *Passport* for user authentication. Front end is written in *TypeScript* using *Angular 8*. The backend runs on an *Express Server* and
uses *MongoDB* for storage. When the user logs-in, data is loaded to the store via - *NgRx effects*. When the user logs out, data is cleared from the store with 
a *dispatch action* to reset the stores state.
