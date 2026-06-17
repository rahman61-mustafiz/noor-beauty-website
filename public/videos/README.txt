VIDEOS FOLDER
=============

HERO VIDEO (homepage background)
--------------------------------
Save your salon video here as exactly:

    hero.mp4

It will auto-play (muted, looping) as the homepage hero background.
Until the file exists, the homepage shows the salon photo instead — no errors.

Tips for a good hero video:
- Keep it short (10-30 seconds), it loops.
- Landscape orientation, 1080p is plenty.
- Try to keep the file under ~10 MB so the page loads fast
  (compress at e.g. handbrake.fr if it's large).

GALLERY VIDEOS
--------------
Drop video files into the matching category folder, e.g.:

    public/images/gallery/spa/intro.mp4

Then add an entry in  lib/gallery-data.ts  pointing to it, e.g.:

    { src: '/images/gallery/spa/intro.mp4', caption: 'Inside our spa', category: 'Body Spa' },

Any .mp4 / .webm / .mov file is auto-detected and plays in the gallery.
