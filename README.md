# Project1
This project was created as part of a test and uses the React-Native framework to implement Google and Facebook sign in in conjunction with Firebase database to sign the user into one of two chat rooms. These chat rooms are also handled via Firebase database setup and allow communication between the logged in parties. 

Note: This project is not fully functional in all aspects and should not be used as a definitive solution. 

## Installation
Step 1: Download the main master project file and unzip it where you want it. 

Step 2: Use a command prombt to navigate to the source level of the file (the one with the App.js file).

Step 3: From there, run 

```
$ npm install
```

and wait for it to finish. 

*Before running android build, setup Android Studio*

Step 4: Run the project on the Android device of your choosing or a virtual device, by way of the following command.  

```
$ React-Native Run-Android
```
The project was tested and run succesfully on a Samsung Galaxy Phone (Android 5.1.1, API 22)
And a Nexus 5X API Oreo 27 virtual device. IOS is untested. 

##Known Instalation Issues
A issue I ran into when first running the downloaded github folder was an error code: 500 related to not beeing able to resolve a module. In this case it was the import path from App.js to the Stylesheet. The error resulted in the Stylesheet part of

```
./screens/Stylesheet/Style
```
changing from lower s to upper case S and ruining the import. In response s was made uppercase in general and the issue has not resurfaced in subsequent builds from Github, but it is worth keeping in mind should a similar error appear.  


## Known issues
The facebook sign in is non-functional. Despite opening a facebook sign in function, the sign in is not passed on to Firebase and no sign in occurs within the app. 

Yellow warning about setting a timer for a long period of time. Introduced with integration of Firebase database connection. No observed problems so far, but attempts to find cause have been unsuccesful as well. 
