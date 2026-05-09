# Vikrant Mishra Portfolio

Multi-page portfolio website for Vikrant Mishra, built with plain HTML, CSS, and JavaScript.

## Pages

- `index.html` - home page with hero, skills, stats, and project carousel
- `about.html` - education, profile, languages, resume, certificate, and skill bars
- `projects.html` - selected project grid with filters, search, and modal details
- `contact.html` - contact links and email-prep form
- `admin.html` - Firebase admin panel for editing portfolio data

## Assets

- `assets/vikrant-mishra-resume.pdf` - downloadable resume
- `assets/usi-imhf-2025-certificate.pdf` - USI IMHF 2025 internship certificate

## Vercel

This is a static site. Import the GitHub repository into Vercel and use the default static settings:

- Framework Preset: Other
- Build Command: leave empty
- Output Directory: `.`

## Firebase Admin Setup

1. In Firebase Console, create or open your project.
2. Add a Web App and copy the Firebase config object.
3. Paste those values into `firebase-config.js`.
4. Enable Firebase Authentication with Email/Password.
5. Create one admin user in Authentication.
6. Create Firestore Database.
7. Publish the rules from `firestore.rules`.
8. Open `/admin.html`, sign in, edit content, and save.

The public pages read from Firestore document `portfolio/content`. If Firebase is not configured or the document does not exist, the website uses the local defaults in `data.js`.
