# Product Requirements Document
## Parent Teacher Interview (PTI) Display & Timer System

**Version:** 1.0
**Date:** April 16, 2026
**Status:** Draft

---

## 1. Overview

### 1.1 Purpose
A simple web application designed to be displayed on one or more screens during a Parent Teacher Interview (PTI) event. It provides a live, branded countdown display so that teachers and parents in the room or hallway can see exactly how much time is remaining in the current interview and when the next one begins. A buzzer/sound cue signals the end of each interview and the end of each break.

### 1.2 Goals
- Eliminate the need for a dedicated timekeeper or manual signals
- Provide a clear, at-a-glance display visible across a room or hallway
- Allow school admin to configure and launch the display in minutes
- Reinforce school branding on every screen
- Help parents and teachers quickly locate the correct interview room via a QR code

### 1.3 Out of Scope
- Booking or scheduling of interview appointments
- Parent/teacher login or accounts
- Notifications or emails
- Integration with external calendar or student management systems

---

## 2. Users

| Role | Description |
|---|---|
| **School Admin** | Configures the PTI session settings and launches the display |
| **Teachers & Parents** | View-only consumers of the display screen and room overview page |

---

## 3. Pages & Features

### 3.1 Admin Configuration Page (`/admin`)

The admin visits this page before the event to configure the session.

#### 3.1.1 Branding & Display Settings

| Field | Type | Description |
|---|---|---|
| School Name | Text | Displayed on the display screen header |
| School Logo | Image upload | Shown in the header of the display screen |
| Primary Colour | Colour picker | Used as the main theme colour |
| Secondary Colour | Colour picker | Used for accents and backgrounds |

#### 3.1.2 Session Timing Settings

| Field | Type | Description |
|---|---|---|
| Session Start Time | Time picker | The time the first interview begins |
| Session Finish Time | Time picker | The time the last interview must end by |
| Interview Duration | Number (minutes) | Length of each interview slot |
| Break Duration | Number (minutes) | Length of each break between interviews |

The total number of interviews is **calculated automatically** from these four values:

```
number_of_interviews = floor((finish_time - start_time) / (interview_duration + break_duration))
```

The admin page displays a live preview of the calculated interview count as values are entered, e.g. `"14 interviews will be scheduled (session ends at 4:10 PM)"`. If the session window does not divide evenly, the remaining time is noted, e.g. `"5 minutes unused at end of session"`.

#### 3.1.3 Teacher & Room Directory

Admin enters one row per teacher as part of pre-event setup, at the same time as timing and branding are configured. Each row contains:

| Field | Type | Description |
|---|---|---|
| Teacher Name | Text | e.g. Mr Nash Clark |
| Subject | Text | e.g. Mathematics |
| Room | Text | e.g. Senior South 1.4 |

- Rows can be added, edited, and removed at any time before or during the event
- No minimum or maximum number of teachers enforced
- Once saved, the directory is immediately accessible to parents and teachers by scanning the QR code on the display screen, which opens the Room Overview page (`/rooms`) on their mobile device

#### 3.1.4 Actions

- **Save & Launch Display** — saves all settings and opens `/display` in a new tab
- **Preview Room Overview** — opens `/rooms` in a new tab to check the directory
- **Reset** — clears all fields back to defaults

All settings persist in browser `localStorage` so they survive a page refresh.

---

### 3.2 Display Screen (`/display`)

Intended to be opened full-screen on one or more monitors or projectors. No interaction is required once launched.

#### 3.2.1 Layout (top to bottom)

1. **Header** — school logo and school name, styled in the configured school colours
2. **Current Status Label** — large text reading either `"Interview in Progress"` or `"Break Time"`
3. **Countdown Timer** — large, prominent countdown in `MM:SS` format showing time remaining in the current phase
4. **Next Interview Time** — smaller text, e.g. `"Next interview at 3:42 PM"`
5. **Progress Indicator** — e.g. `"Interview 4 of 12"`
6. **QR Code** — positioned in the bottom corner; scanning takes the user to the Room Overview page (`/rooms`)
7. **QR Code Label** — short caption beneath the QR code, e.g. `"Scan for teacher locations"`
8. **Footer** — school colour bar

#### 3.2.2 Timer Behaviour

- Timer counts down automatically, calculated from the configured session start time relative to the current clock time so that any screen opened mid-session immediately shows the correct state
- When the interview countdown reaches `0:00`:
  - A **buzzer/alert sound** plays (end-of-interview chime)
  - The display transitions to `"Break Time"` and the break countdown begins
- When the break countdown reaches `0:00`:
  - A **second, distinct buzzer sound** plays (start-of-next-interview signal)
  - The display transitions back to `"Interview in Progress"` and the next interview countdown begins
- This cycle repeats until all interviews are complete
- When the final interview ends the screen shows a `"Session Complete — Thank you!"` message styled in school colours

---

### 3.3 Room Overview Page (`/rooms`)

A clean, readable page intended to be viewed on a parent's or teacher's mobile device after scanning the QR code on the display screen.

#### 3.3.1 Layout

1. **Header** — school logo and school name
2. **Page Title** — `"Teacher Locations — [Event Date]"`
3. **Teacher Directory Table** — one row per teacher, sorted alphabetically by teacher name:

| Teacher | Subject | Room |
|---|---|---|
| Mr Nash Clark | Mathematics | Senior South 1.4 |
| Ms Jane Smith | English | Junior Block 2.2 |
| ... | ... | ... |

4. **Footer** — school colour bar

#### 3.3.2 Behaviour

- Read-only — no interaction required
- Pulls data from the same `localStorage` store written by the admin page
- Mobile-optimised layout (readable on small screens without zooming)
- If no teacher data has been configured, shows a friendly message: `"Room information has not been set up yet."`

---

## 4. Sound Cues

| Event | Sound | Description |
|---|---|---|
| End of interview | Single chime/bell | Signals time is up for the current interview |
| End of break | Double beep / distinct tone | Signals the next interview is about to begin |

Sounds are implemented via the Web Audio API or pre-loaded audio files. No external service or internet connection is required for playback.

---

## 5. Technical Requirements

| Requirement | Detail |
|---|---|
| Platform | Web browser (Chrome or Edge recommended for kiosk/full-screen use) |
| Hosting | Static site — no backend, server, or database required |
| State | `localStorage` for admin settings; JavaScript `setInterval` for the timer |
| Multi-screen sync | Any browser tab open to `/display` calculates its position based on the configured start time so all screens stay in sync automatically |
| QR Code generation | Generated client-side (e.g. using the `qrcode.js` library); encodes the URL of the `/rooms` page |
| Responsive | Display page optimised for landscape screens (1080p+); Room Overview page optimised for mobile portrait; Admin page works on standard desktop |
| Offline capable | Once loaded in the browser, all three pages function without an internet connection |

---

## 6. Design Guidelines

- Use the school's configured primary and secondary colours throughout all three pages
- Timer digits on the display screen must be **very large** (readable from across a room at 5+ metres)
- The `"Interview in Progress"` phase should use a calm colour (e.g. school primary colour or blue)
- The `"Break Time"` phase should use a visually distinct colour (e.g. amber/orange) for instant recognition without reading the label
- The Room Overview page should be clean and high-contrast for easy reading on a mobile screen in a brightly lit corridor
- Minimalist layout on the display screen — no navigation menus, no clutter

---

## 7. Non-Functional Requirements

- The timer must be accurate to within 1 second across a full session
- The display page must not require any user interaction once launched
- Admin configuration (including entering teacher/room data) should be completable in under 5 minutes
- The QR code must be large enough to scan comfortably from 1–2 metres away on the display screen

---

## 8. Future Considerations (Post v1)

- Audio volume control in the admin panel
- Multiple simultaneous room displays with independent timers (for schools running parallel PTI streams)
- End-of-session summary or printable schedule export
- Ability to mark a teacher as "Running Late" from an admin device, reflected live on the display
