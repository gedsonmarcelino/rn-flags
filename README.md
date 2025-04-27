# React Native Firebase Remote Config Example

This repository demonstrates a **React Native** implementation of **Firebase Remote Config**, with focus on:

- [`src/packages/feature-flags/`](./src/packages/feature-flags/): **Feature flag system**
- [`src/components/FeatureFlag/`](./src/components/FeatureFlag/): **Feature flag component abstraction**

---

## 📂 Project Structure

```bash
src/
  components/
    FeatureFlag/        # Component to conditionally render based on a feature flag
  packages/
    feature-flags/      # Hooks, types, utilities for feature flagging
```

---

## 📌 Features

- Fetch and activate remote config from Firebase
- Use feature flags easily inside React Native components
- Strong TypeScript typings for feature keys
- Example of how to create reusable feature flagged components

---

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

Make sure you have your Firebase project configured.

Use [`@react-native-firebase/app`](https://rnfirebase.io/) and [`@react-native-firebase/remote-config`](https://rnfirebase.io/remote-config/usage) libraries.

```bash
yarn add @react-native-firebase/app @react-native-firebase/remote-config
```

Set your Google Services files:
- `google-services.json` for Android
- `GoogleService-Info.plist` for iOS

---

## ⚡ Usage Example

### Using the `FeatureFlag` component

```tsx
import { FeatureFlag } from '@/components/FeatureFlag';

export function Home() {
  return (
    <FeatureFlag flag="show_explore">
      <NewHomeScreen />
    </FeatureFlag>
  );
}
```

Or using the `getFeatureFlag` function directly:

```tsx
import { getFeatureFlag } from '@/packages/feature-flags';

const isFeatureEnabled = getFeatureFlag('new_homepage');

if (isFeatureEnabled) {
  // Feature-specific logic here
}
```

## Default Values

The feature flag keys and their default values are defined in:

- **Constants file**: [`src/packages/feature-flags/constants.ts`](src/packages/feature-flags/constants.ts)

This file contains:

- `DEFAULT_FEATURE_FLAGS` — An object with all the feature flags and their default fallback values.

Example:

```ts
export const DEFAULT_VALUES = {
  show_json : { id: '111' },
  show_string: 'its me',
  show_number: 111
};
```

This structure enforces safe access to remote config values throughout the project.
---

## 📄 License

MIT © [Gedson Marcelino](https://github.com/gedsonmarcelino)

---

> Built with ❤️ using React Native & Firebase.