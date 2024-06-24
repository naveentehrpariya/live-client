
import { MdDragIndicator } from "react-icons/md";
import { useCallback, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

export default function ManageFiles({ data, update }) {
  const Dropdown = () => {  
    const [open, setOpen] = useState(false);
    function showDropdownOptions() {
      document.getElementById(`move`).classList.remove("transition");
      setOpen(!open);
    }
    return  <>
      <button onClick={showDropdownOptions} class="relative block rounded-md text-sm">
        Options
      </button>
      <div class={`${open ? "block" : "hidden"} absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-[20]`}>
        <a href="#" class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
          your profile
        </a>
        <a href="#" class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
          Your projects
        </a>
      </div>
    </>
  }

  const [items, setItems] = useState(data); // Initialize items state with data prop

  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    const final = arrayMove(items, oldIndex, newIndex);
    setItems(final);
    update && update(final);
  }, [items, update]);

  const SortableList = SortableContainer(({ items }) => (
    <ul className="flex flex-col">
      {items.map((value, index) => {
        const size = value.size / 1024 / 1024;
        const DragHandle = SortableHandle(() => (
          <li key={index} class={`{selected === file.url ? "bg-green-900" : "" } border-gray-400 flex rounded-xl flex-row mb-2`}>
                  <div id='move' className={`select-none cursor-pointer bg-dark2 rounded-xl flex flex-1 items-center p-4
                    transition duration-500 ease-in-out transform `}>
                    <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-2">🎥</div>
                    <div className="flex flex-col rounded-md justify-center items-center mr-4">
                      <MdDragIndicator size='2rem' color="#cccccc" />
                    </div>
                    <div className="flex-1 pl-1 mr-16">
                      <div className="font-medium text-white">{value.name}</div>
                      <div className="text-gray-600 text-sm">{value.mime}</div>
                    </div>
                    <div className="text-gray-600 text-xs">
                        {size.toFixed(2)} MB
                        {/* <Dropdown /> */}
                    </div>
                  </div>
              </li>
        ));
        const SortableItem = SortableElement(() => <DragHandle />);
        return <SortableItem key={`item-${index}`} index={index} />;
      })}
    </ul>
  ));

  return (
    <>
      <SortableList items={items} onSortEnd={onSortEnd} useDragHandle={true} />
    </>
  );
}
