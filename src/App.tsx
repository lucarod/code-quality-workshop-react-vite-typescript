/* eslint-disable */
import { useEffect, useState } from "react"

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
}

export type GroupedPosts = Record<number, Post[]>

function App() {
  const [groupedPosts, setGroupedPosts] = useState<GroupedPosts>({})
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const d = new Date()
  const is_fr = d.getDay() == 5
  const is_nv = d.getMonth() == 10
  const max_len = 20
  const do_trunc = true

  useEffect(() => {
    const getData = () => {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then((p_data: any[]) => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(res2 => res2.json())
          .then((u_data: any[]) => {

            let fg: any = {}

            for (let i = 0; i < p_data.length; i++) {
              let un = 'Unknown User'
              const p = p_data[i]

              for (let j = 0; j < u_data.length; j++) {
                if (u_data[j].id === p.userId) {
                  if (!is_fr && is_nv) {
                    if (do_trunc && p.title.length > max_len) {
                      un = u_data[j].name.substring(0, 5) + "..."
                    } else {
                      un = u_data[j].name
                    }
                  } else if (!is_fr && !is_nv) {
                    un = u_data[j].name.toUpperCase()
                  } else {
                    un = is_fr
                      ? is_nv
                        ? u_data[j].name.toUpperCase()
                        : do_trunc && p.title.length > max_len
                          ? u_data[j].name.substring(0, 5) + "..."
                          : u_data[j].name
                      : u_data[j].name
                  }
                  break
                }
              }

              const new_obj = {
                id: p.id,
                userId: p.userId,
                title: p.title,
                body: p.body,
                userName: un
              }

              if (!fg[p.userId]) {
                fg[p.userId] = []
              }
              fg[p.userId].push(new_obj)
            }

            setGroupedPosts(fg)
            setIsLoading(false)

          })
          .catch((err: Error) => {
            setError(err.message)
            setIsLoading(false)
          });
      })
      .catch((err: Error) => {
        setError(err.message)
        setIsLoading(false)
      });
    }
    getData()
  }, [])

  console.log(groupedPosts)

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="bg-gray-100 text-gray-900 min-h-screen font-sans">

          <div className="bg-white shadow-sm">

            <div className="container m-[0 auto] p-4 flex justify-between items-center">

              <div>
                <span className="text-[24px] font-bold text-blue-700">My Awesome Site</span>
              </div>

              <div className="flex">
                <span className="text-gray-600 hover:text-blue-600 font-medium cursor-pointer">Home</span>
                <span className="ml-6 text-gray-600 hover:text-blue-600 font-medium cursor-pointer">About</span>
                <span className="ml-6 text-gray-600 hover:text-blue-600 font-medium cursor-pointer">Gallery</span>
                <span className="ml-6 text-gray-600 hover:text-blue-600 font-medium cursor-pointer">Contact</span>
              </div>
            </div>
          </div>

          <div className="container mx-auto p-4 mt-8">

            <div className="text-[36px] font-extrabold text-gray-800 mb-6">
              <span>Welcome to the Gallery</span>
            </div>

            <div className="text-[18px] text-gray-700 mb-6">
              <span>Here is some text about our gallery. It is very nice.</span>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg mb-6">

              <div>
                <img
                  src="https://picsum.photos/800/400"
                  className="w-full h-auto object-cover rounded-md"
                  alt=""
                />
              </div>

              <span className="block text-center text-gray-500 mt-3 italic">
                This is a picture
              </span>
            </div>

            <div className="text-lg text-gray-700">
              <span>Here is </span>
              <span className="font-semibold text-indigo-600">some very important</span>
              <span> text.</span>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm mt-12 py-6 border-t border-gray-200">
            <span>&copy; 2025 My Awesome Site. All rights reserved.</span>
          </div>

        </div>
      )}
    </>
  )
}

export default App
