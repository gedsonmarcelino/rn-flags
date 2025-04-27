import {DEFAULT_FEATURE_FLAGS} from "./constants"

export type TFeatureFlags = typeof DEFAULT_FEATURE_FLAGS

export type TKeyFeatureFlags = keyof typeof DEFAULT_FEATURE_FLAGS