'use client'
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { signOut, useSession } from "next-auth/react";
import Login from "../../components/signin-btn";
import { useState } from "react";

export default function Home() {
  const insertUser = useMutation(api.auth.insertUser)
  const queryUser = useQuery(api.auth.queryUser)
  const insertData = useMutation(api.auth.insertData)
  const queryData = useQuery(api.auth.queryData)
  const[buttonActive, setButtonActive] = useState(false);
  const [userSelected, setUserSelected] = useState("")
  const user = useSession()

  if (!queryUser){
    return <p>Loading...</p>
  }

  const handleUserSelected = (email) => {
    setButtonActive(prev => !prev);
    setUserSelected(prev => prev === email ? "" : email);
    console.log(userSelected)
  }

  return (
    <div className="flex flex-col gap-2">
      <Login />
      <button className="bg-blue-500 p-2 rounded-md" onClick={() => insertUser({name: 'test', pfp: 'example.com', email: 'email@test.com'})}> Test User </button>
      <button className="bg-blue-500 p-2 rounded-md" onClick={() => insertData({authorId: user?.data?.user?.email, text: "test", recipientId: userSelected})}>Test Data Insert</button>
      <button className="bg-red-500 p-2 rounded-md" onClick={() => signOut()}>Sign out</button>

        <div className="flex gap-2">
        {queryUser.map((user, index) => (
          <button key={index} className={`p-2 rounded-md ${buttonActive ? "bg-blue-500" : "bg-blue-200"}`} onClick={() => handleUserSelected(user.email)}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.pfp}</p>
          </button>
        ))}
        </div>

        <div className="flex gap-1">
          {queryData?.map((content, index) => (
            <div key={index} className="bg-blue-300 p-2 rounded-md">
              <p>{content.text}</p>
            </div>
          ))}
        </div>
    </div>

  );
}
