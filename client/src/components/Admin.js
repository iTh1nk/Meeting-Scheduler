import React, {useContext} from 'react';
import { AssignContext } from '../AssignContext';
import Login from './Login';

export default function Admin () {
  const {isAuthenticated, setIsAuthenticated} = useContext(AssignContext);

  if (!isAuthenticated) return <Login />

  return (
    <div>
      Admin Page
    </div>
  )
}