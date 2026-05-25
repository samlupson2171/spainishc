# Requirements Document

## Introduction

The Event Registration feature enables the spanish-conveyancing website to host event landing pages where visitors can register for upcoming events (e.g., webinars, seminars, property buying workshops). The system handles the full lifecycle: public event display, attendee registration, email notifications (confirmation, admin alerts, reminders), and admin management of events and registrations.

## Glossary

- **Event_Landing_Page**: A public-facing page that displays event details and a registration form for a specific event
- **Registration_Form**: A form component that collects attendee information for event sign-up
- **Registration_System**: The backend system responsible for processing, validating, and storing event registrations
- **Email_Service**: The service responsible for sending transactional emails via Resend (confirmations, admin notifications, reminders)
- **Reminder_Scheduler**: The system component that determines when reminder emails should be sent based on event dates
- **Admin_Panel**: The admin management interface for creating, editing, and managing events and their registrations
- **Attendee**: A person who registers for an event through the Registration_Form
- **Admin**: An authenticated user with access to the Admin_Panel

## Requirements

### Requirement 1: Event Landing Page Display

**User Story:** As a visitor, I want to view event details on a dedicated landing page, so that I can learn about the event and decide whether to register.

#### Acceptance Criteria

1. WHEN a visitor navigates to an event URL, THE Event_Landing_Page SHALL display the event title, description, date, time, location, and the timezone in which the event time is shown
2. WHEN a visitor navigates to an event URL, THE Event_Landing_Page SHALL display the Registration_Form below the event details
3. WHILE the event date and time have passed (determined by comparing the event's scheduled start date and time against the current server time), THE Event_Landing_Page SHALL display a message indicating that registration is closed
4. WHILE the event date and time have passed, THE Event_Landing_Page SHALL hide the Registration_Form
5. IF a visitor navigates to a URL for a non-existent event, THEN THE Event_Landing_Page SHALL display a 404 not found page
6. IF the event data fails to load due to a server or database error, THEN THE Event_Landing_Page SHALL display an error message indicating that the event could not be loaded and SHALL not display the Registration_Form

### Requirement 2: Event Registration Submission

**User Story:** As a visitor, I want to register for an event by filling out a form, so that I can secure my attendance.

#### Acceptance Criteria

1. THE Registration_Form SHALL collect the attendee's full name (between 2 and 100 characters), email address (maximum 254 characters), and phone number (between 7 and 15 digits, optionally prefixed with a country code)
2. WHEN an attendee submits the Registration_Form with valid data, THE Registration_System SHALL store the registration in the database with a timestamp and display a success confirmation message that includes the event name and the registered email address
3. IF an attendee submits the Registration_Form with an invalid email format, THEN THE Registration_System SHALL display a validation error message for the email field without clearing other completed fields
4. IF an attendee submits the Registration_Form with missing required fields, THEN THE Registration_System SHALL display validation error messages for each missing field without clearing other completed fields
5. IF an attendee submits the Registration_Form with a phone number that does not contain between 7 and 15 digits, THEN THE Registration_System SHALL display a validation error message for the phone number field
6. IF an attendee submits the Registration_Form with an email already registered for the same event, THEN THE Registration_System SHALL display a message indicating the email is already registered
7. IF the Registration_System fails to store the registration due to a system error, THEN THE Registration_System SHALL display an error message indicating the registration could not be completed and SHALL preserve the attendee's entered form data

### Requirement 3: Registration Confirmation Email

**User Story:** As an attendee, I want to receive a confirmation email after registering, so that I have a record of my registration and event details.

#### Acceptance Criteria

1. WHEN a registration is successfully stored, THE Email_Service SHALL send a confirmation email to the attendee's email address within 60 seconds of the registration being stored
2. THE Email_Service SHALL include the event title, date, time, location, and a unique registration reference identifier in the confirmation email
3. THE Email_Service SHALL include the attendee's name in the confirmation email greeting
4. IF the confirmation email fails to send, THEN THE Email_Service SHALL log the failure and retry the send operation once after a delay of no more than 30 seconds
5. IF the retry attempt also fails to send, THEN THE Email_Service SHALL log the final failure and mark the registration record as requiring manual email follow-up

### Requirement 4: Admin Registration Notification

**User Story:** As an admin, I want to receive an email notification when someone registers for an event, so that I can track registrations in real time.

#### Acceptance Criteria

1. WHEN a registration is successfully stored, THE Email_Service SHALL send a notification email to the admin email address within 60 seconds of the registration being stored
2. THE Email_Service SHALL include the attendee's name, email, phone number, and the event title in the admin notification email
3. THE Email_Service SHALL include the registration timestamp formatted as date and time with timezone (e.g., "DD MMM YYYY, HH:MM timezone") in the admin notification email
4. IF the admin notification email fails to send, THEN THE Email_Service SHALL log the failure and retry the send operation once

### Requirement 5: Event Reminder Emails

**User Story:** As an attendee, I want to receive reminder emails before the event, so that I do not forget to attend.

#### Acceptance Criteria

1. WHEN the Reminder_Scheduler's scheduled check determines that an event starts within exactly 7 calendar days (168 hours from the next scheduled check window), THE Reminder_Scheduler SHALL trigger the Email_Service to send a one-week reminder email to all registered attendees for that event
2. WHEN the Reminder_Scheduler's scheduled check determines that an event starts within exactly 1 calendar day (24 hours from the next scheduled check window), THE Reminder_Scheduler SHALL trigger the Email_Service to send a day-before reminder email to all registered attendees for that event
3. THE Email_Service SHALL include the event title, date, time, location, and a link to the event details in each reminder email
4. THE Reminder_Scheduler SHALL send reminders only to attendees whose registrations have not been cancelled
5. IF a reminder email fails to send to an attendee, THEN THE Email_Service SHALL retry delivery up to 3 times with a minimum interval of 5 minutes between attempts, and if all retries fail, log the failure with the attendee email, event identifier, and failure reason
6. IF an event is created or an attendee registers after the 7-day reminder window has passed but before the 1-day reminder window, THEN THE Reminder_Scheduler SHALL send only the 1-day reminder to that attendee
7. THE Reminder_Scheduler SHALL not send more than one reminder of each type (7-day, 1-day) per attendee per event

### Requirement 6: Admin Event Management

**User Story:** As an admin, I want to create, edit, and manage events from the admin panel, so that I can control which events are published on the website.

#### Acceptance Criteria

1. WHEN an admin accesses the events section of the Admin_Panel, THE Admin_Panel SHALL display a list of all events with their title, date, and registration count, sorted by date in descending order
2. WHEN an admin creates a new event, THE Admin_Panel SHALL require a title (maximum 150 characters), description (maximum 2000 characters), date, time, and location (maximum 200 characters)
3. WHEN an admin submits a valid new event form, THE Admin_Panel SHALL store the event in the database and display it in the events list
4. WHEN an admin edits an existing event, THE Admin_Panel SHALL pre-populate the form with the current event data
5. WHEN an admin saves edits to an event, THE Admin_Panel SHALL update the event in the database and display the updated data in the events list
6. WHEN an admin deletes an event, THE Admin_Panel SHALL display a confirmation prompt before removing the event and its associated registrations from the database and the events list
7. IF an admin submits the event form with missing required fields or fields exceeding their maximum length, THEN THE Admin_Panel SHALL display validation error messages for each invalid field and SHALL NOT store the event
8. IF an admin attempts to create or edit an event with a date in the past, THEN THE Admin_Panel SHALL display a validation error indicating the event date must be in the future

### Requirement 7: Admin Registration Management

**User Story:** As an admin, I want to view and manage registrations for each event, so that I can track attendance and handle cancellations.

#### Acceptance Criteria

1. WHEN an admin selects an event from the events list, THE Admin_Panel SHALL display all registrations for that event including attendee name, email, phone number, and registration date, sorted by registration date in descending order (most recent first)
2. WHEN an admin selects an event that has zero registrations, THE Admin_Panel SHALL display a message indicating that no registrations exist for that event
3. WHEN an admin initiates a cancellation of a registration, THE Admin_Panel SHALL display a confirmation prompt before executing the cancellation
4. WHEN an admin confirms a registration cancellation, THE Admin_Panel SHALL mark the registration as cancelled in the database and remove the attendee from the active registrations list for that event
5. WHEN a registration is successfully cancelled, THE Admin_Panel SHALL display a success message indicating the registration has been cancelled
6. IF a registration cancellation fails due to a system error, THEN THE Admin_Panel SHALL display an error message indicating the cancellation could not be completed and SHALL retain the registration in the active registrations list unchanged
7. THE Admin_Panel SHALL display the total count of active registrations for each event, updated immediately when a registration is cancelled

### Requirement 8: Event Publication Control

**User Story:** As an admin, I want to control whether an event is visible to the public, so that I can prepare events before making them live.

#### Acceptance Criteria

1. WHEN an admin creates an event, THE Admin_Panel SHALL set the event status to draft by default
2. WHEN an admin publishes an event, THE Admin_Panel SHALL update the event status to published and display the event status as published in the events list
3. WHILE an event status is draft, THE Event_Landing_Page SHALL return a 404 not found page for that event URL
4. WHEN an admin unpublishes a published event, THE Admin_Panel SHALL update the event status to draft and THE Reminder_Scheduler SHALL suspend any pending reminder emails for that event until the event is published again
5. WHILE an event status is draft, THE Event_Landing_Page SHALL exclude that event from any public-facing event listing
6. THE Admin_Panel SHALL display the current publication status of each event in the events list
