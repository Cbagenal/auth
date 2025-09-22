'use client'
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { signOut, useSession } from "next-auth/react";
import Login from "../../components/signin-btn";

export default function Home() {
  const insertUser = useMutation(api.auth.insertUser)
  const queryUser = useQuery(api.auth.queryUser)
  const insertData = useMutation(api.auth.insertData)
  const queryData = useQuery(api.auth.queryData)
  const user = useSession()

  if (!queryUser){
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col gap-2">
      <Login />
      <button className="bg-blue-500 p-2 rounded-md" onClick={() => insertUser({name: 'test', pfp: 'example.com'})}> Test User </button>
      <button className="bg-blue-500 p-2 rounded-md" onClick={() => insertData({text: "test"})}>Test Data Insert</button>
      <button className="bg-red-500 p-2 rounded-md" onClick={() => signOut()}>Sign out</button>

        <div className="flex gap-2">
        {queryUser.map((user, index) => (
          <div key={index} className="bg-blue-300 p-2 rounded-md">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.pfp}</p>
          </div>
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
