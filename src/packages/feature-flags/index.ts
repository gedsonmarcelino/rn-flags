import {fetchAndActivate, getRemoteConfig} from '@react-native-firebase/remote-config';
import {DEFAULT_FEATURE_FLAGS} from './constant';

import { getApp } from '@react-native-firebase/app';
import {TKeyFeatureFlags} from './types';

const app = getApp(); // Pega a instância do app Firebase
const remoteConfig = getRemoteConfig(app); // Pega o RemoteConfig atrelado ao app
remoteConfig.setConfigSettings({
  minimumFetchIntervalMillis: 1000*5,
  fetchTimeMillis: 1000*5
})

const initRemoteConfig = async () => {
  console.log('initRemoteConfig :>> ', );
  await remoteConfig.setDefaults(DEFAULT_FEATURE_FLAGS)
  await fetchAndActivate(remoteConfig);
}

initRemoteConfig()

const TEST_USER = 'jedi'

const hasProdTest = (key: TKeyFeatureFlags) => {
  const flagProdTest = JSON.parse(remoteConfig.getValue("prod_test").asString()) || DEFAULT_FEATURE_FLAGS['prod_test']
  const users = flagProdTest?.users || []

  if ( users.includes(TEST_USER) && key in flagProdTest ){
    return flagProdTest[key]
  }
  return undefined;
}

const getFeatureFlagFromRemoteConfig = (key:TKeyFeatureFlags) => {
  const valueDefault = DEFAULT_FEATURE_FLAGS[key];
  const value = remoteConfig.getValue(key)
  
  if ( typeof valueDefault === 'boolean' ){
    return value.asBoolean()
  }

  if ( typeof valueDefault === 'number' ){
    return value.asNumber()
  }

  if ( typeof valueDefault === 'string') {
    return value.asString()
  }

  return JSON.parse(value.asString()) || {}
}

export const getFeatureFlag = (key: TKeyFeatureFlags) => {
  const valueProdTest = hasProdTest(key)
  if ( valueProdTest !== undefined ) {
    return valueProdTest
  }
  return getFeatureFlagFromRemoteConfig(key)  
};