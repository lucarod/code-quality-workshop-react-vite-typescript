/* eslint-disable */
import { useEffect, useState } from "react"

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type GroupedPosts = Record<number, Post[]>;

function App() {
  const [groupedPosts, setGroupedPosts] = useState<GroupedPosts>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getPosts = () => {
      setIsLoading(true);
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json() as Promise<Post[]>;
        })
        .then(posts => {
          let finalGroups: GroupedPosts = {};

          posts.forEach(post => {
            if (!finalGroups[post.userId]) {
              finalGroups[post.userId] = [];
            }
            finalGroups[post.userId].push(post);
          });

          setGroupedPosts(finalGroups);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    }

    getPosts()
  }, []);

  console.log(groupedPosts)

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
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
