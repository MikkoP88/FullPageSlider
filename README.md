# Full Page Slider
Super simple java script to do partial or full page slider with customizable navigation.
## Features
- Can be used with partial or full websites.
- Horizontal and vertical sliding.
- Touchscreen support.
- Editable navigation panels.
- Forward and backward slide buttons.
- Automatic changing slides.
- Mouse swipe support.
- Can deploy multiple slider on single site with different slide controls.

## Previews

### [Auto horizontal slider](https://htmlpreview.github.io/?https://github.com/MikkoP88/FullPageSlider/blob/main/Previews/auto-horizontal-slider/index.html)

### [Custom vertical slider](https://htmlpreview.github.io/?https://github.com/MikkoP88/FullPageSlider/blob/main/Previews/custom-vertical-slider/index.html)

### [Simple horizontal slider](https://htmlpreview.github.io/?https://github.com/MikkoP88/FullPageSlider/blob/main/Previews/simple-horizontal-slider/index.html)

### [Simple vertical slider](https://htmlpreview.github.io/?https://github.com/MikkoP88/FullPageSlider/blob/main/Previews/simple-vertical-slider/index.html)

## Usage
Download javaslider.js or javaslider-min.js and set up html file for javascipt. For editing silder appearance and controls you need only edit html and CSS. 

### Settings example on html
Note! this example show slider and navigation injection point IDs
```
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        "body",                   // Id where all slider element going to be located. PLACE EVERY SLIDER ELEMENT INSIDE THIS ELEMENT. 
        ".body_for_pages",        // Place where page slider going to be located 
        "horizontal",             // Choose is slider vertical or horisontal.
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        true,                     // Auto Changing Slide is on.			
        4000,                     // Delay between slides on auto changing.		
        false,                    // Auto Changing Slide stop on last slide.
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        true,                     // Mouse scroll down or up can change page/slide. When vertical is on this not supported.			
        true,                     // Keyboard up and down can change page/slide. When vertical is on this not supported.			
        true,                     // Mouse Drag can change slide.			
        true,                     // Touch Drag can change slide.
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        true,                     // Next and Previous Slide Button is on.
        true,                     // Next and Previous Button Active Look is on.
        ">",                      // Next Button character/icon			
        "<",                      // Previous Button character/icon
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        "menu-area",              // Id of element where adding menu.			
        true,                     // Menu element is on.	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        '.changing_bottom_text',  // Class where bottom text element going to be located			
        true,                     // Bottom Text element is on.			
        "4000",                   // Delay for botton text element to change next text.
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                  // If Active Look is on and "add_active_look" class added on some element,
                                  // That element style can be configured differently every page.
        true,                     // Active Look is on.
        250,                      // Active Look Delay.
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                  // If Active Page is on, every time when any page is actived get that page class".page_(number of page)--active",
                                  // and in this class you can control page style when is opening.
        true,                     // Active Page is on.
        250,                      // Active Page Delay
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        true,                     // Body background color heritage is on. Body element heritage background color from previously page
        "|",                      // Add character between menu button, if "" is no character. do not delete this, can give error on console, leave empty with "" is better.
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                  // Set name for indicator menu buttons.
                                  // Support up to 10 button.			
        "PAGE-1",                 // Name for Button on PAGE-1			
        "PAGE-2",                 // Name for Button on PAGE-2			
        "PAGE-3",                 // Name for Button on PAGE-3		
        "PAGE-4",                 // Name for Button on PAGE-4		
        "PAGE-5",                 // Name for Button on PAGE-5
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

```
