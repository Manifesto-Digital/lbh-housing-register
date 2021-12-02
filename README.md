# Hackney: Housing register

**A new tool for Hackney residents to check if they qualify to be on the housing register, and if certain criteria is met, they may continue through the process to submit a housing application form.**

## 🧐 What does it do?

This application has two sides: the _officer dashboard_ side, for council officers to log in and manage applications, and the _resident_ side for residents to submit applications for approval.

### Resident Flow

This app will form part of the user journey, allowing for an application to the housing register. This breaks down into the following steps.

- **`/`** - Entry point, provide starting information and signposts the user to the housing registration application
- **`/apply/sign-in`** - Sign in using an email address
- **`/apply/verify`** - Verify the email address with a code

If the resident is signing up for the first time, then they will be shown the following steps before they get to the application overview.

- **`/apply/start`** - Provide initial details for the application
- **`/apply/household`** - Provide the household members included in the application
- **`/apply/expect`** - Provide the expected bedroom need based on the household members

Once signed in, the resident will then be able to update their application.

- **`/apply/overview`** - Overall view of the application, display a list of people and current progress
- **`/apply/[person]`** - Overall view of each person involved with the application
  - **`/apply/[person]/[step]`** - Step of the application form

If at any point during the application process, details are provided that would disqualify the application, the resident is taken to the `/apply/not-eligible` page.

After all the questions have been answered and the application details are complete, the resident will be shown the outcome.

- **`/apply/submit/additional-questions`** - Further questions relating to their application
- **`/apply/submit/declaration`** - Final declaration to agree to the terms of the application
- **`/apply/confirmation`** - Confirmation that the application has been submitted

### Staff Dashboard

- **`/login`** - Login to the staff dashboard
- **`/access-denied`** - Active user logged in, but without access to required page
- **`/applications`** - The homepage for officers, which displays applications assigned to them
  - **`/applications/unassigned`** - View any unassigned applications, which can be assigned to an officer
  - **`/applications/view/:id`** - View all information relating to a particular application
  - **`/applications/reports`** - Download reports to export application data

## 🧱 How it's made

This app has been built using [Next.js](https://nextjs.org), with components built out using the [Hackney design system](https://design-system.hackney.gov.uk/developing/react) as reference.

Forms are using [Formik](https://formik.org/), a React library to make building forms easier.

### Components

The components are taken from the [design system](https://design-system.hackney.gov.uk), with only the relevant mark-up being copied into the react components. You may find for this reason that not all variants of each component exists within this app, this is because not everything is entirely relevant to the housing register; we should add only those components and the required variants as and when they are needed to reduce down maintenance of this tool.

Unlike the mark-up, the styling and javascript are available as a package and easily imported from the [lbh-frontend](https://github.com/LBHackney-IT/LBH-frontend) library (using `npm`). We should continue to support this approach, for example:

```scss
@import 'node_modules/lbh-frontend/lbh/base';
@import 'node_modules/lbh-frontend/lbh/components/lbh-button/button';
```

_Imports the button styling from the lbh-frontend library_

### TypeScript

The React components are built using the [TypeScript](https://www.typescriptlang.org) template, and we should follow the functional approach for consistency.

> TypeScript provides a way to describe the shape of a javascript object, providing better documentation, and allowing TypeScript to validate that your code is working correctly.

## 💻 Getting started

As a prerequisite to run this app you will need to install [Node.js](https://nodejs.org/en/download) and [npm](https://docs.npmjs.com/cli/v7/commands/npm-install):

### Running locally

```
npm install
npm run dev
```

The app will attempt to start on port `3000` and should be available on localhost: [http://localhost:3000](http://localhost:3000)

### Logging in

The staff dashboard is using [LBH Google Auth](https://github.com/LBHackney-IT/LBH-Google-auth) for authentication. Permissions to what a user is authorised to do, is managed by mapping Google groups.

You need a **@hackney.gov.uk** Google account to sign in. Speak to Hackney IT if you don't have this.

Next, you need to tell your computer to run the app from a hackney.gov.uk domain. Add this line to your hosts file (Windows: `C:\Windows\System32\drivers\etc\hosts`, Mac: `/etc/hosts`):

```
127.0.0.1   localdev.hackney.gov.uk
```

Update the `APP_URL` variable in the `.env` file to match. When you next launch the app, it should be on `http://localdev.hackney.gov.uk:3000`.

If you have the right configuration setup within the `.env` file, you should be able to access the staff dashboard.

#### Permissions

We have defined Google Groups in relation to access permissions and roles for what is possible within the staff dashboard.

These are as follows:

- AUTHORISED_ADMIN_GROUP: can do any required action
- AUTHORISED_MANAGER_GROUP: same as officers, plus can assign applications to officers for assessment and see sensitive data
- AUTHORISED_OFFICER_GROUP: can view applications and perform assessments on assigned applications

The scope and expectations around permissions have been kept fairly limited at this stage, but is an area for future enhancements.

### Mock Server

The app comes with a [mock server](http://mocks-server.org) for mock requests to external APIs. This can be be run with `npm run mocks`, and will be available on port 5000.

e.g. `http://localhost:5000/api/applications` will return a list of applications.

To connect directly to the Housing Register API, update the `HOUSING_REGISTER_API` variable in the `.env` file.

## Concepts

### APIs

We've defined a couple of gateways to interact with our API. These are set up as follows:

- **`internal-api.ts`**

  - This acts as a means of routing client side requests, for example form submissions, to a proxy endpoint on the Next.js server.
  - Requests are sent via [API routes](https://nextjs.org/docs/api-routes/introduction) which run server side

- **`applications-api.ts`**
  - This acts as a means of sending server side requests to the Housing Register API.
  - This is currently used within the staff portal and we are using `getServerSideProps` to preload the data

### Forms

As mentioned above we are using [Formik](https://formik.org/) to help create and handle forms.

This has been extended to be used in a more generic way, which means forms can be created from JSON files. These are stored within `data/forms`. To add a new form, create a JSON file with the necessary configuration for the fields required and then reference it within the helper function `getFormData`. Example below...

```
{
  "heading": "Accommodation details",
  "steps": [
    {
      "fields": [
        {
          "label": "Postcode",
          "name": "postcode",
          "validation": {
            "required": true
          }
        },
        ...
      ]
    }
  ]
}
```

### Higher order components

[Higher order components](https://reactjs.org/docs/higher-order-components.html) are used to wrap existing components with some logic about the current application, allowing for code re-use.

- `withApplication` - ensure there is an active application and user, or redirect

### Emails

[Gov.UK Notify](https://gov.uk/notify) is used to send emails (e.g. confirmation emails). Update the `NOTIFY_API_KEY` and relevant template ids in the `.env` file.

- NOTIFY_TEMPLATE_NEW_APPLICATION: sent on completion of an application
- NOTIFY_TEMPLATE_DISQUALIFY: sent on disqualification on an application
- NOTIFY_TEMPLATE_MEDICAL_NEED: sent if anyone in the application states a medical need
