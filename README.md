## Photographer-Frontend

![front](./public/images/image.png)

## Template to use : [Aside](https://uicookies.com/demo/theme/aside/)

## Main View:

- [x] __Image Display :__ Show all pictures on one long scrollable page, with the most recent images at the top.
- [x] __Ajax Calls :__ Implement Ajax calls in the background:
  - [x] Every 20 seconds.
  - [x] Every time the page is focused or moved (please provide the best event trigger for this).
- [x] __Manual Refresh :__ Enable manual refresh by sliding the first (top) picture down, appending new pictures to the existing ones without a full refresh (include a loading GIF for feedback).
- [x] __Refresh Icon :__ Add a refresh icon at the top left to allow users to refresh from there.
- [x] __Image Interaction :__ 
  - [x] Remove the whitening effect on hover.
  - [x] Allow users to click on an image to open it in full quality.
  - [x] Display a text under the image: "Long click on the image and click save to camera roll."
- [x] __Back Arrow :__ Replace the refresh icon in the top left corner with a back arrow to navigate back.
- [x] __Move Menu Toggle :__ Menu Toggle should be on the right side.
    - [x] Popup menu should slide in from the right.
- [x] __Menu Items :__
    - [x] __Receive all my pictures, with Email Icon__ 
        * Accessible only on Live-access
        * Opens to a Modal that ask for the user's email address
    - [x] __Invite a friend to this album, with Add Smartphone Icon__
        * Accessible only on Live-access
        * Opens to a Modal with a QR code
    - [x] __Invite a friend to this album, with Add Friend Icon__
        * Accessible only on Longterm-access
        * Opens to a Modal that ask for the friend's email address
    - [x] __Download all my pictures__
        * Accessible only on Longterm-access
        * Should offer a direct download to a ZIP file with all the pictures in full size.
---

**Note**

I converted the jQuery scripts from the template back to vanilla javascript because React.js is having issues loading them.

I leave most of the styles intact, except for a few changes in the layout of the mobile navbar.


