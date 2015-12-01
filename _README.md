# Bus It Baby!

> An awesome mobile app that eliminates the chances of you missing your stop while riding on a bus. 

## Team

### Greenfield Team:
  - __Product Owner__: Alon Robinson
  - __Scrum Master__: David Lee
  - __Development Team Members__: Hera Kim, Mykia Smith

### Legacy Team:
  - __Product Owner__: Alice Green
  - __Scrum Master__: Shan Batla
  - __Development Team Members__: Shan Batla, Alice Green, Sam Bowler, Peter Park

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> 1. Select your starting point and end point.
> 2. Choose the how far from your stop you want to be notified.
> 3. Choose your alarm: sound or vibrate.
> 4. Take a nap and Bus It Baby will notify you once you've reached the point before your stop.

## Requirements

- Node 0.10.x
- Cordova
- Ionic
- Angular
- Firebase
- AngularFire
- Google Maps API
- HTML5 Geolocation

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g cordova
sudo npm install -g ionic
npm install
bower install
```

### Roadmap

View the project roadmap [here](https://github.com/HRRB-Oxygen/HRRB-Oxygen/issues)

- In-progress features:
  - Sign-in (Firebase Authentication)
    - Facebook
  - Save User to Database (Express and MongoDB)
    - Save User Name
    - Save User Destinations
      - Home
      - School  
  - Save User Important Contacts
    - Contact Name, Phone Number, Message
      - Ex: Mom, 555-5555, Just got off the bus, walking home. Love you to the moon!
  - App Functionality
    - Visualize User Location (blue dot)
    - Alarm queued from proximity to User’s saved Destinations
    - Prompt to send pre-loaded text to Important Contacts



## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
