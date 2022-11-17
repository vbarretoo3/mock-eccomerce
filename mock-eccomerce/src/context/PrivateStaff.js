import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { db } from "./Firebase";
import {doc, getDoc } from 'firebase/firestore'

export default function PrivateStaff({ children }) {
  const { currentUser } = useAuth();
  const id = currentUser.uid
  const [user, setUser] = useState(null)
  const docRef = doc(db, 'customers', id)
  const docSnap = async() => {
    const snap = await getDoc(docRef)
    setUser(snap.data())
  }

  useEffect(() => {
    docSnap()
  },[])

  if(user === null) return null

  return user.status === 'staff' ? children : <Navigate to="/" />;
}