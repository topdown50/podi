import React from 'react'
import HomeHeader from './HomeHeader'
import HomeLinks from './HomeLinks'
import { DataStore } from '@aws-amplify/datastore';
import { Customer } from '../../models';

export default function Home() {
  
  return (
    <React.Fragment>
      <HomeHeader/>
      <HomeLinks/>
    </React.Fragment>
  )
}
