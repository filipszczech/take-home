import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { useListDataStore } from "../store";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { ToggleButton } from "./Buttons";

export const Entrypoint = () => {
  const listQuery = useGetListData();
  const setList = useListDataStore((state) => state.setList);
  const list = useListDataStore((state) => state.list);
  const deletedList = useListDataStore((state) => state.deleted);
  const [deletedReveal, setDeletedReveal] = useState<boolean>(false);

  useEffect(() => {
    if (listQuery.isSuccess && listQuery.data) {
      const filteredList = listQuery.data.filter(
        (item) => !deletedList.some((deletedItem) => deletedItem.id === item.id)
      );
      setList(filteredList.filter((item) => item.isVisible) ?? []);
    }
  }, [listQuery.isSuccess, listQuery.data, setList]);

  if (listQuery.isError) {
    return (
      <div>
        <h1>Wystąpił błąd!</h1>
        <p>Treść błędu: {listQuery.error instanceof Error ? listQuery.error.message : "nieznany błąd"}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-6xl px-6 gap-x-16">
      <div className="w-full">
        <h1 className="font-medium text-lg mb-3">My Awesome List ({list.length})</h1>
        <div className="flex flex-col items-center gap-y-3">
          {listQuery.isFetching ? <Spinner /> : list.map((card) => (
            <Card key={card.id} title={card.title} description={card.description} id={card.id} />
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-medium text-lg">Deleted Cards ({deletedList.length})</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setDeletedReveal(!deletedReveal)} 
              disabled={deletedList.length === 0}
              className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            >
              {deletedReveal ? 'Unreveal' : 'Reveal'}
            </button>
            <button
              onClick={() => listQuery.refetch()}
              disabled={listQuery.isFetching}
              className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            >
              Refresh
            </button>
            <ToggleButton size={2} onToggle={(state: boolean) =>{console.log(`Current state: ${state}`)}} />
          </div>
        </div>
        {deletedReveal && <div className="flex flex-col gap-y-3">
          {deletedList.map((card) => (
            <Card key={card.id} title={card.title} id={card.id} isDeleted={true} />
          ))}
        </div>}
      </div>
    </div>
  );
};
