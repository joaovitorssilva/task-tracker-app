import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Board from "./components/Board";

import { getLists } from "./api/endpoints/Lists";
import type { List } from "./types/api";

function App() {
  const [lists, setLists] = useState<List[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  const fetchLists = async () => {
    try {
      // setLoading(true)
      const listsTemp = await getLists();
      setLists(listsTemp);
    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {
    fetchLists();
  }, []);

  // if (loading) {
  //   return <div className="p-4 text-white bg-bg min-h-screen pt-20 px-20 pb-12">Loading...</div>;
  // }

  // if (error) {
  //   return <div className="p-4 bg-bg min-h-screen pt-20 px-20 pb-12">{error}</div>;
  // }

  return (
    <>
      <Navbar />
      <Board lists={lists} refetchLists={fetchLists} />
    </>
  );
}
export default App;