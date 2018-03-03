# Grow Challenge
Welcome to my repository for the [Grow Front-end Challenge](https://github.com/poweredbygrow/front-end-challenge)!
The UI is optimized for a mobile layout, and then adjusts based on increasing screen size.

## UI/UX Choices
The main reference I used while developing is the CIBC Mobile Banking transaction list.
I love that in their design they keep information "short and sweet" which is something I decided to go with as well.

## Style and Theme
I used [Material Design Light](https://getmdl.io/) as much as possible to keep the design within [Material Design Specifications](https://material.io/).
Do to the limited amount of styles in MDL that apply to the challenge, I added my chosen palettes to a `theme.scss` file to fill in missing styles where needed.

## Known Bugs
While testing there are some things that I noticed were a little... off.
So I decided to help you find them and put them here!

|Affected Area   |Description  |
|----------------|:-----------:|
|Auto Complete   |Corners of the input box can still be seen on iOS devices.|
|Auto Complete   |When entering a value into an auto complete, if you hover over an option and press an arrow key both the key selected option and the hovered are styled as "active".|
|Auto Complete   |Would be great to have all potential options displayed when auto complete is empty.|
|Side Nav        |When viewing on Windows 10 + Edge the filter buttons at the bottom of the side nav do not grow to fill the nav width.|
|Transaction List|When viewing on Android + Chrome the `transactions-container` overflows below the footer.|
|Scroll Bars     |Styled scroll bars don't work on Windows 10 + Edge|