// export const User = ({ user, isSelected, onSelect }) => (
//   <div
//     onClick={() => onSelect(user.id)}
//     className={`flex flex-col items-center cursor-pointer ${
//       isSelected ? 'border-2 border-blue-500 p-2' : ''
//     }`}
//   >
//     <img
//       src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${user.id}`}
//       alt={`User ${user.id}`}
//       className="w-16 h-16 rounded-full"
//     />
//     <p className="text-sm font-semibold">User {user.id}</p>
//   </div>
// );