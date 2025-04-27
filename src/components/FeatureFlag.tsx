import {getFeatureFlag, TKeyFeatureFlags} from "@/packages/feature-flags";
import React from "react";

type TProps = {
  flag: TKeyFeatureFlags,
  children: React.ReactElement
}

export function FeatureFlag({
  flag, children
}: TProps) {

  const value = getFeatureFlag(flag) as boolean;

  return value && (
    children
  );
}
