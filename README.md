![Logo](static/logo.png)

# trailmix-order

This is a HTML5 form built for my IB Project, the Trail Mix Factory! I used GatsbyJS and React for the web framework, and Semantic UI for the interface. This site is hosted on Github Pages.

## Features
- 2 options for customers to order from: premade mixes, and custom mixes for which they choose from a list of categorised ingredients
- Completely configurable! Configuration takes place in an excel file, with src/options.xlsx as an example. There is a script that takes the excel file and turns it into data.json
- Will output an HTML5 form (POST), which you can pipe directly to a Google Sheet
- Dynamic and mobile friendly UI
- Validation for category limits and personal details
- Room for photos for both premade mixes and raw ingredients!
- A JSON file for enabling/disabling ingredients from the menu
- A custom naming system with text effects as part of the company experience!