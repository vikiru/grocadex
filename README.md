<div align="center">
    <a href="/">
        <img src="./src/assets/images/grocadex-logo.png" alt="Grocadex Logo"/>
    </a>
</div>

<div align="center" id="badges">
    <a href="https://github.com/vikiru/grocadex/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-aqua" alt="MIT License Badge"/>
    </a>
    <a href="https://github.com/prettier/prettier">
        <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="Code Style - Prettier"/>
    </a>
    <a href="https://wakatime.com/badge/user/5e62f99d-3a1e-4fd2-8f37-77919d626a67/project/8f4e14f5-887c-4eae-a03c-8d1e780d3132">
        <img src="https://wakatime.com/badge/user/5e62f99d-3a1e-4fd2-8f37-77919d626a67/project/8f4e14f5-887c-4eae-a03c-8d1e780d3132.svg" alt="WakaTime Stats for Grocadex"/>
    </a>
    <br/>
    <a href="https://github.com/vikiru/grocadex/releases">
        <img src="https://img.shields.io/github/v/release/vikiru/grocadex" alt="Release"/>
    </a>
    <a href="https://github.com/vikiru/grocadex/issues?q=is%3Aissue+is%3Aclosed">
        <img src="https://img.shields.io/github/issues-closed/vikiru/grocadex" alt="Closed Issues"/>
    </a>
    <a href="https://github.com/vikiru/grocadex/pulls?q=is%3Apr+is%3Aclosed">
        <img src="https://img.shields.io/github/issues-pr-closed/vikiru/grocadex?label=closed%20prs" alt="Closed PRs"/>
    </a>
</div>

---

**Grocadex** is a React Native mobile app designed to help users track their grocery expenses and monitor expiry dates. The app aims to reduce food waste while keeping spending under control, making it easier to manage your household budget and minimize unnecessary waste.

This application was created using [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 📖 Table of Contents

- [📖 Table of Contents](#-table-of-contents)
- [🌟 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📝 Prerequisites](#-prerequisites)
- [⚡ Setup Instructions](#-setup-instructions)
- [📜 Available Scripts](#-available-scripts)
- [✨ Acknowledgments](#-acknowledgments)
- [©️ License](#️-license)

## 🌟 Features

- Create, edit, and delete receipts along with their corresponding grocery items for easy tracking.
- Mark items as inactive once they’ve expired or have been fully consumed.
- Track your expenses for the current month and year to monitor your grocery spending.
- Search grocery items by name and easily find receipts by store name for quick reference.

## 🛠️ Tech Stack

**Frontend:**

- [React Native](https://reactnative.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [Gluestack UI](https://gluestack.io/)
- [Tanstack Query](https://github.com/TanStack/query)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Native MMKV](https://github.com/mrousavy/react-native-mmkv)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)

**Backend:**

- [Express](https://expressjs.com/)
- [Passport](https://www.passportjs.org/)
- [passport-local](https://github.com/jaredhanson/passport-local)
- [passport-jwt](https://github.com/mikenicholson/passport-jwt)
- [Prisma](https://www.prisma.io/)
- [PostgresSQL](https://www.postgresql.org/)

## 📝 Prerequisites

Ensure that the following dependencies are installed onto your machine by following the [Setup Instructions](#-setup-instructions).

- [Node.js](https://nodejs.org/en/download)

## ⚡ Setup Instructions

1. Clone this repository to your local machine.

```bash
git clone https://github.com/vikiru/grocadex.git
cd grocadex
```

2. Download and install all required dependencies.

```bash
npm install
```

3. Configure your `.env` file with the required values.

```env
NODE_ENV=development
EXPRESS_PORT=3000

# Replace these with your database username, password, host, port, and database name.
DATABASE_URL='postgresql://<username>:<password>@<host>:<port>/<database name>'

# During development, you can set this to the IPV4 Address of your machine.
# e.g. "http://<IPV4 Address>:<EXPRESS_PORT>"
EXPO_PUBLIC_API_URL=""

# Used for passport-jwt auth, set this to a secure random string.
JWT_SECRET=""
```

4. Generate the Prisma client based on the [`schema.prisma`](./src/api/prisma/schema.prisma) file.

```bash
cd src/api
npx prisma generate
```

## 📜 Available Scripts

1. Start the development server for the frontend.

```bash
npm run start
```

2. Start the development server for the frontend and the backend concurrently.

```bash
npm run dev
```

The frontend will be available at:

```bash
http://localhost:8081
```

The backend will be available at:

```bash
http://localhost:3000
```

3. Start the development server for the frontend and launch the application on an Android device.

```bash
npm run android
```

4. Start the development server for the frontend and launch the application on an iOS device.

```bash
npm run ios
```

5. Start the development server for the frontend and launch the application on the web.

```bash
npm run web
```

The application will be available at:

```bash
http://localhost:8081
```

6. Lint all files and check if there are any issues with [ESLint](https://eslint.org/).

```bash
npm run lint
```

7. Fix all ESLint issues and then format the files with [Prettier](https://prettier.io/).

```bash
npm run prettier
```

## ✨ Acknowledgments

- [React Native Gifted Charts](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts)
- [react-native-ui-datepicker](https://github.com/farhoudshapouran/react-native-ui-datepicker)
- [react-native-toast-message](https://github.com/calintamas/react-native-toast-message)
- [flash-list](https://github.com/Shopify/flash-list)
- [Axios Documentation](https://axios-http.com/)
- [Formik Documentation](https://formik.org/docs/overview)
- [Yup Documentation](https://github.com/jquense/yup)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [GluestackUI Documentation](https://gluestack.io/ui/docs/home/overview/introduction)
- [Tanstack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Zustand Documentation](https://zustand.docs.pmnd.rs/)
- [Shields Badges](https://github.com/badges/shields)
- [Semantic Release](https://github.com/semantic-release/semantic-release)

## ©️ License

The contents of this repository are licensed under the terms and conditions of the [MIT](https://choosealicense.com/licenses/mit/) license.

[MIT](./LICENSE) © 2024-present Visakan Kirubakaran.
