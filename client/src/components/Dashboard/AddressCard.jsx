const AddressCard = ({ address, handleDelete }) => {
  return (
    <div className="max-w-md flex flex-col justify-between w-full h-full p-4 bg-gradient-to-r from-theme-blue-200 to-theme-blue-300 rounded-lg">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col justify-between">
          <div className="flex flex-row justify-between">
            <span className="text-md text-white font-bold">{address.email}</span>
            <button onClick={() => handleDelete(address.id)} className="text-md text-white font-bold">Delete</button>
          </div>
          <div className="flex flex-row justify-between">
            <span className="text-md text-white font-bold">{address.site}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;