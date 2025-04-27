import {fetchAndActivate, getRemoteConfig} from '@react-native-firebase/remote-config';
import {DEFAULT_FEATURE_FLAGS, FETCH_TIME_MILLIS, KEY_PROD_TEST, MINIMUM_FETCH_INTERVAL_MILLIS, TEST_USER} from './constants';

import {TKeyFeatureFlags, TKeyProdTest} from './types';
import {app} from '../firebase';

const remoteConfig = getRemoteConfig(app); 
remoteConfig.setConfigSettings({
  minimumFetchIntervalMillis: MINIMUM_FETCH_INTERVAL_MILLIS,
  fetchTimeMillis: FETCH_TIME_MILLIS
})

export const initRemoteConfig = async () => {
  console.log('initRemoteConfig :>> ', );
  await remoteConfig.setDefaults(DEFAULT_FEATURE_FLAGS)
  await fetchAndActivate(remoteConfig);
}

const hasProdTest = (key: TKeyFeatureFlags) => {
  let flagProdTest: TKeyProdTest = DEFAULT_FEATURE_FLAGS[KEY_PROD_TEST]
  try {
    flagProdTest = JSON.parse(remoteConfig.getValue(KEY_PROD_TEST).asString()) 
  } catch { }
  const users = (flagProdTest?.users || []) as string[]

  if ( users.includes(TEST_USER) && key in flagProdTest ){
    console.log('value :>> ', flagProdTest[key]);
    return flagProdTest[key]
  }
  return undefined;
}

const getFeatureFlagFromRemoteConfig = (key:TKeyFeatureFlags) => {
  const valueDefault = DEFAULT_FEATURE_FLAGS[key];
  const value = remoteConfig.getValue(key)

  console.log('value :>> ', value);
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
  console.log('key :>> ', key);
  const valueProdTest = hasProdTest(key)
  if ( valueProdTest !== undefined ) {
    return valueProdTest
  }
  return getFeatureFlagFromRemoteConfig(key)  
};